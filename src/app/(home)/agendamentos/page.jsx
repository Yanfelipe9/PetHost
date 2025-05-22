"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Tag, Flex, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";
import AgendamentoFormModalForm from "@/dialogs/AgendamentoModalForm";
import styles from "./agendamento.module.css";

const Agendamentos = () => {
  const { user } = useAuth();

  const [agendamentos, setAgendamentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const [pets, setPets] = useState([]);
  const [baias, setBaias] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      fetchAgendamentos();
      fetchPets();
      fetchBaias();
    }
  }, [user]);

  const fetchAgendamentos = async () => {
    try {
      const response = await api.get(`/agendamentos/user/${user.userId}`);
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await api.get(`/pets?userId=${user.userId}`);
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  const fetchBaias = async () => {
    try {
      const response = await api.get(`/baias/${user.userId}`);
      setBaias(response.data);
    } catch (error) {
      console.error("Erro ao buscar baias:", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formatDateToBackendString = (dateObj) => {
        const pad = (num) => String(num).padStart(2, "0");
        return `${dateObj.year()}-${pad(dateObj.month() + 1)}-${pad(
          dateObj.date()
        )}T${pad(dateObj.hour())}:${pad(dateObj.minute())}:${pad(
          dateObj.second()
        )}`;
      };

      const body = {
        dataHoraInicio: formatDateToBackendString(values.periodo[0]),
        dataHoraFim: formatDateToBackendString(values.periodo[1]),
        idPet: values.petId,
        idBaia: values.baiaId,
        valor: values.valor,
        formaPagamento: values.pagamento,
        userId: user.userId,
      };

      await api.post("/agendamentos", body);
      form.resetFields();
      setIsModalOpen(false);
      fetchAgendamentos();
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCheckin = async (id) => {
    try {
      await api.post(`/agendamentos/checkin/${id}`);
      fetchAgendamentos();
    } catch (error) {
      console.error("Erro ao realizar check-in:", error);
    }
  };

  const handleCheckout = async (id) => {
    try {
      await api.post(`/agendamentos/checkout/${id}`);
      fetchAgendamentos();
    } catch (error) {
      console.error("Erro ao realizar check-out:", error);
    }
  };

  const formatDateFromArray = (value) => {
    if (Array.isArray(value)) {
      const [ano, mes, dia, hora = 0, minuto = 0, segundo = 0] = value;
      const date = dayjs(new Date(ano, mes - 1, dia, hora, minuto, segundo));
      return date.isValid() ? date.format("DD/MM/YYYY HH:mm") : "-";
    }
    return "-";
  };

  const columns = [
    {
      title: "Pet",
      dataIndex: ["pet", "nome"],
      key: "nomePet",
    },
    {
      title: "Baia",
      dataIndex: ["baia", "descricao"],
      key: "numeroBaia",
    },
    {
      title: "Início",
      dataIndex: "dataHoraInicio",
      key: "dataHoraInicio",
      render: formatDateFromArray,
    },
    {
      title: "Fim",
      dataIndex: "dataHoraFim",
      key: "dataHoraFim",
      render: formatDateFromArray,
    },
    {
      title: "Check-in",
      dataIndex: "checkin",
      key: "checkin",
      render: formatDateFromArray,
    },
    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: formatDateFromArray,
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
      render: (value) =>
        typeof value === "number"
          ? `R$ ${value.toFixed(2).replace(".", ",")}`
          : "-",
    },
    {
      title: "Pagamento",
      dataIndex: "formaPagamento",
      key: "formaPagamento",
      render: (pagamento) => <Tag color="blue">{pagamento}</Tag>,
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <>
          {!record.checkin && (
            <Button type="primary" onClick={() => handleCheckin(record.id)}>
              Check-in
            </Button>
          )}
          {record.checkin && !record.checkOut && (
            <Button onClick={() => handleCheckout(record.id)}>Check-out</Button>
          )}
        </>
      ),
    },
  ];

  const paginatedData = agendamentos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <div></div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Agendamento
        </Button>
      </Flex>

      <div className={styles.tableContainer}>
        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>

      <div className={styles.paginationContainer}>
        <Flex justify="center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={agendamentos.length}
            onChange={setCurrentPage}
          />
        </Flex>
      </div>

      <Modal
        title="Novo Agendamento"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <AgendamentoFormModalForm form={form} pets={pets} baias={baias} />
      </Modal>
    </div>
  );
};

export default Agendamentos;
