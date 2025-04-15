"use client";
import {
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Form, Input, DatePicker, Radio, Row, Col, Select } from "antd";

interface PetFormProps {
  form: any;
  clientes: { id: number; nome: string; telefone: string }[];
}

export default function PetFormModalForm({ form, clientes }: PetFormProps) {
  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="nome"
            label="Nome do Pet"
            rules={[{ required: true, message: "Informe o nome do pet" }]}
          >
            <Input placeholder="Ex: Rex" prefix={<UserOutlined />} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="dtNascimento"
            label="Data de Nascimento"
            rules={[{ required: true, message: "Informe a data de nascimento" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder="Selecione a data"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="sexo"
            label="Sexo"
            rules={[{ required: true, message: "Informe o sexo" }]}
          >
            <Radio.Group
              options={[
                {
                  value: "MACHO",
                  label: (
                    <>
                      <ManOutlined /> Macho
                    </>
                  ),
                },
                {
                  value: "FEMEA",
                  label: (
                    <>
                      <WomanOutlined /> Fêmea
                    </>
                  ),
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="racaPet"
            label="Raça/Características do Pet"
            rules={[{ required: true, message: "Informe a raça" }]}
          >
            <Input
              placeholder="Ex: Golden Retriever"
              prefix={<InfoCircleOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="clienteId"
            label="Cliente"
            rules={[{ required: true, message: "Selecione um cliente" }]}
          >
            <Select
              showSearch
              placeholder="Selecione um Cliente"
              optionFilterProp="label"
              options={clientes.map((cliente) => ({
                value: cliente.id,
                label: `${cliente.nome} - ${cliente.telefone}`,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="observacoes" label="Observações">
        <Input.TextArea
          rows={4}
          placeholder="Informe cuidados especiais, medicamentos, etc."
      
        />
      </Form.Item>
    </Form>
  );
}
