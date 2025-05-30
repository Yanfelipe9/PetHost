'use client'
import { useAuth } from "@/app/context/AuthContext";
import img from '@/assets/imgs/Group 48095478.png';
import api from "@/utils/axios";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Input, message, Space, Spin, Table, Tabs, Typography } from "antd";
import ApexCharts from "apexcharts";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from './financas.module.css';

const { TabPane } = Tabs;
const { Title } = Typography;

interface DetalhesSaldo {
  entrada: number;
  saida: number;
  saldoLiquido: number;
}

const FinanceiroPage = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("painel");
  const [detalhesSaldo, setDetalhesSaldo] = useState<DetalhesSaldo>(null);
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

    const detalhes = async () => {
      try {
        const response = await api.get(`/visao-geral/detalhes-saldo/${user.userId}`);
        setDetalhesSaldo(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchAgendamentos();
    detalhes();
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
            colors: ['rgba(47, 41, 43, 1)', "rgba(0, 122, 255, 1)"],
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
      }, 100);
    }

    return () => {
      if (chart) chart.destroy();
    };
  }, [activeTab]);

  const filteredData = agendamentos ? agendamentos.filter(
    (item) =>
      item.pet.nome?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.baia.descricao?.toLowerCase().includes(searchText.toLowerCase())
  ) : [];

  const handleDelete = async (id) => {
    try {
      await api.delete(`/agendamentos/${id}`);
      message.success("Agendamento deletado com sucesso!");
      setAgendamentos(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      message.error("Erro ao deletar agendamento");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome do Pet", dataIndex: ["pet", "nome"], key: ["pet", "nome"] },
    { title: "Baia", dataIndex: ["baia", "descricao"], key: ["baia", "descricao"] },
    {
      title: "Valor", dataIndex: "valor", key: "valor",
      render: (text) => <span> R${text}</span>
    },
    { title: "Status", dataIndex: "statusPagamento", key: "statusPagamento" },
    { title: "Forma de Pagamento", dataIndex: "formaPagamento", key: "formaPagamento" },
    {
      title: "Ações",
      key: "acoes",
      render: (_text, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Deletar
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container} style={{ padding: 20 }}>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} style={{ marginBottom: 16 }}>
        <TabPane tab="Painel" key="painel" className={styles.tapPanePainel}>
          <div className={styles.cabecalho}>
            <Card style={{ width: '30%', background: 'rgba(21, 112, 239, 1)', color: 'white' }}>
              <h3>Saldo Liquido</h3>
              <Title style={{ color: 'white' }}>R$ {detalhesSaldo?.saldoLiquido}</Title>
            </Card>
            <div className={styles.entrada_despesas}>
              <Card style={{ background: 'rgba(21, 112, 239, 1)', color: 'white', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Image src={img} alt="icone" width={50} height={50} />
                  <div>
                    <h3 style={{ color: 'white', margin: 0 }}>Entrada</h3>
                    <Title level={4} style={{ color: 'white', margin: 0 }}>R$ {detalhesSaldo?.entrada}</Title>
                  </div>
                </div>
              </Card>

              <Card style={{ background: 'rgba(21, 112, 239, 1)', color: 'white', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Image src={img} alt="icone" width={50} height={50} />
                  <div>
                    <h3 style={{ color: 'white', margin: 0 }}>Despesas</h3>
                    <Title level={4} style={{ color: 'white' }}>R$ {detalhesSaldo?.saida}</Title>
                  </div>
                </div>
              </Card>
            </div>
          </div>


          {/* Grafico de barra de entradas e despesas */}
           <Flex justify="space-between" align="flex-start" className={styles.header}>
            <Space style={{ marginBottom: 16 }}>
              <Input
                placeholder="Pesquisar por Nome ou Baia"
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
              <Button icon={<FilterOutlined />}>Filtrar</Button>
            </Space>
          </Flex>

           <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
              rowKey="id"
              scroll={{ x: 'max-content' }}
            />
        </TabPane>

    
      </Tabs>
    </div>
  );
};

export default FinanceiroPage;
