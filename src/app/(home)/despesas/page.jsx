'use client';

import styles from './despesas.module.css';
import { Card, Input, Select, Button, Space, Table, Pagination, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const DespesasPage = () => {
    const handleChange = value => {
        console.log(`selected ${value}`);
    };

    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
            render: categoria => (
                <Tag color={categoria === 'Mensal' ? 'blue' : 'red'}>
                    {categoria}
                </Tag>
            )
        },
        {
            title: 'Valor total',
            dataIndex: 'valor',
            key: 'valor',
        },
        {
            key: 'editar',
            render: () => <EditOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        },
        {
            key: 'deletar',
            render: () => <DeleteOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        }
    ];

    const data = [
        { key: 1, descricao: 'Salários', categoria: 'Mensal', valor: 'R$ 467,00' },
        { key: 2, descricao: 'Produtos de limpeza', categoria: 'Custos casuais', valor: 'R$ 467,00' },
        { key: 3, descricao: 'Manutenção', categoria: 'Custos casuais', valor: 'R$ 467,00' },
        { key: 4, descricao: 'Luz', categoria: 'Mensal', valor: 'R$ 467,00' },
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
                    <p>Despesas</p>
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

            <Card className={styles.cardDespesa}>
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

            <Card className={styles.table}>
                <Table columns={columns} dataSource={data} pagination={false} />
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Pagination defaultCurrent={1} total={10} />
                </div>
            </Card>
        </main>
    );
};

export default DespesasPage;
