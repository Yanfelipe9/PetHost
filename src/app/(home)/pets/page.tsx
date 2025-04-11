"use client";

import {
  Table,
  Input,
  Button,
  Space,
  Flex,
  Modal,
  Form,
  Radio,
  Avatar,
  Layout,
  Select,
  Pagination,
  Tabs,
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from "./pets.module.css";
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";
import React, { use, useCallback, useEffect, useState } from "react";
import PetFormModalForm from "@/dialogs/PetFormModalForm";
import AgendamentoFormModalForm from "@/dialogs/AgendamentoModalForm";
import {debounce} from "lodash";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;


export interface PetInfoInterface {
  id:           number;
  nome:         string;
  sexo:         string;
  racaPet:      string;
  observacoes?:  string;
  dtNascimento: Date;
  clienteId:    number;
  nomeDono:     string;
}


const PetTable = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cadastro");

  const [formPet] = Form.useForm();
  const [formAgendamento] = Form.useForm();

  const { user } = useAuth();
  const [pets, setPets] = useState<PetInfoInterface[]>([]);
  const [clientes, setClientes] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!user?.userId) return;

    const fetchPetsByUser = async (userId) => {
      if (!userId) return null;
      const response = await api.get(`/pets?userId=${userId}`);

      setPets(response.data);
    };

    fetchPetsByUser(user.userId);
  }, []);


  const showModal = () => {
    fetchClientes();
    formPet.resetFields();
    formAgendamento.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values =
        activeTab === "cadastro"
          ? await formPet.validateFields()
          : await formAgendamento.validateFields();

      console.log("Valores do formulário:", values);
      if (activeTab === "cadastro") {
        const body = {
          nome: values.nome,
          sexo: values.sexo,
          racaPet: values.racaPet,
          observacoes: values.observacoes,
          dtNascimento: values.dtNascimento.format("YYYY-MM-DD"),
          clienteId: values.clienteId,
        };

        const response = await api.post("/pets", body);
        if (response.status === 201) {
          console.log("Pet cadastrado com sucesso:", response.data);
          formPet.resetFields();
        }
        const clienteSelecionado = clientes.find(
          (cliente) => cliente.id === values.clienteId
        );

        const novoPetComDono = {
          ...response.data,
          clienteNome: clienteSelecionado?.nome,
          clienteTelefone: clienteSelecionado?.telefone,
        };

        setPets((prevPets) => [...prevPets, novoPetComDono]);
        setIsModalOpen(false);
      } else if (activeTab === "agendamento") {
        console.log("Agendamento:", values);
        // Aqui você pode colocar a lógica de envio para a API de agendamento
      }

      // setIsModalOpen(false);
      // form.resetFields();
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
    {
      title: "Data de Nascimento",
      dataIndex: "dtNascimento",
      key: "dtNascimento",
    },
    {
      title: "Número do Dono",
      dataIndex: "clienteTelefone",
      key: "clienteTelefone",
    },
    { title: "Observações", dataIndex: "observacoes", key: "observacoes" },
  ];

  const fetchClientes = async () => {
    try {
      const response = await api.get("/clientes/user/" + user?.userId);
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleSearch = async (value) => {
    try {
      const response =   await api.get(`/pets`,{
        params: {
          nome: value,
          userId: user?.userId,
        }
      });
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  } 

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 500), // 500ms de atraso
    []
  );

  const onChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  return (
    <div style={{ padding: 20 }}>
      <Flex
        justify="space-between"
        align="flex-start"
        className={styles.header}
      >
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Pesquisar por Nome do Pet"
            onChange={onChange}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Button icon={<FilterOutlined />} iconPosition={"start"}>
            Filtrar
          </Button>
        </Space>
        <Button
          type="primary"
          onClick={showModal}
          className={styles.createButton}
        >
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
        width={700}
        footer={null} // Custom footer (removido por enquanto, pode ser adicionado depois)
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          destroyInactiveTabPane={false}
        >
          <Tabs.TabPane
            tab="Cadastro Pets"
            key="cadastro"
            children={
              <>
                <PetFormModalForm form={formPet} clientes={clientes} />
              </>
            }
          />
          <Tabs.TabPane
            tab="Agendamento"
            key="agendamento"
            children={
              <>
                <AgendamentoFormModalForm form={formAgendamento} pets={pets} />
              </>
            }
          />
        </Tabs>

        <Footer
          style={{
            background: "transparent",
            paddingTop: 24,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleCancel} style={{ marginRight: 12 }}>
            Cancelar
          </Button>
          <Button type="primary" onClick={handleOk}>
            Cadastrar
          </Button>
        </Footer>
      </Modal>
    </div>
  );
};

export default PetTable;
