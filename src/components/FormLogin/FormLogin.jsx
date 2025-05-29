"use client";

import React, { useContext, useState } from "react";
import { EllipsisOutlined, LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex, Typography, Spin } from "antd";
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
    localStorage.removeItem("token"); // Removendo token do localStorage
    api
      .post("/auth/login", values)
      .then((response) => {
        login(response.data); // Salvando o usuário no contexto
        console.log("Login efetuado com sucesso:", response.data);
        setLoading(false);
        router.push("/painel");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Erro ao efetuar login:", error);
      })
      .finally(() => setLoading(false));
    
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
        <div className="flex">
          <Button block loading={loading} type="primary" htmlType="submit" >
            Entrar
          </Button>
        
       {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />}
        </div>
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
