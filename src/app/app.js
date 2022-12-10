import './app.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from '../components/navbar/navbar';
import SideMenu from '../components/side-menu/side-menu';
import MainTitle from '../components/main-title/main-title';
import Register from '../components/register/register';
import RepairEquip from '../pages/repairEquip';
import RepairApplication from '../pages/repairApplication';
const { Content } = Layout;

function App() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />
			<Layout>
				<SideMenu />
				<Layout>
					<Content className="site-layout-background">
						<ContentRoute />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

function ContentRoute() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<MainTitle />}></Route>
				<Route path="/home" element={<MainTitle />}></Route>
				<Route path="/repair_app" element={<RepairEquip />}></Route>
				<Route path="/repair_equip" element={<RepairApplication />}></Route>
				<Route path="/register" element={<Register />}></Route>
			</Routes>
		</div>
	);
}

export default App;
