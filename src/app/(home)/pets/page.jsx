'use client'
import { Table, Input, Button, Space, Flex, Modal, Form, Radio, Avatar, Layout, Select, Pagination } from "antd";
import { SearchOutlined, FilterOutlined, UserOutlined } from "@ant-design/icons";
import styles from './pets.module.css'
import Image from 'next/image';
import imgPet from './pngtree-dog-logo-design-vector-icon-png-image_1824202 5.png'
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";

// Layout Formulario
const { Header, Footer, Sider, Content } = Layout;
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
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [clientes, setClientes] = useState([]);

  

  useEffect(() => {
    if (!user?.userId) return;
  
    const fetchClientesComPets = async () => {
      try {
        // Busca os clientes com seus respectivos pets
        const response = await api.get(`/clientes/user/${user.userId}`);
        const clientesComPets = response.data; // Agora temos os clientes e seus pets
  
        // Mapeia os pets e associa ao cliente
        const petsComDono = clientesComPets.flatMap(cliente => {
          return cliente.pets.map(pet => ({
            ...pet,  // Acessamos as informações do pet
            clienteNome: cliente.nome,  // Adiciona o nome do dono ao pet
            clienteTelefone: cliente.telefone  // Adiciona o telefone do dono ao pet
          }));
        });
  
        setPets(petsComDono);  // Atualiza os pets no estado
      } catch (error) {
        console.error("Erro ao buscar clientes e pets:", error);
      }
    };
  
    fetchClientesComPets();
  }, [user?.userId]);

  // Buscar Clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes/user/" + user?.userId);  
        console.log("Clientes carregados:", response.data); //  Verifica se os clientes estão vindo corretamente
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

  const onChangeSelect = (value) => {
    console.log(`Selecionado: ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
  
      const body = {
        nome: values.nome,
        sexo: values.sexo,
        racaPet: values.racaPet,
        observacoes: values.observacoes,
        cliente: {
          id: values.clienteId, 
        },
      };
  
      // Envia o pet para a API
      const response = await api.post("/pets", body);
  
      // Agora, vamos buscar o nome e o telefone do cliente
      const clienteSelecionado = clientes.find(cliente => cliente.id === values.clienteId);
  
      // Agora, adiciona o nome e telefone do dono ao pet
      const novoPetComDono = {
        ...response.data, // Os dados do pet
        clienteNome: clienteSelecionado?.nome,  // Nome do cliente
        clienteTelefone: clienteSelecionado?.telefone,  // Telefone do cliente
      };
  
      // Atualiza o estado dos pets com o novo pet já com as informações do dono
      setPets(prevPets => [...prevPets, novoPetComDono]);
  
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { title: "ID do Pet", dataIndex: "id", key: "id" },
    { title: "Nome do Pet", dataIndex: "nome", key: "nome" },
    { title: "Raça do Pet", dataIndex: "racaPet", key: "racaPet" },
    { title: "Nome do Dono", dataIndex: "clienteNome", key: "clienteNome" },  // Aqui usamos clienteNome
    { title: "Número do Dono", dataIndex: "clienteTelefone", key: "clienteTelefone" },  // Aqui usamos clienteTelefone
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
      <Table
        columns={columns}
        dataSource={pets || []}
        pagination={false}
        rowKey="id"
      />
      <Flex justify="center" className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} total={pets.length} />
      </Flex>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>Cadastrar Pet</Header>
          <Layout>
            <Sider width="25%" style={siderStyle}>
              <Image src={imgPet} alt="Imagem de um pet" width={120} height={120} />
            </Sider>
            <Content style={contentStyle}>
              <Form form={form} layout="vertical">
                <Form.Item name="nome" label="Nome do Pet" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Space size={200}>
                  <Form.Item name="sexo" label="Sexo" rules={[{ required: true }]} style={{ width: "150%" }}>
                    <Radio.Group
                      onChange={onChange}
                      value={value}
                      options={[
                        {
                          value: 'macho',
                          label: 'Macho',
                        },
                        {
                          value: 'femea',
                          label: 'Fêmea',
                        },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item name="racaPet" label="Raça/Características do Pet" rules={[{ required: true }]}>
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </Space>

                {/* Selecione o Cliente */}
                <Form.Item name="clienteId" label="Cliente" rules={[{ required: true }]}>
                  <Select
                    showSearch
                    placeholder="Selecione um Cliente"
                    onChange={(value) => form.setFieldsValue({ clienteId: value })}  // Atualiza o clienteId no formulário
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={clientes.map(cliente => ({
                      value: cliente.id,
                      label: `${cliente.nome} - ${cliente.telefone}`  // Exibe o nome e telefone do cliente
                    }))}
                  />
                </Form.Item>

                {/* Observações */}
                <Form.Item style={{ width: '100%' }} name="observacoes" label="Observações">
                  <Input.TextArea />
                </Form.Item>
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
