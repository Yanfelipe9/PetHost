"use client";

import { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Flex, Pagination } from 'antd';
import styles from './clientes.module.css';

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
  },
  {
    title: 'Idade',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Endereço',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Quantidade de Pets',
    dataIndex: 'pets',
    key: 'pets',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    cpf: '123.456.789-00',
    age: 32,
    address: 'New York No. 1 Lake Park',
    pets: 2,
  },
  {
    key: '2',
    name: 'Jim Green',
    cpf: '987.654.321-00',
    age: 42,
    address: 'London No. 1 Lake Park',
    pets: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    cpf: '111.222.333-44',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    pets: 3,
  },
];

const Clientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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

  return (
    <div className={styles.container}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <div></div>
        <Button type="primary" onClick={showModal} className={styles.createButton}>
          Criar
        </Button>
      </Flex>
      <div className={styles.tableContainer}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      <Flex justify="center" className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} total={50} />
      </Flex>
      <Modal title="Cadastrar Cliente" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Digite o nome' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="cpf" label="CPF" rules={[{ required: true, message: 'Digite o CPF' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Endereço"> 
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Idade" rules={[{ required: true, message: 'Digite a idade' }]}> 
            <Input type="number" />
          </Form.Item>
          <Form.Item name="pets" label="Quantidade de Pets"> 
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clientes;