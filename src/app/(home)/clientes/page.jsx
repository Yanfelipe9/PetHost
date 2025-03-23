"use client";

import { useAuth } from "@/app/context/AuthContext";
import api from "@/utils/axios";
import { Button, Flex, Form, Input, Modal, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import IMask from "imask";
import styles from "./clientes.module.css";
import { IMaskInput } from "react-imask";

const columns = [
  { title: "Nome", dataIndex: "nome", key: "nome" },
  { title: "Telefone", dataIndex: "telefone", key: "telefone" },
];

const Clientes = () => {
  const { user } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user?.userId) return; // Aguarda o userId estar carregado antes de buscar clientes
  
    const fetchClientes = async () => {
      try {
        const response = await api.get(`/clientes/user/${user.userId}`);
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
  
    fetchClientes();
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

  const handleChange = (e) => {
    const maskedValue = IMask.createMask({
      mask: "(00) 00000-0000",
    }).resolve(e.target.value);

    setPhone(maskedValue);
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
          dataSource={clientes}
          pagination={false}
          rowKey="id"
        />
      </div>
      <Flex justify="center" className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} total={clientes.length} />
      </Flex>
      <Modal
        title="Cadastrar Cliente"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: "Digite o nome" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="telefone" label="Telefone" rules={[{ required: true, message: "Digite o telefone" }]}> 
          <IMaskInput
    mask="(00) 00000-0000"
    placeholder="Digite o seu telefone"
    className={styles.customAntInput} // Apenas usa a classe padrão do Ant Design
    
  />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clientes;
