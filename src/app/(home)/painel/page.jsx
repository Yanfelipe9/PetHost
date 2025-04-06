"use client";

import React, { useEffect, useRef } from "react";
import { Card, Col, Row, Typography } from "antd";
import ApexCharts from "apexcharts";
import styles from "./painel.module.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  const chartRefBar = useRef(null);
  const chartRefRadial = useRef(null);

  useEffect(() => {
    if (chartRefRadial.current) {
      const optionsRadial = {
        series: [80],
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
  }, []);

  useEffect(() => {
    if (chartRefBar.current) {
      const optionsBar = {
        series: [
          {
            data: [70, 40, 60, 75, 95, 30, 65, 85, 90, 88, 92, 96],
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
              fontSize: "12px",
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
  }, []);

  const stats = [
    { label: "Check-in", value: 23, description: "Hoje" },
    { label: "Check-out", value: 13, description: "Hoje" },
    { label: "No hotel", value: 60, description: "Total" },
    { label: "Baias disponíveis", value: 10, description: "Total" },
    { label: "Baias ocupadas", value: 90, description: "Total" },
  ];

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.gridTop}>
        <Card className={`${styles.card} ${styles.cardVisaoGeral}`}>
          <Title level={5} style={{fontSize: "20px"}}className={styles.sectionTitle}>Visão geral</Title>
          <Row gutter={[16, 8]}>
            {stats.map((stat, idx) => (
              <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Text type="secondary" style={{ fontSize: "12px" }}>{stat.description}</Text>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "14px" }}>{stat.label}</Text>
                <Text strong style={{ color: "#3b82f6", fontSize: "22px" }}>{stat.value}</Text>
              </div>
            </Col>                     
            ))}
          </Row>
        </Card>

        <Card className={`${styles.card} ${styles.cardBaia}`}>
          <Title level={5} style={{fontSize: "20px"}} className={styles.sectionTitle}>Status das baias</Title>
          <Row>
            <Col span={12}>
              <Text type="secondary" style={{fontSize: "16px"}}>Baias ocupadas</Text>
              <div><strong>104</strong></div>
              <Text type="secondary" style={{fontSize: "16px"}}>Limpas</Text>
              <div>90</div>
              <Text type="secondary" style={{fontSize: "16px"}}>Sujas</Text>
              <div>4</div>
            </Col>
            <Col span={12}>
              <Text type="secondary" style={{fontSize: "16px"}}>Baias disponíveis</Text>
              <div><strong>20</strong></div>
              <Text type="secondary" style={{fontSize: "16px"}}>Limpas</Text>
              <div>30</div>
              <Text type="secondary" style={{fontSize: "16px"}}>Sujas</Text>
              <div>19</div>
            </Col>
          </Row>
        </Card>

        <Card className={`${styles.card} ${styles.cardRadial}`}>
          <Title level={5} style={{fontSize: "20px"}} className={styles.sectionTitle}>Status do Hotel</Title>
          <div ref={chartRefRadial}/>
        </Card>
      </div>

      <Card className={styles.card}>
        <Title level={5} className={styles.sectionTitle}>Estatísticas de Ocupação</Title>
        <div ref={chartRefBar}></div>
      </Card>
    </main>
  );
}