import './side-menu.css';
import { Menu, Layout } from 'antd'; // or 'antd/dist/antd.less'
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;

const SideMenu = () => {
	const navigate = useNavigate();
	return (
		<Sider width={280}>
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
					{ label: 'Главная', key: '/' },
					{ label: 'Заявки на ремонт', key: '/repair_app' },
					{ label: 'Оборудование в ремонте', key: '/repair_equip' },
					{ label: 'Каталог названий оборудования' },
					{ label: 'Компьютерная техника' },
					{ label: 'Оборудование на рабочем месте' },
					{ label: 'Элементы компьтерной техники' },
					{ label: 'Каталог рабочих мест' },
					{ label: 'Сотрудники' },
					{ label: 'Должности' },
					{ label: 'Регистрация сотрудника', key: '/register' },
				]}
			/>
		</Sider>
	);
};

export default SideMenu;
