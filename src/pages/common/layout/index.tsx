import { Layout, ConfigProvider, Menu } from "antd";
import type { MenuProps } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.less";
import zhCN from 'antd/locale/zh_CN';
import {
    DesktopOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    SettingOutlined
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  path?: string,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    path,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('首页', 'index', <HomeOutlined />, 'index'),
  getItem('雅思机考', '2', <DesktopOutlined />, undefined, [
    getItem('剑桥雅思', 'cambridgeIelts', null, 'cambridgeIelts'),
    getItem('考场真题', 'examination', null, 'examination'),
    getItem('自定义题库', 'customizedTest', null, 'customizedTest'),
  ]),
  getItem('配置题库', '3', <SettingOutlined />, undefined, [
    getItem('听力', '9'),
    getItem('阅读', '10'),
    getItem('写作', '11'),
    getItem('套题', '12')
  ]),
  getItem('问题反馈', '4', <QuestionCircleOutlined />),
];

const ReactLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState("index");

  useEffect(() => {
    let key = location.pathname.split("/")[1];
    setCurrentNav(key);
  }, []);
  const changePage = (e: any) => {
    console.log(e, "click");
    setCurrentNav(e.item.props.path);
    navigate(e.item.props.path);
  }


  return (
    <Layout>
      <Sider style={{ width: 256, height: "100vh" }}>
        <div style={{ height: "64px", color: "#fff" }}>logo</div>
        <Menu
          defaultSelectedKeys={[currentNav]}
          selectedKeys={[currentNav]}
          defaultOpenKeys={["2", "3"]}
          mode="inline"
          theme="dark"
          items={items}
          onClick={(e) => changePage(e)}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className="flex-alc-jcs">
            <div className="font-24 fwb">IELTS机考模拟系统</div>
            <div className="font-18">Alex</div>
          </div>
        </Header>
        <Content>
          <ConfigProvider locale={zhCN}>
            <Outlet />
          </ConfigProvider>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
export default ReactLayout;
