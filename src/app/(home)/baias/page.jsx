'use client'
import React, { useState } from "react";
import { Table, Input, Button, Space, Flex, Modal, Form} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from "./baias.module.css"

const Baias = () =>{

  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState('start');
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

    return(
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
        <Modal
              title="Cadastrar Pet"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical">
                <Form.Item name="name" label="Nome da Baia:" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
      </div>
    )
}
export default Baias;