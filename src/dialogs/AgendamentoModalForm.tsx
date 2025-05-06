"use client";
import { PetInfoInterface } from "@/app/(home)/pets/page";
import {
  CalendarOutlined,
  DollarOutlined
} from "@ant-design/icons";
import {
  AutoComplete,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";

interface Baia {
  id: number;
  descricao: string;
}
interface AgendamentoFormProps {
  form: any;
  pets: PetInfoInterface[];
  baias: Baia[]
}

export default function AgendamentoFormModalForm({ form, pets, baias }: AgendamentoFormProps) {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="busca"
        label="Pesquisar por pet"
        rules={[{ required: true, message: "Informe o nome do pet" }]}
      >
        <AutoComplete
            options={pets.map((pet) => ({
              label: `${pet.nome} - ${pet.racaPet}`,
              value: `${pet.nome} - ${pet.racaPet}`, // mostra isso no campo
              petId: pet.id, // armazena o ID junto
            }))}
          style={{ width: "100%" }}
          placeholder="Buscar por nome do pet"
          allowClear
          optionFilterProp="label"
          filterOption={(inputValue, option) =>
            option?.label
              ?.toLowerCase()
              .includes(inputValue.toLowerCase())
          }
          onSelect={(value, option) => {
            form.setFieldsValue({ busca: value, petId: option.petId });
          }}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="periodo" label="Período de estadia"  rules={[{ required: true, message: "Informe a estadia" }]}>
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder={["Data de início", "Data de término"]}
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item name="baia" label="baia" rules={[{ required: true, message: "Informe a Báia" }]}>
          <AutoComplete
            options={baias.map((baia) => ({
              label: baia.descricao,
              value: baia.descricao, // exibe descrição no input
              baiaId: baia.id, // ID real vai junto
            }))}
            style={{ width: "100%" }}
            placeholder="Ex: Canil 3"
            allowClear
            filterOption={(inputValue, option) =>
              option?.label?.toLowerCase().includes(inputValue.toLowerCase())
            }
            onSelect={(value, option) => {
              form.setFieldsValue({ baia: value, baiaId: option.baiaId });
            }}
          />
        </Form.Item>

        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="valor" label="Valor"  rules={[{ required: true, message: "Informe o valor" }]}>
            <Input
              type="number"
              prefix="R$"
              addonBefore={<DollarOutlined />}
              placeholder="Ex: 150,00"
            />
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item name="pagamento" label="Forma de pagamento"  rules={[{ required: true, message: "Informe a forma de pagamento" }]}>
            <Select
              placeholder="Selecione"
              options={[
                { value: "DINHEIRO", label: "Dinheiro" },
                { value: "CARTAO", label: "Cartão" },
                { value: "PIX", label: "Pix" },
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
