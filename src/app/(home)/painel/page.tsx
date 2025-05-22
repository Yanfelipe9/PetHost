"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import ApexCharts from "apexcharts";
import styles from "./painel.module.css";
import api from "@/utils/axios";
import { count } from "console";
import { userInfo } from "os";
import { useAuth } from "@/app/context/AuthContext";

const { Title, Text } = Typography;

interface VisaoGeral {
  countCheckIn: number;
  countCheckOut: number;
  countTotaHospedadoHotel: number;
  countBaiasDisponiveis: number;
  countBaiasOcupadas: number;
}

interface statusMensal {
  mes: string;
  percentualOcupacao: number;
}
export default function Dashboard() {
   const { user } = useAuth();
  const chartRefBar = useRef(null);
  const chartRefRadial = useRef(null);
  const [fontSize, setFontSize] = useState(window.innerWidth <= 500 ? "8px" : "12px");
  const [dadosGerais, setDadosGerais] = useState<VisaoGeral>({
    countCheckIn: 0,
    countCheckOut: 0,
    countTotaHospedadoHotel: 0,
    countBaiasDisponiveis: 0,
    countBaiasOcupadas: 0,
  });

  const [statusHotel, setStatusHotel] = useState(0);
  const [statusMensal, setStatusMensal] = useState<statusMensal[]>([]);

  // Função para ajustar o fontSize ao redimensionar a tela
  const handleResize = () => {
    setFontSize(window.innerWidth <= 500 ? "8px" : "12px");
  };

  // Adicionando o event listener no resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartRefRadial.current) {
      const optionsRadial = {
        series: [statusHotel],
        chart: {
          type: "radialBar",
          height: 180,
          sparkline: { enabled: true },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#f0f0f0",
              strokeWidth: "100%",
            },
            dataLabels: {
              name: { show: false },
              value: {
                offsetY: 5,
                fontSize: "20px",
                color: "#1f1f1f",
              },
            },
          },
        },
        fill: {
          type: "solid",
          colors: ["#3b82f6"],
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Completo"],
      };

      const chartRadial = new ApexCharts(chartRefRadial.current, optionsRadial);
      chartRadial.render();

      return () => chartRadial.destroy();
    }
  }, [statusHotel]);

  useEffect(() => {
    if (chartRefBar.current) {
      const optionsBar = {
        series: [
          {
            data: getArrayStatusMensal(),
          },
        ],
        chart: {
          height: 250,
          type: "bar",
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: "55%",
          },
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez",
          ],
          labels: {
            style: {
              fontSize: fontSize, // O fontSize será dinâmico conforme a largura da tela
              colors: "#8c8c8c",
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => `${val}%`,
            style: {
              colors: "#8c8c8c",
            },
          },
        },
        grid: {
          strokeDashArray: 5,
          borderColor: "#f0f0f0",
        },
        colors: ["#3b82f6"],
      };

      const chartBar = new ApexCharts(chartRefBar.current, optionsBar);
      chartBar.render();

      return () => chartBar.destroy();
    }
  }, [fontSize,statusMensal]); // A dependência foi alterada para "fontSize", assim o gráfico será re-renderizado quando a largura da tela mudar

  useEffect(() => {
     if (!user?.userId) return; // Aguarda o userId estar carregado antes de buscar clientes
      console.log(user?.userId);
      const getVisalGeralDados = async () => {
        const dados = await  api.get(`/visao-geral/${user?.userId}`)
        console.log(dados.data);
        setDadosGerais(dados.data);
      }

    getVisalGeralDados();
  }, [user?.userId])


  useEffect(() => {
    if (!user?.userId) return; // Aguarda o userId estar carregado antes de buscar clientes
    const getStatusHotel = async () => {
      const dados = await api.get("/visao-geral/status-ocupacao/"+user?.userId);
      setStatusHotel(dados.data);
    };

    const getStatusMensal = async () => {
      const dados = await api.get("/visao-geral/ocupacao-mensal",{
        params: {
          userId: user?.userId,
        },
      });
      console.log(dados.data);
      setStatusMensal(dados.data);
    }

    getStatusHotel();
    getStatusMensal();
  }, [user?.userId]);
 
  const getArrayStatusMensal = () => {
    const arrayStatusMensal = statusMensal.map((item) => item.percentualOcupacao);
    console.log(arrayStatusMensal);
    return arrayStatusMensal;
  }

  const stats = [
    { label: "Check-in", value: dadosGerais.countCheckIn, description: "Hoje" },
    { label: "Check-out", value: dadosGerais.countCheckOut, description: "Hoje" },
    { label: "No hotel", value: dadosGerais.countTotaHospedadoHotel, description: "Total" },
    { label: "Baias disponíveis", value: dadosGerais.countBaiasDisponiveis, description: "Total" },
    { label: "Baias ocupadas", value: dadosGerais.countBaiasOcupadas, description: "Total" },
  ];

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.gridTop}>
        <Card className={`${styles.card} ${styles.cardVisaoGeral}`}>
          <Title
            level={5}
            style={{ fontSize: "20px" }}
            className={styles.sectionTitle}
          >
            Visão geral
          </Title>
          <Row gutter={[8, 24]} wrap>
            {stats.map((stat, idx) => (
              <Col
                key={idx}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
                className={styles.statItem}
              >
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {stat.description}
                </Text>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                  className="justify-content-between md:justify-content-start"
                >
                  <Text style={{ fontSize: "14px" }}>{stat.label}</Text>
                  <Text strong style={{ color: "#3b82f6", fontSize: "22px" }}>
                    {stat.value}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        <Card className={`${styles.card} ${styles.cardBaia}`}>
          <Title
            level={5}
            style={{ fontSize: "20px" }}
            className={styles.sectionTitle}
          >
            Status das baias
          </Title>
          <Row>
            <Col span={12}>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Baias ocupadas
              </Text>
              <div>
                <strong>104</strong>
              </div>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Limpas
              </Text>
              <div>90</div>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Sujas
              </Text>
              <div>4</div>
            </Col>
            <Col span={12}>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Baias disponíveis
              </Text>
              <div>
                <strong>20</strong>
              </div>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Limpas
              </Text>
              <div>30</div>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Sujas
              </Text>
              <div>19</div>
            </Col>
          </Row>
        </Card>

        <Card className={`${styles.card} ${styles.cardRadial}`}>
          <Title
            level={5}
            style={{ fontSize: "20px" }}
            className={styles.sectionTitle}
          >
            Status do Hotel
          </Title>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              ref={chartRefRadial}
              style={{
                flex: 1,
                minWidth: "200px",
                maxWidth: "300px",
                width: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                  }}
                ></span>
                <span style={{ color: "#6b7280" }}>Completo</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "50%",
                  }}
                ></span>
                <span style={{ color: "#6b7280" }}>Ainda a completar</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className={styles.card}>
        <Title level={5} className={styles.sectionTitle}>
          Estatísticas de Ocupação
        </Title>
        <div ref={chartRefBar}></div>
      </Card>
    </main>
  );
}
