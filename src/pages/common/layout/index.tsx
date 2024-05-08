import { Layout, ConfigProvider, Menu, Breadcrumb } from "antd";
import type { MenuProps } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.less";
import zhCN from "antd/locale/zh_CN";
import routes from "../../../router/index";
import {
  DesktopOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  path?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    path,
    children,
    label,
  } as MenuItem;
}

function formatRoutes(routes: any[]) {
  const transformedItems = [];

  for (const route of routes) {
    const { label, name, path, icon, showLink, children } = route;
    if (
      showLink ||
      (children && children.some((child: any) => child.showLink))
    ) {
      let formattedChildren;
      if (children && children.length > 0) {
        formattedChildren = formatRoutes(children);
      }
      const menuItem = getItem(label, path, icon, path, formattedChildren);
      transformedItems.push(menuItem);
    }
  }

  return transformedItems;
}

const ReactLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState("index");
  const [breadcrumbItems, setBreadcrumbItems] = useState<any[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  const updateBreadcrumbItems = (pathParts: string[], items: any[]) => {
    const newBreadcrumbItems: any[] = [];

    const findItemByPathPart = (pathPart: string, itemList: any[]) => {
      return itemList.find((item) => item.path === pathPart);
    };

    const traverseItems = (parts: string[], itemList: any[]) => {
      if (parts.length === 0) return;

      const currentItem = findItemByPathPart(parts[0], itemList);
      if (currentItem) {
        newBreadcrumbItems.push({
          title: currentItem.label,
          href:
            parts.length === 1 || parts.length === pathParts.length
              ? currentItem.redirect
                ? `/#${currentItem.redirect}`
                : undefined
              : `/${parts[0]}`,
        });

        if (currentItem.children) {
          traverseItems(parts.slice(1), currentItem.children);
        }
      } else {
        for (const item of itemList) {
          if (item.children) {
            traverseItems(parts, item.children);
          }
        }
      }
    };

    traverseItems(pathParts, items);
    setBreadcrumbItems(newBreadcrumbItems);
  };
  useEffect(() => {
    const _items = formatRoutes(
      routes.find((item) => item.name === "Layout").children
    );
    setItems(_items);
  }, []);

  useEffect(() => {
    let key: any = location.pathname.split("/").pop();
    setCurrentNav(key);
    updateBreadcrumbItems(location.pathname.split("/").filter(Boolean), routes);
  }, [location.pathname]);

  const changePage = (e: any) => {
    const path = e.keyPath.reverse().join("/");
    navigate(path);
  };

  return (
    <Layout>
      <Sider style={{ width: 256, height: "100vh" }}>
        <div style={{ height: "64px", color: "#fff" }}>logo</div>
        <Menu
          defaultSelectedKeys={[currentNav]}
          selectedKeys={[currentNav]}
          defaultOpenKeys={["test", "config"]}
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
        <Breadcrumb className="pt-20 pl-20" items={breadcrumbItems} />
        <Content>
          <ConfigProvider locale={zhCN}>
            <Outlet />
          </ConfigProvider>
        </Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
    </Layout>
  );
};
export default ReactLayout;
