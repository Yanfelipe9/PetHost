'use client'
import React, { useState } from "react";
import { Table, Input, Button, Space, Flex, Modal, Form, RadioChangeEvent, Radio, Avatar, Layout, Dropdown, Menu, Tabs } from "antd";
import { SearchOutlined, FilterOutlined, UserOutlined, MoreOutlined } from "@ant-design/icons";
import styles from './financas.module.css';

const { TabPane } = Tabs;

const mockData = [
  { key: "1", id: "5644", name: "Totó", baia: "A1", valorTotal: "200", status: "Pago", formaPagamento: "Dinheiro" },
  { key: "2", id: "6112", name: "Pegasus", baia: "A2", valorTotal: "350", status: "Não Pago", formaPagamento: "Cartão" },
  { key: "3", id: "6141", name: "Cristal", baia: "B1", valorTotal: "150", status: "Pago", formaPagamento: "PIX" },
  { key: "4", id: "6535", name: "Shelby", baia: "C1", valorTotal: "100", status: "Não Pago", formaPagamento: "Dinheiro" },
  { key: "5", id: "6541", name: "Luke", baia: "B2", valorTotal: "500", status: "Pago", formaPagamento: "Cartão" },
  { key: "6", id: "9846", name: "Yadrin", baia: "A3", valorTotal: "350", status: "Pago", formaPagamento: "PIX" },
  { key: "7", id: "4921", name: "Kiand", baia: "C2", valorTotal: "250", status: "Não Pago", formaPagamento: "Dinheiro" },
  { key: "8", id: "9841", name: "Turen", baia: "A4", valorTotal: "300", status: "Pago", formaPagamento: "Cartão" },
];

const FinanceiroPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("financas");

  const showModal = (row) => {
    setSelectedRow(row);
    form.setFieldsValue(row); // Preenche o formulário com os dados da linha selecionada
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Pet editado:', values);
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
      item.baia.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Baia", dataIndex: "baia", key: "baia" },
    { title: "Valor Total", dataIndex: "valorTotal", key: "valorTotal" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Forma de Pagamento", dataIndex: "formaPagamento", key: "formaPagamento" },
    {
      title: "Editar", 
      key: "actions", 
      render: (_, row) => (
        <Dropdown
          trigger={['click']}
          overlay={(
            <Menu>
              <Menu.Item onClick={() => showModal(row)}>
                Editar
              </Menu.Item>
            </Menu>
          )}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} style={{ marginBottom: 16 }}>
        <TabPane tab="Painel" key="painel">
        </TabPane>
        <TabPane tab="Finanças" key="financas">
          <Flex justify="space-between" align="flex-start" className={styles.header}>
            <Space style={{ marginBottom: 16 }}>
              <Input
                placeholder="Pesquisar por Nome ou Baia"
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
                prefix={<SearchOutlined />}
              />
              <Button icon={<FilterOutlined />}>Filtrar</Button>
            </Space>
          </Flex>
          
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
      </Tabs>

      <Modal
        title="Editar Pet"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Cancelar</Button>,
          <Button key="submit" type="primary" onClick={handleOk}>Salvar</Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor insira o nome!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Baia" name="baia" rules={[{ required: true, message: 'Por favor insira a baia!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Valor Total" name="valorTotal" rules={[{ required: true, message: 'Por favor insira o valor total!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value="Pago">Pago</Radio>
              <Radio value="Não Pago">Não Pago</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Forma de Pagamento" name="formaPagamento">
            <Radio.Group>
              <Radio value="Dinheiro">Dinheiro</Radio>
              <Radio value="Cartão">Cartão</Radio>
              <Radio value="PIX">PIX</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FinanceiroPage;
