import {
  TeamOutlined,
  HomeOutlined,
  DesktopOutlined,
  FormOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './side-menu.css';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '/', <HomeOutlined />),
  getItem('Repair requests', '/repair_app', <FormOutlined />),
  getItem('Computer equipment', '/computer_equip', <DesktopOutlined />),
  getItem('Employee', '/employees', <TeamOutlined />),
  getItem('Positions', '/positions', <UserOutlined />),
  getItem('Registration', '/register', <UserAddOutlined />),
];
const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={220}
      style={{
        background: '#00a1dc',
      }}
    >
      <Menu
        className="sidebarMenu"
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        items={items}
        style={{
          background: '#00a1dc',
        }}
      />
    </Sider>
  );
};
export default SideMenu;
