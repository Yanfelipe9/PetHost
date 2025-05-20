"use client";

import { useAuth } from "@/app/context/AuthContext";
import AgendamentoFormModalForm from "@/dialogs/AgendamentoModalForm";
import PetFormModalForm from "@/dialogs/PetFormModalForm";
import api from "@/utils/axios";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styles from "./pets.module.css";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

export interface PetInfoInterface {
  id: number;
  nome: string;
  sexo: string;
  racaPet: string;
  observacoes?: string;
  dtNascimento: Date;
  clienteId: number;
  nomeDono: string;
}

const PetTable = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("cadastro");
  const [filterSexo, setFilterSexo] = useState(null);

  const [formPet] = Form.useForm();
  const [formAgendamento] = Form.useForm();

  const [pets, setPets] = useState<PetInfoInterface[]>([]);
  const [baias, setBaias] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if (!user?.userId) return;
    fetchPetsByUser();
  }, [user?.userId]);

  const fetchPetsByUser = async () => {
    const response = await api.get(`/pets?userId=${user.userId}`);
    setPets(response.data);
  };

  const showModal = () => {
    fetchClientes();
    fetchBaias();
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

        fetchPetsByUser();
        setIsModalOpen(false);
      } else if (activeTab === "agendamento") {
        debugger
        const dtInicio = formatDateToBackendString(values.periodo[0]);
        const dtFim = formatDateToBackendString(values.periodo[1]);
        console.log("values",values)
        const agendamentoBody = {
          dataHoraInicio: dtInicio,
          dataHoraFim: dtFim,
          idPet: values.petId,
          idBaia: values.baiaId,
          valor: values.valor,
          formaPagamento: values.pagamento,
          userId: user.userId
        };

        console.log("Corpo do agendamento:", agendamentoBody);

        try {
          const response = await api.post("/agendamentos", agendamentoBody);
          if (response.status === 200) {
            console.log("Agendamento cadastrado com sucesso:", response.data);
            formAgendamento.resetFields();
            setIsModalOpen(false);
            message.success("Agendamento criado com sucesso!")
          }
        } catch (error) {
          if (error.response) {
            console.error("Erro no backend:", error.response.data);
          } else {
            console.error("Erro inesperado:", error);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };


  function formatDateToBackendString(dateObj) {
    const pad = (num) => String(num).padStart(2, '0');
  
    return `${dateObj.year()}-${pad(dateObj.month() + 1)}-${pad(dateObj.date())}T${pad(dateObj.hour())}:${pad(dateObj.minute())}:${pad(dateObj.second())}`;
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { title: "ID do Pet", dataIndex: "id", key: "id" },
    { title: "Nome do Pet", dataIndex: "nome", key: "nome" },
    { title: "Raça do Pet", dataIndex: "racaPet", key: "racaPet" },
    { title: "Sexo", dataIndex: "sexo", key: "sexo" },
    { title: "Nome do Dono", dataIndex: "nomeDono", key: "nomeDono" },
    {
      title: "Data de Nascimento",
      dataIndex: "dtNascimento",
      key: "dtNascimento",
      render: (text: any) => {
        if (!text) return "-";
        const dateString =
          typeof text === "string"
            ? text
            : new Date(text).toISOString().split("T")[0];
        const [ano, mes, dia] = dateString.split("-");
        return `${dia}/${mes}/${ano}`;
      },
    },
    {
      title: "Número do Dono",
      dataIndex: "telefoneDono",
      key: "telefoneDono",
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

  const fetchBaias = async () => {
    try {
      const response = await api.get("/baias/" + user?.userId);
      setBaias(response.data);
    } catch (error) {
      console.error("Erro ao buscar baias:", error);
    }
  };

  const handleSearch = async (value) => {
    try {
      const response = await api.get(`/pets`, {
        params: {
          nome: value,
          sexo: filterSexo,
          userId: user?.userId,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 500),
    []
  );

  const handleSearchFilter = async (value) => {
    try {
      const response = await api.get(`/pets`, {
        params: {
          nome: searchText,
          sexo: value,
          userId: user?.userId,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const onSexoChange = (value) => {
    setFilterSexo(value);
    handleSearchFilter(value);
  };

  return (
    <div className={styles.container} style={{ padding: 20 }}>
      <Flex justify="space-between" align="flex-start" className={styles.header}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Pesquisar por Nome do Pet"
            onChange={onChange}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="Filtrar por Sexo"
            style={{ width: 150 }}
            onChange={onSexoChange}
            allowClear
            options={[
              { value: "MACHO", label: "Macho" },
              { value: "FEMEA", label: "Fêmea" },
            ]}
          />
        </Space>
        <Button type="primary" onClick={showModal} className={styles.createButton}>
          Criar
        </Button>
      </Flex>

      <Table columns={columns} dataSource={pets || []} pagination={false} rowKey="id" />

      <div className={styles.paginationContainer}>
        <Flex justify="center">
          <Pagination defaultCurrent={1} total={pets.length} />
        </Flex>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          destroyInactiveTabPane={false}
        >
          <Tabs.TabPane
            tab="Cadastro Pets"
            key="cadastro"
            children={<PetFormModalForm form={formPet} clientes={clientes} />}
          />
          <Tabs.TabPane
            tab="Agendamento"
            key="agendamento"
            children={<AgendamentoFormModalForm form={formAgendamento} pets={pets} baias={baias} />}
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
