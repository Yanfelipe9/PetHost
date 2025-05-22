'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Flex,
  Modal,
  Form,
  Pagination,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styles from "./baias.module.css";
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";

const Baias = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [baias, setBaias] = useState([]);
  const [position, setPosition] = useState("start");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchBaias = async () => {
    if (user && user.userId) {
      try {
        const response = await api.get(`/baias/${user.userId}`);
        setBaias(response.data);
      } catch (error) {
        console.error("Erro ao buscar baias:", error);
      }
    }
  };

  useEffect(() => {
    fetchBaias();
  }, [user]);

  const handleDelete = async (baiaId) => {
    try {
      await api.delete(`/baias/${baiaId}`);
      setBaias((prev) => prev.filter((baia) => baia.id !== baiaId));
      message.success("Baia deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar baia:", error);
      message.error("Erro ao deletar baia.");
    }
  };

  const handleLimpar = async (baiaId) => {
    try {
      const response = await api.post(`/baias/limpeza/${baiaId}`);
      const baiaAtualizada = response.data;

      setBaias((prev) =>
        prev.map((baia) => (baia.id === baiaId ? baiaAtualizada : baia))
      );
      message.success("Status de limpeza atualizado!");
    } catch (error) {
      console.error("Erro ao atualizar limpeza:", error);
      message.error("Erro ao atualizar limpeza.");
    }
  };

  const columns = [
    { title: "Baia", dataIndex: "descricao", key: "descricao" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Limpeza", dataIndex: "limpeza", key: "limpeza" },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            icon={<CheckCircleOutlined />}
            onClick={() => handleLimpar(record.id)}
          >
            Limpar
          </Button>
          <Popconfirm
            title="Deseja deletar esta baia?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Deletar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const body = {
        userId: user.userId,
        descricao: values.descricao,
      };

      const response = await api.post("/baias", body);
      setIsModalOpen(false);
      form.resetFields();
      setBaias((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao cadastrar baia:", error);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const filteredBaias = baias.filter((baia) =>
    baia.descricao.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedBaias = filteredBaias.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: 20 }} className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Pesquisar por Baia"
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Button icon={<FilterOutlined />} iconPosition={position}>
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

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={paginatedBaias}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className={styles.paginationContainer}>
        <Flex justify="center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredBaias.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </Flex>
      </div>

      <Modal
        title="Cadastrar Baia"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="descricao"
            label="Nome da Baia"
            rules={[{ required: true, message: "Digite o nome da baia" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Baias;
