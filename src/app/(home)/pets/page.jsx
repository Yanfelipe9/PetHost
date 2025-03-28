'use client'
import { Table, Input, Button, Space, Flex, Modal, Form, Radio, Avatar, Layout, Select, Pagination, Tabs } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from './pets.module.css';
import Image from 'next/image';
import imgPet from './pngtree-dog-logo-design-vector-icon-png-image_1824202 5.png';
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

const headerStyle = {
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: '#ffffff',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  backgroundColor: '#ffffff',
};
const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#ffffff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
};

const PetTable = () => {
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState('start');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cadastro");
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!user?.userId) return;

    const fetchClientesComPets = async () => {
      try {
        const response = await api.get(`/clientes/user/${user.userId}`);
        const clientesComPets = response.data;

        const petsComDono = clientesComPets.flatMap(cliente => {
          return cliente.pets.map(pet => ({
            ...pet,
            clienteNome: cliente.nome,
            clienteTelefone: cliente.telefone
          }));
        });

        setPets(petsComDono);
      } catch (error) {
        console.error("Erro ao buscar clientes e pets:", error);
      }
    };

    fetchClientesComPets();
  }, [user?.userId]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes/user/" + user?.userId);
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, [user?.userId]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (activeTab === "cadastro") {
        const body = {
          nome: values.nome,
          sexo: values.sexo,
          racaPet: values.racaPet,
          observacoes: values.observacoes,
          cliente: {
            id: values.clienteId,
          },
        };

        const response = await api.post("/pets", body);
        const clienteSelecionado = clientes.find(cliente => cliente.id === values.clienteId);

        const novoPetComDono = {
          ...response.data,
          clienteNome: clienteSelecionado?.nome,
          clienteTelefone: clienteSelecionado?.telefone,
        };

        setPets(prevPets => [...prevPets, novoPetComDono]);
      } else if (activeTab === "agendamento") {
        console.log("Agendamento:", values);
        // Aqui você pode colocar a lógica de envio para a API de agendamento
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { title: "ID do Pet", dataIndex: "id", key: "id" },
    { title: "Nome do Pet", dataIndex: "nome", key: "nome" },
    { title: "Raça do Pet", dataIndex: "racaPet", key: "racaPet" },
    { title: "Nome do Dono", dataIndex: "clienteNome", key: "clienteNome" },
    { title: "Número do Dono", dataIndex: "clienteTelefone", key: "clienteTelefone" },
    { title: "Observações", dataIndex: "observacoes", key: "observacoes" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Flex justify="space-between" align="flex-start" className={styles.header}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Pesquisar por Nome do Pet"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Button icon={<FilterOutlined />} iconPosition={position}>
            Filtrar
          </Button>
        </Space>
        <Button type="primary" onClick={showModal} className={styles.createButton}>
          Criar
        </Button>
      </Flex>
      <Table columns={columns} dataSource={pets || []} pagination={false} rowKey="id" />
      <Flex justify="center" className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} total={pets.length} />
      </Flex>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane tab="Cadastro" key="cadastro" />
          <TabPane tab="Agendamento" key="agendamento" />
        </Tabs>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>{activeTab === "cadastro" ? "Cadastrar Pet" : "Agendamento"}</Header>
          <Layout>
            <Sider width="25%" style={siderStyle}>
              <Image src={imgPet} alt="Imagem de um pet" width={120} height={120} />
            </Sider>
            <Content style={contentStyle}>
              <Form form={form} layout="vertical">
                {activeTab === "cadastro" ? (
                  <>
                    <Form.Item name="nome" label="Nome do Pet" rules={[{ required: true }]}> <Input /> </Form.Item>
                    <Space size={200}>
                      <Form.Item name="sexo" label="Sexo" rules={[{ required: true }]} style={{ width: "150%" }}>
                        <Radio.Group
                          onChange={onChange}
                          value={value}
                          options={[
                            { value: 'macho', label: 'Macho' },
                            { value: 'femea', label: 'Fêmea' },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item name="racaPet" label="Raça/Características do Pet" rules={[{ required: true }]}> <Input /> </Form.Item>
                    </Space>
                    <Form.Item name="clienteId" label="Cliente" rules={[{ required: true }]}> <Select showSearch placeholder="Selecione um Cliente" options={clientes.map(cliente => ({ value: cliente.id, label: `${cliente.nome} - ${cliente.telefone}` }))} /> </Form.Item>
                    <Form.Item name="observacoes" label="Observações"> <Input.TextArea /> </Form.Item>
                  </>
                ) : (
                  <>
                    <Form.Item name="busca" label="Pesquisar por pet"> <Input.Search placeholder="Buscar" /> </Form.Item>
                    <Form.Item name="periodo" label="Período de estadia"> <Input /> </Form.Item>
                    <Form.Item name="compartimento" label="Compartimento"> <Input /> </Form.Item>
                    <Form.Item name="valor" label="Valor"> <Input type="number" prefix="R$" /> </Form.Item>
                    <Form.Item name="pagamento" label="Forma de pagamento">
                      <Select options={[{ value: "dinheiro", label: "Dinheiro" }, { value: "cartao", label: "Cartão" }, { value: "pix", label: "Pix" }]} />
                    </Form.Item>
                    <Form.Item name="obsAgendamento" label="Observações"> <Input.TextArea /> </Form.Item>
                  </>
                )}
              </Form>
            </Content>
          </Layout>
          <Footer style={footerStyle}></Footer>
        </Layout>
      </Modal>
    </div>
  );
};

export default PetTable;
