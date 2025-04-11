'use client'
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Flex, Tabs, message, Spin } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from './financas.module.css';
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";

const { TabPane } = Tabs;

const FinanceiroPage = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("financas");

  useEffect(() => {
    if (!user?.userId) return;

    const fetchAgendamentos = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/agendamentos/user/${user.userId}`);
        setAgendamentos(response.data);
      } catch (error) {
        message.error("Erro ao buscar agendamentos");
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [user?.userId]);

  const filteredData = agendamentos.filter(
    (item) =>
      item.petNome.toLowerCase().includes(searchText.toLowerCase()) ||
      item.baia.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome do Pet", dataIndex: "petNome", key: "petNome" },
    { title: "Baia", dataIndex: "baia", key: "baia" },
    { title: "Valor", dataIndex: "valor", key: "valor" },
    { title: "Status", dataIndex: "statusPagamento", key: "statusPagamento" },
    { title: "Forma de Pagamento", dataIndex: "formaPagamento", key: "formaPagamento" },
  ];

  return (
    <div className={styles.container} style={{ padding: 20 }}>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} style={{ marginBottom: 16 }}>
        <TabPane tab="Painel" key="painel">

          {/* grafico de barra   */}
          <Card className={styles.card}>
            <Title level={5}>Ultimas entradas/saidas</Title>
            <p>Resumo das despesas de Jan a Dez</p>
            {/*grafico que vai ser inserido <div ref={chartRefBar}></div> */}
            <div style={{ display: "flex", gap: "8px", fontSize: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", backgroundColor: "#3b82f6", borderRadius: "50%" }}></span>
                <span style={{ color: "#6b7280" }}>Entradas</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", backgroundColor: "#e5e7eb", borderRadius: "50%" }}></span>
                <span style={{ color: "#6b7280" }}>Despesas</span>
              </div>
            </div>
          </Card>
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

          {loading ? (
            <Spin />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
              rowKey="id"
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FinanceiroPage;
