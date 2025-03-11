"use client";

import api from "@/utils/axios";
import { Button, Flex, Form, Input, Modal, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import styles from "./clientes.module.css";

const columns = [
  { title: "Nome", dataIndex: "nome", key: "nome" },
  { title: "Telefone", dataIndex: "telefone", key: "telefone" },
  { title: "Quantidade de Pets", dataIndex: "pets", key: "pets" },
];

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await api.post("/clientes", values);
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
        <Button type="primary" onClick={showModal} className={styles.createButton}>
          Criar
        </Button>
      </Flex>
      <div className={styles.tableContainer}>
        <Table columns={columns} dataSource={clientes} pagination={false} rowKey="id" />
      </div>
      <Flex justify="center" className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} total={clientes.length} />
      </Flex>
      <Modal title="Cadastrar Cliente" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Digite o nome" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="telefone" label="Telefone" rules={[{ required: true, message: "Digite o telefone" }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clientes;

//TO DO-- LINKAR COM O JWT DO LOGIN