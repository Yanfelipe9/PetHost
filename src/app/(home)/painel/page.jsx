"use client";

import React, { useEffect, useRef } from "react";
import { Card, Col, Row, Typography } from "antd";
import ApexCharts from "apexcharts";
import "./painel.module.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  const chartRefBar = useRef(null); // Referência para o gráfico de barras
  const chartRefRadial = useRef(null); // Referência para o gráfico radial

  useEffect(() => {
    // Gráfico Radial
    if (chartRefRadial.current) {
      const optionsRadial = {
        series: [80],
        chart: {
          type: "radialBar",
          height: 250, 
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5,
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#444",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Average Results"],
      };

      const chartRadial = new ApexCharts(chartRefRadial.current, optionsRadial);
      chartRadial.render();

      return () => {
        chartRadial.destroy();
      };
    }
  }, []);

  useEffect(() => {
    // Gráfico de Barras
    if (chartRefBar.current) {
      const optionsBar = {
        series: [{ data: ["10%", "25%", "50%", "75%", "100%", "20", "20", "20", "20", "20", "20", "20"] }],
        chart: {
          height: 350,
          type: "bar",
        },
        colors: ["#008FFB"],
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
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
          ],
          labels: {
            style: {
              colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8",
              ],
              fontSize: "12px",
            },
          },
        },
      };

      const chartBar = new ApexCharts(chartRefBar.current, optionsBar);
      chartBar.render();

      return () => {
        chartBar.destroy();
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

      {/* Gráfico Radial */}
      <Card bordered={false} className="dashboard-card radial-card" style={{ alignSelf: "flex-end", marginLeft: "auto", width: "500px" }}>
        <Title level={4} className="dashboard-title">Status do Hotel</Title>
        <div id="chartRadial" ref={chartRefRadial}></div>
      </Card>

      {/* Gráfico de Barras */}
      <Card bordered={false} className="dashboard-card">
        <Title level={4} className="dashboard-title">Estatisticas de Ocupação.</Title>
        <div id="chartBar" ref={chartRefBar}></div>
      </Card>
    </main>
  );
}
