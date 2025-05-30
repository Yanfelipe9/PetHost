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
     <Form.Item name="busca">
  <AutoComplete
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
      <Form.Item name="baia" label="Báia" rules={[{ required: true, message: "Informe a Báia" }]}>
  <AutoComplete
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
