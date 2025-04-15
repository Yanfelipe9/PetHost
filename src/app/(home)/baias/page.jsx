'use client'
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Flex, Modal, Form, Pagination } from "antd"; // Import Pagination here
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from "./baias.module.css";
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";

const columns = [
  { title: "Baia", dataIndex: "descricao", key: "descricao" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const Baias = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [baias, setBaias] = useState([]);
  const [position, setPosition] = useState('start');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);  // Controle da página atual
  const pageSize = 10;  // Número de itens por página

  useEffect(() => {
    if (user && user.userId) {  // Verificando se o user e userId existem
      const fetchBaias = async () => {
        try {
          const response = await api.get(`/baias/${user.userId}`);
          setBaias(response.data);
        } catch (error) {
          console.error("Erro ao buscar baias:", error);
        }
      };

      fetchBaias();
    }
  }, [user]);

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

  // Função para lidar com a mudança de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filtrar baias com base no texto de busca
  const filteredBaias = baias.filter((baia) =>
    baia.descricao.toLowerCase().includes(searchText.toLowerCase())
  );

  // Obter os dados da página atual
  const paginatedBaias = filteredBaias.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: 20 }} className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Pesquisar por Baia"
            onChange={(e) => setSearchText(e.target.value)}
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
        <Flex justify="center" className={styles.paginationContainer}>
          <Pagination
            current={currentPage} // Página atual
            pageSize={pageSize} // Número de itens por página
            total={filteredBaias.length} // Total de itens
            onChange={handlePageChange} // Função chamada ao mudar de página
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
