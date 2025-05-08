"use client";

import { useAuth } from "@/app/context/AuthContext";
import api from "@/utils/axios";
import { Button, Flex, Form, Input, Modal, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import styles from "./clientes.module.css";
import { IMaskInput } from "react-imask";

const columns = [
  { title: "Nome", dataIndex: "nome", key: "nome" },
  { title: "Telefone", dataIndex: "telefone", key: "telefone" },
];

const Agendamentos = () => {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user?.userId) return; // Aguarda o userId estar carregado antes de buscar clientes
  
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get(`/agendamentos/user/${user.userId}`);
        setAgendamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };
  
    fetchAgendamentos();
  }, [user?.userId]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const body = {
        nome: values.nome,
        telefone: values.telefone,
        userId: user.userId,
      };

      await api.post("/clientes", body);
      setIsModalOpen(false);
      form.resetFields();
      setClientes((prev) => [...prev, values]);
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <div></div>
        <Button
          type="primary"
          onClick={showModal}
          className={styles.createButton}
        >
          Criar
        </Button>
      </Flex>
      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={agendamentos}
          pagination={false}
          rowKey="id"
        />
      </div>
      <div className={styles.paginationContainer}>
        <Flex justify="center">
          <Pagination defaultCurrent={1} total={agendamentos.length} />
        </Flex>
      </div>
      <Modal
        title="Cadastrar Agendamento"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      
      </Modal>
    </div>
  );
};

export default Agendamentos;
