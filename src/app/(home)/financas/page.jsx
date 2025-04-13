'use client'
import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Space, Flex, Tabs, message, Spin, Card, Typography } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import styles from './financas.module.css';
import api from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";
import ApexCharts from "apexcharts";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const { TabPane } = Tabs;
const { Title } = Typography;

const FinanceiroPage = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("financas");
  const chartRef = useRef(null);

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

  useEffect(() => {
    let chart;
  
    if (activeTab === "painel") {
      setTimeout(() => {
        if (chartRef.current) {
          const options = {
            series: [
              { name: 'Entradas', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 53, 75, 10] },
              { name: 'Despesas', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 21, 54, 90] },
            ],
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
              },
            },
            dataLabels: { enabled: false },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['JAN', 'FEV', 'MAR', 'ABRIL', 'MAI', "JUN", 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$ " + val + " thousands"
                }
              }
            }
          };
  
          chart = new ApexCharts(chartRef.current, options);
          chart.render();
        }
      }, 100); // espera 100ms até o DOM estar pronto
    }
  
    return () => {
      if (chart) chart.destroy();
    };
  }, [activeTab]);
  

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

          <Card>
            <h3>Saldo Liquido</h3>
            <Title>$3120.54</Title>
          </Card>
          <Card>
            <h3>Entrada</h3>
            <Title>$3120.54</Title>
          </Card>
          <Card>
            <h3>Despesas</h3>
            <Title>$3120.54</Title>
          </Card>
          <Card>
            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
            />
          </Card>
          {/* Grafico de barra de entradas e despesas */}
          <Card className={styles.card}>
            <Title level={5}>Últimas entradas/saídas</Title>
            <p>Resumo das despesas de Jan a Dez</p>
            <div ref={chartRef} style={{ minHeight: 350 }} />
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
