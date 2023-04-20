import {
  TeamOutlined,
  HomeOutlined,
  DesktopOutlined,
  FormOutlined,
  UserAddOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const SideMenu = () => {
  const [username, setUsername] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          'https://autovaq.herokuapp.com/view-role/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUsername(res.data.role);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRole();
  }, [token]);

  const items = useMemo(() => {
    const baseItems = [
      getItem('Home', '/', <HomeOutlined />),
      getItem('Repair requests', '/repair_app', <FormOutlined />),
      getItem('Computer equipment', '/computer_equip', <DesktopOutlined />),
      getItem('Employee', '/employees', <TeamOutlined />),
      getItem('Job catalogue', '/job_catalogue', <ReadOutlined />),
      getItem('Registration', '/register', <UserAddOutlined />),
    ];
    if (username === '') {
      return [];
    } else if (username === 'Employee' || username === 'SysAdmin') {
      return [
        getItem('Home', '/', <HomeOutlined />),
        getItem('Repair requests', '/repair_app', <FormOutlined />),
        getItem('Computer equipment', '/computer_equip', <DesktopOutlined />),
      ];
    } else if (username === 'HR') {
      return [
        getItem('Home', '/', <HomeOutlined />),
        getItem('Job catalogue', '/job_catalogue', <ReadOutlined />),
        getItem('Registration', '/register', <UserAddOutlined />),
      ];
    } else {
      return baseItems;
    }
  }, [username]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={220}
      style={{
        background: '#00a1dc',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '220px',
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
      />
    </Sider>
  );
};

export default SideMenu;
