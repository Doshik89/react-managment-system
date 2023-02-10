import './app.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import MainTitle from '../pages/Dashboard/dashboard';
import Register from '../pages/Register/register';
import RepairEquip from '../pages/repairEquip';
import CompEquip from '../pages/compEquip';
import Employees from '../pages/Employees';
import Positions from '../pages/Positions';
import Login from '../pages/LoginPage/login';
import AddPositionForm from '../components/AddNew/AddPositionForm';
import AddEmployeeForm from '../components/AddNew/AddEmployeeForm';
import AddCompEq from '../components/AddNew/AddCompEq';
import AddRepairEq from '../components/AddNew/AddRepairEq';
import SideMenu from '../components/SideMenu/side-menu';
import Navbar from '../components/AppNavbar/navbar';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (!token || !localStorage) {
      navigate('/login');
    } else if (currentPath === '/login') {
      navigate('/');
    }
  }, [navigate]);

  return <ContentRoute />;
}

function ContentRoute() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/login' ? (
        <Layout>
          <Navbar />
          <Layout>
            <SideMenu />
            <Layout>
              <Routes>
                <Route path="/" element={<MainTitle />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/home" element={<MainTitle />}></Route>
                <Route path="/repair_app" element={<RepairEquip />}></Route>
                <Route path="/computer_equip" element={<CompEquip />}></Route>
                <Route path="/employees" element={<Employees />}></Route>
                <Route path="/positions" element={<Positions />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/add_pos" element={<AddPositionForm />}></Route>
                <Route path="/add_emp" element={<AddEmployeeForm />}></Route>
                <Route path="/add_comp_eq" element={<AddCompEq />}></Route>
                <Route path="/add_rep_eq" element={<AddRepairEq />}></Route>
              </Routes>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
