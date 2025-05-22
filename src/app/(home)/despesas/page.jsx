'use client';

import { useAuth } from "@/app/context/AuthContext";
import api from "@/utils/axios";
import { useState, useEffect } from 'react';
import styles from './despesas.module.css';
import { Card, Input, Select, Button, Space, Table, Pagination, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const DespesasPage = () => {
    const { user } = useAuth();
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [despesas, setDespesas] = useState([]);

    // Carregar despesas do usuário após login
    useEffect(() => {
        if (!user?.userId) return;

        const fetchDespesas = async () => {
            try {
                const response = await api.get(`/despesas/user/${user.userId}`);
                setDespesas(response.data);
            } catch (error) {
                console.error("Erro ao buscar despesas:", error);
            }
        };

        fetchDespesas();
    }, [user?.userId]);

    // Função para adicionar uma nova despesa
    const handleOk = async () => {
        // Validações manuais
        if (!descricao || !valor || !categoria) {
            message.error('Por favor, preencha todos os campos!');
            return;
        }

        const body = {
            descricao,
            valor,
            categoria,
            userId: user.userId,
        };

        try {
            await api.post("/despesas", body);
            setDescricao(''); // Limpa o campo de descrição
            setValor(''); // Limpa o campo de valor
            setCategoria(''); // Limpa o campo de categoria
            setDespesas((prev) => [...prev, body]); // Atualiza a lista de despesas
            message.success("Despesa cadastrada com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar despesas:", error);
            message.error("Erro ao cadastrar despesa");
        }
    };

    // Função para lidar com a mudança da categoria
    const handleChange = (value) => {
        setCategoria(value); // Atualiza a categoria selecionada
    };

    // Definir as colunas da tabela
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
            render: (categoria) => (
                <Tag color={categoria === 'Mensal' ? 'blue' : 'red'}>
                    {categoria}
                </Tag>
            ),
        },
        {
            title: 'Valor total',
            dataIndex: 'valor',
            key: 'valor',
        },
        {
            key: 'editar',
            render: () => <EditOutlined style={{ fontSize: 18, cursor: 'pointer' }} />,
        },
        {
            key: 'deletar',
            render: () => <DeleteOutlined style={{ fontSize: 18, cursor: 'pointer' }} />,
        },
    ];

    return (
        <main className={styles.container}>
            <div className={styles.cardContainer}>
                <div className={styles.cardContainer1}>
                    <div>
                        <p className={styles.p1}>Descrição</p>
                        <Input
                            placeholder="Digite a Descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={styles.p1}>Valor</p>
                        <Input
                            placeholder="Digite o valor"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.select}>
                    <p>Recorrência</p>
                    <Select
                        className={`${styles.select} ant-select`}
                        placeholder="Despesas fixas"
                        onChange={handleChange}
                        value={categoria || undefined}
                        options={[
                            { value: 'diario', label: 'Diário' },
                            { value: 'semanal', label: 'Semanal' },
                            { value: 'mensal', label: 'Mensal' },
                        ]}
                    />
                </div>
                <div className={styles.cardContainerButton}>
                    <Button type="primary" onClick={handleOk}>
                        Adicionar despesa
                    </Button>
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
                <Table columns={columns} dataSource={despesas} pagination={false} />
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Pagination defaultCurrent={1} total={despesas.length} />
                </div>
            </Card>
        </main>
    );
};

export default DespesasPage;
