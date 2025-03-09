'use client'
import React, { useState } from "react";
import { Table, Input, Button, Space, Flex, Modal, Form, RadioChangeEvent,Radio  } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from './pets.module.css'

const mockData= [
  { key: "1", id: "5644", name: "Totó", breed: "Golden", owner: "João", phone: "(85)999999999", observations: "Problemas de pelagem" },
  { key: "2", id: "6112", name: "Pegasus", breed: "Spitz", owner: "José", phone: "(85)999999999", observations: "Alergia a ração de peixe" },
  { key: "3", id: "6141", name: "Cristal", breed: "Chow-Chow", owner: "Raimundo", phone: "(85)999999999", observations: "Sem Observações" },
  { key: "4", id: "6535", name: "Shelby", breed: "A684", owner: "Francisco", phone: "(85)999999999", observations: "Sem Observações" },
  { key: "5", id: "6541", name: "Luke", breed: "B464", owner: "Maria", phone: "(85)999999999", observations: "Sem Observações" },
  { key: "6", id: "9846", name: "Yadrin", breed: "C648", owner: "José", phone: "(85)999999999", observations: "Sem Observações" },
  { key: "7", id: "4921", name: "Kiand", breed: "D644", owner: "Francisco", phone: "(85)999999999", observations: "Sem Observações" },
  { key: "8", id: "9841", name: "Turen", breed: "B641", owner: "Maria", phone: "(85)999999999", observations: "Sem Observações" },
];

const PetTable = () => {
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState('start');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Cliente cadastrado:', values);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "ID do Pet", dataIndex: "id", key: "id" },
    { title: "Nome do Pet", dataIndex: "name", key: "name" },
    { title: "Raça do Pet", dataIndex: "breed", key: "breed" },
    { title: "Nome do Dono", dataIndex: "owner", key: "owner" },
    { title: "Número do Dono", dataIndex: "phone", key: "phone" },
    { title: "Observações", dataIndex: "observations", key: "observations" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Pesquisar por Nome do Pet"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
        <Button icon={<FilterOutlined />} iconPosition={position}>
            Search
        </Button>
      </Space>
      <Flex justify="space-between" align="flex-end" className={styles.header}>
        <div></div>
        <Button type="primary" onClick={showModal} className={styles.createButton}>
          Criar
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    <Modal
      title="Cadastrar Pet"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Nome do Pet" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Data_Nascimento" label="Data de Nascimento do Pet" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Sexo" label="Sexo" rules={[{ required: true }]}>
        <Radio.Group
      onChange={onChange}
      value={value}
      options={[
        {
          value: 1,
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              Macho
            </Flex>
          ),
        },
        {
          value: 2,
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              Femea
            </Flex>
          ),
        },
      ]}
    />
        </Form.Item>
        <Form.Item name="Raça" label="Raça/Caracteristicas do Pet" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Cuidados" label="Doenças/Cuidados do Pet" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Nome_Dono" label="Nome do Dono" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Telefone" label="Número do Dono" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Observações" label="Observações">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>

    </div>
  );
};

export default PetTable;
