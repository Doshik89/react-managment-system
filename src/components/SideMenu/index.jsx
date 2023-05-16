import {
  TeamOutlined,
  HomeOutlined,
  DesktopOutlined,
  FormOutlined,
  UserAddOutlined,
  ReadOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [avaColor, setAvaColor] = useState('');
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
        setUserRole(res.data.role);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRole();
  }, [token]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get('https://autovaq.herokuapp.com/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserName(res.data[0].fields.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserName();
  }, [token]);

  useEffect(() => {
    const fetchAvatarColor = async () => {
      try {
        const res = await axios.get('https://autovaq.herokuapp.com/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAvaColor(res.data[0].fields.avatarColor);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAvatarColor();
  }, [token]);

  const items = useMemo(() => {
    const baseItems = [
      getItem('Home', '/', <HomeOutlined />),
      getItem('Repair requests', '/repair_app', <FormOutlined />),
      getItem('Computer equipment', '/computer_equip', <DesktopOutlined />),
      getItem('Employee', '/employees', <TeamOutlined />),
      getItem('Job catalogue', '/job_catalogue', <ReadOutlined />),
      getItem('Performance Graph', '/performance_chart', <BarChartOutlined />),
      getItem('Tasks', '/tasks', <FileTextOutlined />),
      getItem('Registration', '/register', <UserAddOutlined />),
    ];
    if (userRole === '') {
      return [];
    } else if (userRole === 'Employee') {
      return [
        getItem('Home', '/', <HomeOutlined />),
        getItem('Repair requests', '/repair_app', <FormOutlined />),
        getItem('Computer equipment', '/computer_equip', <DesktopOutlined />),
        getItem('Tasks', '/tasks', <FileTextOutlined />),
      ];
    } else if (userRole === 'SysAdmin') {
      return [
        getItem('Home', '/', <HomeOutlined />),
        getItem('Repair requests', '/repair_app', <FormOutlined />),
        getItem('Computer equipment', '/computer_equip', <DesktopOutlined />),
        getItem(
          'Performance Graph',
          '/performance_chart',
          <BarChartOutlined />
        ),
      ];
    } else if (userRole === 'HR') {
      return [
        getItem('Home', '/', <HomeOutlined />),
        getItem('Job catalogue', '/job_catalogue', <ReadOutlined />),
        getItem('Registration', '/register', <UserAddOutlined />),
      ];
    } else {
      return baseItems;
    }
  }, [userRole]);

  const siderStyle = {
    background: '#00a1dc',
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={220}
      style={siderStyle}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // add this line
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Link to="/profile">
          <Avatar
            style={{
              backgroundColor: `${avaColor}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 80,
            }}
          >
            {userName}
          </Avatar>
        </Link>
      </div>
      <Menu
        className="side-bar-menu"
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
