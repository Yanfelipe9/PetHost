'use client';

import styles from './despesas.module.css';
import { Card, Input, Select, Button, Table, Col, Row, Pagination, Tag, Space } from "antd";
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
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Formulário */}
                <Card className={styles.grayCard}>
                    <Row gutter={16}>
                        <Col xs={24} md={8} className={styles.fullHeight}>
                            <h3><strong>Descrição</strong></h3>
                            <Input placeholder="Digite a descrição" style={{ height: 48, fontSize: 16 }} />
                            <h3 style={{ marginTop: 16 }}><strong>Valor</strong></h3>
                            <Input placeholder="Digite o valor" style={{ height: 48, fontSize: 16 }} />
                        </Col>

                        <Col className={styles.fullHeight} xs={24} md={8} style={{ paddingLeft: 250 }}>
                            <h3><strong>Tipo de Despesa</strong></h3>
                            <Select
                                placeholder="Despesas fixas"
                                style={{ width: '100%', height: 48, fontSize: 16 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'diario', label: 'DIÁRIO' },
                                    { value: 'semanal', label: 'SEMANAL' },
                                    { value: 'mensal', label: 'MENSAL' },
                                ]}
                            />
                        </Col>

                        <Col xs={24} md={8} style={{ paddingLeft: 250, display: 'flex', alignItems: 'flex-end' }}>
                            <Button type="primary" style={{ width: '100%', height: 48, fontSize: 16 }}>
                                Adicionar despesa
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {/* Cards de resumo */}
                <Card className={styles.borderedSummaryCard} style={{ color: 'white', borderRadius: 10, textAlign: 'center', width: 800}}>
                    <Row gutter={16} justify="start">
                        <Col>
                            <Card style={{ backgroundColor: '#1570EF', color: 'white', borderRadius: 10, textAlign: 'center', width: 180 }}>
                                <h4>Despesa Diária</h4>
                                <h3>R$ 6.169,00</h3>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ backgroundColor: '#1570EF', color: 'white', borderRadius: 10, textAlign: 'center', width: 180 }}>
                                <h4>Despesa Semanal</h4>
                                <h3>R$ 6.169,00</h3>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ backgroundColor: '#1570EF', color: 'white', borderRadius: 10, textAlign: 'center', width: 180 }}>
                                <h4>Despesa Mensal</h4>
                                <h3>R$ 6.169,00</h3>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* Tabela */}
                <Card  className={styles.borderedSummaryCard}>
                    <Table columns={columns} dataSource={data} pagination={false} />
                    <Pagination  align="center" style={{ marginTop: 16, textAlign: 'right' }} defaultCurrent={1} total={10} />
                </Card>
            </Space>
        </main>
    );
};

export default DespesasPage;
