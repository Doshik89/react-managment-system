import './app.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainTitle from '../pages/Dashboard/dashboard';
import Register from '../pages/Register/register';
import RepairEquip from '../pages/repairEquip';
import CompEquip from '../pages/compEquip';
import Employees from '../pages/Employees';
import Positions from '../pages/Positions';
import WorkplaceEquip from '../pages/workplaceEquip';
import Login from '../pages/LoginPage/login';

function App() {
  return <ContentRoute />;
}

function ContentRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainTitle />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<MainTitle />}></Route>
        <Route path="/repair_app" element={<RepairEquip />}></Route>
        <Route path="/computer_equip" element={<CompEquip />}></Route>
        <Route path="/workplace_equip" element={<WorkplaceEquip />}></Route>
        <Route path="/employees" element={<Employees />}></Route>
        <Route path="/positions" element={<Positions />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
