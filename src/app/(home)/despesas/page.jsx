'use client';

import styles from './despesas.module.css'
import { Card, Input, Select, Button, Space, Table} from "antd";

const DespesasPage = () => {
    const handleChange = value => {
        console.log(`selected ${value}`);
    };
    const columns = [
        {
          title: 'Descrição',
          dataIndex: 'descrição',
          key: 'descrição',
        },
        {
          title: 'Categoria',
          dataIndex: 'categoria',
          key: 'categoria',
        },
        {
          title: 'Valor total',
          dataIndex: 'valor total',
          key: 'valor total',
        },
        {
            dataIndex: 'editar',
            key: 'editar',
        },
        {
            dataIndex: 'deletar',
            key: 'deletar'
        }
      ];
    return (
        <main className={styles.container}>
            <Card>
                <p>Descrição</p>
                <Input placeholder="Digite a Descrição" />
                <p>Valor</p>
                <Input placeholder="Digite o valor" />  
                <Select
                    placeholder="Despesas fixas"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'diario', label: 'Diario' },
                        { value: 'semanal', label: 'Semanal' },
                        { value: 'mensal', label: 'Mensal' },
                    ]}
                />    
                <Button type="primary">Adicionar despesa</Button>
            </Card>
            <Card>
                <Space wrap>        
                    <Card style={{ background: 'rgba(21, 112, 239, 1)', color: 'white' }}>
                        <h3>Despesa Diária</h3>
                        <h3>$3120.54</h3>
                    </Card>
                    <Card style={{ background: 'rgba(21, 112, 239, 1)', color: 'white' }}>
                        <h3>Despesa Semanal</h3>
                        <h3>$3120.54</h3>
                    </Card>
                    <Card style={{ background: 'rgba(21, 112, 239, 1)', color: 'white' }}>
                        <h3>Despesas Mensal</h3>
                        <h3>$3120.54</h3>
                    </Card>
                </Space>
            </Card>
            <Card>
                <Table columns={columns} />;
            </Card>
        </main>
    )
}

export default DespesasPage;
