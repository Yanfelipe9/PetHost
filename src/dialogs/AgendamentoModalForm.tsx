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
  FormInstance,
  Input,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

interface Baia {
  id: number;
  descricao: string;
}
interface AgendamentoFormProps {
  form: FormInstance;
  pets: PetInfoInterface[];
  baias: Baia[]
}

export default function AgendamentoFormModalForm({ form, pets, baias }: AgendamentoFormProps) {

  // useEffect(() => {
  //   form.setFieldValue("periodo", [dayjs("2024-12-31"), dayjs("2024-01-01")]);
  // })
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="busca"
        label="Pesquisar por pet"
        rules={[{ required: true, message: "Informe o nome do pet" }]}
      >
     <Form.Item name="busca">
  <AutoComplete
    id="pet"
    options={pets.map((pet) => ({
      label: `${pet.nome} - ${pet.racaPet}`, // o que aparece no dropdown
      value: `${pet.nome} - ${pet.racaPet}`, // valor exibido no input
      petId: pet.id,                         // valor que será salvo separadamente
    }))}
    style={{ width: "100%" }}
    placeholder="Buscar por nome do pet"
    allowClear
    value={form.getFieldValue("busca")}
    optionFilterProp="label"
    filterOption={(inputValue, option) =>
      option?.label?.toLowerCase().includes(inputValue.toLowerCase())
    }
    onSelect={(label, option) => {
      form.setFieldsValue({
        busca: label,               // texto visível no campo
        petId: option.petId,        // ID salvo separado
      });
    }}
  />
</Form.Item>

<Form.Item name="petId" hidden>
  <Input />
</Form.Item>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item 
            name="periodo" 
            label="Período de estadia"  
            rules={[
              { required: true, message: "Informe a estadia" },
                 {
                  validator: (_, value) => {
                    if (!value || value.length !== 2) return Promise.resolve();
                    const [start, end] = value;
                    if (start && end && start.isAfter(end)) {
                      return Promise.reject(new Error('Data de início não pode ser maior que a data de término'));
                    }
                    return Promise.resolve();
                  },
                },
            ]}
          >
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder={["Data de início", "Data de término"]}
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
      <Form.Item name="baia" label="Báia" rules={[{ required: true, message: "Informe a Báia" }]}>
  <AutoComplete
    id="baia"
    options={baias.map((baia) => ({
      label: baia.descricao,       // o que aparece no dropdown
      value: baia.descricao,       // valor exibido no input
      baiaId: baia.id              // ID real que será salvo no campo oculto
    }))}
    style={{ width: "100%" }}
    placeholder="Ex: Canil 3"
    allowClear
    value={form.getFieldValue("baia")}
    filterOption={(inputValue, option) =>
      option?.label?.toLowerCase().includes(inputValue.toLowerCase())
    }
    onSelect={(label, option) => {
      form.setFieldsValue({
        baia: label,              // texto visível no campo
        baiaId: option.baiaId     // ID salvo no campo oculto
      });
    }}
  />
</Form.Item>

<Form.Item name="baiaId" hidden>
  <Input />
</Form.Item>

        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="valor" label="Valor"  rules={[
            { required: true, message: "Informe o valor" },
            {
              validator: (_, value) => {
                if (value === undefined || value === null || value === "") {
                  return Promise.resolve(); // já tratado por `required`
                }
                if (isNaN(value)) {
                  return Promise.reject(new Error("O valor deve ser um número"));
                }
                if (parseFloat(value) <= 0) {
                  return Promise.reject(new Error("O valor deve ser maior que zero"));
                }
                return Promise.resolve();
              },
            },
          ]}>
            <Input
              id="valor"
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
              id="pagamento"
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
