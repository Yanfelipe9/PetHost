'use client';

import styles from './despesas.module.css'
import { Card, Input, Select, Button, Space, Table } from "antd";

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
            <div className={styles.cardContainer}>
                <div className={styles.cardContainer1}>
                    <div>
                        <p className={styles.p1}>Descrição</p>
                        <Input placeholder="Digite a Descrição" />
                    </div>
                    <div>
                        <p className={styles.p1}>Valor</p>
                        <Input placeholder="Digite o valor" />
                    </div>
                </div>
                <div className={styles.select}>
                    <Select
                        className={`${styles.select} ant-select`}
                        placeholder="Despesas fixas"
                        onChange={handleChange}
                        options={[
                            { value: 'diario', label: 'Diário' },
                            { value: 'semanal', label: 'Semanal' },
                            { value: 'mensal', label: 'Mensal' },
                        ]}
                    />
                </div>
                <div className={styles.cardContainerButton}>
                    <Button type="primary">Adicionar despesa</Button>
                </div>
            </div>

            <Card>
                <Space wrap className={styles.cardContainer2}>
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
