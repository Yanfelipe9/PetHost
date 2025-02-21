'use client'

import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,Form, Input, Flex, Typography } from 'antd';
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import styles from './form-login.module.css'
const { Title } = Typography;


export default function FormLogin() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    await signIn('credentials', {
      callbackUrl: '/',
      email: values.email,
      password: values.password,
    });
    setLoading(false);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={3} style={{ textAlign: 'left' }}>Login</Title>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Digite seu e-mail!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Digite sua senha!' }]}
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
            Não possui conta? <Link  href='/signon'> Cadastre-se</Link>
          </p>
        </Flex>
      </Form.Item>
    </Form>
  );
}
