'use client';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  BugOutlined,
  AppstoreOutlined,
  DollarOutlined,
  RiseOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/assets/imgs/logo.png';
import Image from 'next/image';
import styles from './layout.module.css';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

const { Sider, Content } = Layout;

export default function HomeLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth(); // ✅ acesso ao contexto

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      router.push('/');
    } else {
      router.push(key);
    }
  };

  return (
    <Layout className={styles.layoutContainer}>
      <Sider
        breakpoint="md"
        style={{ backgroundColor: 'white' }}
        className={styles.sidebar}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth="70"
      >
        <div style={{ padding: '10px' }}>
          <Image
            className={styles.img}
            src={Logo}
            alt="Logo"
            width={196}
            height={40}
          />
        </div>
        <Menu
          onClick={handleMenuClick}
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          defaultSelectedKeys={['/painel']}
        >
          <Menu.Item key="/painel" icon={<UserOutlined />}>
            Painel
          </Menu.Item>
          <Menu.Item key="/clientes" icon={<LaptopOutlined />}>
            Clientes
          </Menu.Item>
          <Menu.Item key="/agendamentos" icon={<CalendarOutlined />}>
            Agendamentos
          </Menu.Item>
          <Menu.Item key="/pets" icon={<BugOutlined />}>
            Pets
          </Menu.Item>
          <Menu.Item key="/baias" icon={<AppstoreOutlined />}>
            Baias
          </Menu.Item>
          <Menu.Item key="/financas" icon={<DollarOutlined />}>
            Financeiro
          </Menu.Item>
          <Menu.Item key="/despesas" icon={<RiseOutlined />}>
            Despesas
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            style={{ color: 'red' }}
          >
            Sair
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className={styles.contentContainer}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
