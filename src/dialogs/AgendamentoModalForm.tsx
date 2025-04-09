"use client";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
  AutoComplete,
} from "antd";

interface AgendamentoFormProps {
  form: any;
  pets: { nome: string }[];
}

export default function AgendamentoFormModalForm({ form, pets }: AgendamentoFormProps) {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="busca"
        label="Pesquisar por pet"
        rules={[{ required: true, message: "Informe o nome do pet" }]}
      >
        <AutoComplete
          options={pets.map((pet) => ({
            value: pet.nome,
          }))}
          style={{ width: "100%" }}
          placeholder="Buscar por nome do pet"
          allowClear
          filterOption={(inputValue, option) =>
            option?.value
              ?.toLowerCase()
              .includes(inputValue.toLowerCase())
          }
          onSelect={(value) => form.setFieldsValue({ busca: value })}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="periodo" label="Período de estadia">
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder={["Data de início", "Data de término"]}
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="compartimento" label="Compartimento">
            <Input
              placeholder="Ex: Canil 3"
              prefix={<EnvironmentOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="valor" label="Valor">
            <Input
              type="number"
              prefix="R$"
              addonBefore={<DollarOutlined />}
              placeholder="Ex: 150,00"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="pagamento" label="Forma de pagamento">
            <Select
              placeholder="Selecione"
              options={[
                { value: "dinheiro", label: "Dinheiro" },
                { value: "cartao", label: "Cartão" },
                { value: "pix", label: "Pix" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="obsAgendamento" label="Observações">
        <Input.TextArea
          rows={3}
          placeholder="Informações adicionais sobre o agendamento"
          
        />
      </Form.Item>
    </Form>
  );
}
