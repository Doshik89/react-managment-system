import './side-menu.css';
import { Menu, Layout } from 'antd'; // or 'antd/dist/antd.less'
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  DesktopOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
  MenuOutlined,
  FormOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  BlockOutlined,
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
            label: 'Оборудование в ремонте',
            key: '/repair_equip',
            icon: <DatabaseOutlined />,
          },
          {
            label: 'Каталог названий оборудования',
            key: '/catalog_equip',
            icon: <ContainerOutlined />,
          },
          {
            label: 'Компьютерная техника',
            key: '/comp_equip',
            icon: <DesktopOutlined />,
          },
          { label: 'Оборудование на рабочем месте', icon: <LaptopOutlined /> },
          { label: 'Элементы компьтерной техники', icon: <BlockOutlined /> },
          { label: 'Каталог рабочих мест', icon: <MenuOutlined /> },
          { label: 'Сотрудники', icon: <TeamOutlined /> },
          { label: 'Должности', icon: <UserOutlined /> },
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
