"use client";

import React from "react";
import { Card, Col, Row, Typography } from "antd";
import "./painel.module.css";

const { Title, Text } = Typography;

const stats = [
  { label: "Check-in", value: 23, description: "Hoje" },
  { label: "Check-out", value: 13, description: "Hoje" },
  { label: "No hotel", value: 60, description: "Total" },
  { label: "Baias disponíveis", value: 10, description: "Total" },
  { label: "Baias ocupadas", value: 90, description: "Total" },
];

export default function Dashboard() {
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
    </main>
  );
}