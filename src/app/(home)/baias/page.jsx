'use client'
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Flex, Modal, Form, Pagination } from "antd"; // Import Pagination here
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from "./baias.module.css";
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";

const columns = [
  { title: "Baia", dataIndex: "baia", key: "baia" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const Baias = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [baias, setBaias] = useState([]);
  const [position, setPosition] = useState('start');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const mockBaiasData = [
    { id: 1, baia: 'Baia 1', status: 'Ativo' },
    { id: 2, baia: 'Baia 2', status: 'Inativo' },
    { id: 3, baia: 'Baia 3', status: 'Ativo' },
    { id: 4, baia: 'Baia 4', status: 'Ativo' },
    { id: 5, baia: 'Baia 5', status: 'Inativo' },
  ];

  useEffect(() => {
    // const fetchBaias = async () => {
    //   try {
    //     const response = await api.get("/baias/{user.id}");
    //     setBaias(response.data);
    //   } catch (error) {
    //     console.error("Erro ao buscar baias:", error);
    //   }
    // };

    // fetchBaias();
    setBaias(mockBaiasData)
  }, []);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const body = {
        userId: user.userId,
        descricao: values.descricao, 
      };

      await api.post("/baias", body);
      setIsModalOpen(false);
      form.resetFields();
      setBaias((prev) => [...prev, values]);
    } catch (error) {
      console.error("Erro ao cadastrar baia:", error);
    }
  };

  return (
    <div className={styles.container}>
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
        <Button type="primary" onClick={showModal} className={styles.createButton}>
          Criar
        </Button>
      </Flex>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={baias.filter((baia) =>
            baia.baia.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={false}
          rowKey="id"
        />
      </div>

      <Flex justify="center" className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} total={baias.length} />
      </Flex>

      <Modal
        title="Cadastrar Baia"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="descricao" label="Nome da Baia" rules={[{ required: true, message: "Digite o nome da baia" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Baias;
