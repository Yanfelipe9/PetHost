'use client'

import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Typography, notification} from 'antd';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import axios from "axios";

const { Title } = Typography;

export default function FormCadastro() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Enviar os dados para o backend para realizar o cadastro
      const response = await axios.post("http://localhost:8080/auth/register", { // Usando o endpoint de cadastro
        email: values.email,
        password: values.password,
      });

      console.log('Cadastro bem-sucedido:', response.data);
      notification.success({
        message: 'Cadastro bem-sucedido!',
        description: 'Cadastro realizado com sucesso! Agora você pode fazer login.',
      });

      // Após o cadastro, você pode redirecionar para a página de login
      window.location.href = '/signin';  // Redirecionar ou usar o Link do Next.js

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      notification.error({
        message: 'Erro ao cadastrar',
        description: 'Houve um erro ao tentar realizar o cadastro. Tente novamente.',
      });
    }
    console.log('Cadastro', values);
    setLoading(false);
  };

  return (
    <Form
      name="cadastro"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={3} style={{ textAlign: 'left' }}>Cadastro</Title>

      {/* Campo de e-mail */}
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Digite seu e-mail!' }, { type: 'email', message: 'E-mail inválido!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" type="email" />
      </Form.Item>

      {/* Campo de senha */}
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Digite sua senha!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Senha" />
      </Form.Item>

      {/* Campo de confirmar senha */}
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Confirme sua senha!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('As senhas não coincidem!'));
            },
          }),
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Confirmar Senha" />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Cadastrar
        </Button>
      </Form.Item>

      <Form.Item>
        <Flex justify="center">
          <p>
            Já possui uma conta? <Link href='/signin'>Faça Login</Link>
          </p>
        </Flex>
      </Form.Item>
    </Form>
  );
}
