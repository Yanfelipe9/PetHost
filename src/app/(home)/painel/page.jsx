"use client";

import React, { useEffect, useRef } from "react";
import { Card, Col, Row, Typography } from "antd";
import ApexCharts from "apexcharts";
import "./painel.module.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  const chartRef = useRef(null); // Criando referência para o gráfico

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [{ data: [21, 22, 10, 28, 16, 21, 13, 30] }],
        chart: {
          height: 350,
          type: "bar",
        },
        colors: ["#008FFB"], // Definição correta de cores
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        xaxis: {
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"],
          ],
          labels: {
            style: {
              colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A", "#26a69a", "#D10CE8"],
              fontSize: "12px",
            },
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy(); // Evita vazamento de memória ao desmontar o componente
      };
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
    <main className="dashboard-container">
      <Card bordered={false} className="dashboard-card">
        <Title level={4} className="dashboard-title">Visão geral</Title>
        <Row gutter={[32, 16]} justify="center" align="middle" className="dashboard-row">
          {stats.map((stat, index) => (
            <Col key={index}>
              <Text type="secondary" style={{ display: "block" }}>
                {stat.description}
              </Text>
              <Text>{stat.label} </Text>
              <Text strong style={{ color: "#1677ff", fontSize: "16px" }}>
                {stat.value}
              </Text>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Gráfico */}
      <div id="chart" ref={chartRef}></div>
    </main>
  );
}
