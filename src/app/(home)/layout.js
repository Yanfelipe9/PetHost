"use client";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  BugOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/imgs/logo.png";
import Image from "next/image";
const { Sider, Content } = Layout;

export default function HomeLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = ({ key }) => {
    router.push(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Menu lateral (Sider) */}
      <Sider style={{ background: "#fff" }}>
        <div style={{ padding:'10px'}}>
          <Image src={Logo} alt="Logo" width={196} height={40} />
        </div>
        <Menu
          onClick={handleMenuClick}
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          defaultSelectedKeys={["/painel"]}
        >
          <Menu.Item key="/painel" icon={<UserOutlined />}>
            Painel
          </Menu.Item>
          <Menu.Item key="/clientes" icon={<LaptopOutlined />}>
            Clientes
          </Menu.Item>
          <Menu.Item key="/pets" icon={<BugOutlined />}>
            Pets
          </Menu.Item>
          <Menu.Item key="/baias" icon={<AppstoreOutlined />}>
            Baias
          </Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined />}>
            Serviços
          </Menu.Item>
          <Menu.Item key="4" icon={<NotificationOutlined />}>
            Contato
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Área principal de conteúdo */}
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
