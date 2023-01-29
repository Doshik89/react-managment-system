import './side-menu.css';
import { Menu, Layout } from 'antd'; // or 'antd/dist/antd.less'
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  DesktopOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
  FormOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <Sider width={290} style={{ marginRight: 1 }}>
      <Menu
        className="sidebarMenu"
        mode="inline"
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={[window.location.pathname]}
        style={{
          height: '100%',
          borderRight: 0,
          background: '#00a1dc',
        }}
        items={[
          { label: 'Главная', key: '/', icon: <HomeOutlined /> },
          {
            label: 'Заявки на ремонт',
            key: '/repair_app',
            icon: <FormOutlined />,
          },
          {
            label: 'Компьютерная техника',
            key: '/computer_equip',
            icon: <DesktopOutlined />,
          },
          {
            label: 'Оборудование на рабочем месте',
            key: '/workplace_equip',
            icon: <LaptopOutlined />,
          },
          { label: 'Сотрудники', key: '/employees', icon: <TeamOutlined /> },
          { label: 'Должности', key: '/positions', icon: <UserOutlined /> },
          {
            label: 'Регистрация сотрудника',
            key: '/register',
            icon: <UserAddOutlined />,
          },
        ]}
      />
    </Sider>
  );
};

export default SideMenu;
