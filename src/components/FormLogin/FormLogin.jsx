"use client";

import React, { useContext, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Typography } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./form-login.module.css";
import api from "@/utils/axios";
import {  useAuth } from "@/app/context/AuthContext";
import {  useRouter } from "next/navigation";
const { Title } = Typography;

export default function FormLogin() {
  const { login } = useAuth(); // Pegando o método login do contexto

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    api
      .post("/auth/login", values)
      .then((response) => {
        login(response.data); // Salvando o usuário no contexto
        console.log("Login efetuado com sucesso:", response.data);
        router.push("/painel");
      })
      .catch((error) => {
        console.error("Erro ao efetuar login:", error);
      })
      .finally(() => setLoading(false));
    setLoading(false);
  };

  return (
    <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
      <Title level={3} style={{ textAlign: "left" }}>
        Login
      </Title>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Digite seu e-mail!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Digite sua senha!" }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Senha" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Entrar
        </Button>
      </Form.Item>
      <Form.Item>
        <Flex justify="center">
          <p className={styles.link}>
            Não possui conta? <Link href="/signon"> Cadastre-se</Link>
          </p>
        </Flex>
      </Form.Item>
    </Form>
  );
}
