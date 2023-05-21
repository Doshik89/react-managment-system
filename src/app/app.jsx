import './app.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainTitle from '../pages/Dashboard/';
import Register from '../pages/Register';
import RepairEquip from '../pages/RepairRequest';
import CompEquip from '../pages/ComputerEquipment';
import Employees from '../pages/Employees';
import JobCatalog from '../pages/JobCatalog';
import Login from '../pages/LoginPage';
import AddCompEq from '../components/AddNew/AddCompEq';
import AddRepairEq from '../components/AddNew/AddRepairEq';
import AddJob from '../components/AddNew/AddJob';
import SideMenu from '../components/SideMenu';
import Navbar from '../components/AppNavbar';
import Profile from '../components/Profile';
import PerformanceChart from '../pages/PerformanceChart';
import Tasks from '../pages/Tasks';
import NotFound from '../components/NotFound';
import Spinner from '../components/Loaders/Spinner';
import AddTask from '../components/AddNew/AddTask';

const API_URL = 'https://autovaq.herokuapp.com';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!token || token === 'undefined' || token === 'null') {
      navigate('/login');
      setIsLoading(false);
    } else if (currentPath === '/login') {
      navigate('/');
      setIsLoading(false);
    } else {
      const fetchRole = async () => {
        try {
          const res = await axios.get(`${API_URL}/view-role/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setUsername(res.data.role);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchRole();
    }
  }, [navigate, token]);

  return (
    <ContentRoute
      username={username}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}

function ContentRoute({ setIsLoading, isLoading }) {
  const location = useLocation();
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(`${API_URL}/view-role/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Set allowed routes based on the user's role
        switch (res.data.role) {
          case 'Employee':
            setAllowedRoutes([
              '/',
              '/home',
              '/profile',
              '/repair_app',
              '/computer_equip',
              '/tasks',
              '/add_task',
              '/add_comp_eq',
              '/add_rep_eq',
            ]);
            break;
          case 'SysAdmin':
            setAllowedRoutes([
              '/',
              '/home',
              '/profile',
              '/repair_app',
              '/computer_equip',
              '/performance_chart',
              '/add_comp_eq',
              '/add_rep_eq',
            ]);
            break;
          case 'HR':
            setAllowedRoutes([
              '/',
              '/home',
              '/profile',
              '/register',
              '/job_catalogue',
              '/add_job',
            ]);
            break;
          case 'Admin':
            setAllowedRoutes([
              '/',
              '/home',
              '/profile',
              '/repair_app',
              '/computer_equip',
              '/employees',
              '/job_catalogue',
              '/add_comp_eq',
              '/add_rep_eq',
              '/add_job',
              '/add_task',
              '/register',
              '/performance_chart',
              '/tasks',
            ]);
            break;
          default:
            setAllowedRoutes([]);
            break;
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRole();
  }, [setIsLoading, token]);

  if (isLoading) {
    return <Spinner />;
  } else {
    const isRouteAllowed = allowedRoutes.includes(location.pathname);

    if (isRouteAllowed) {
      return (
        <div className="app">
          <Layout>
            <Navbar />
            <Layout
              style={{
                minHeight: 'calc(100vh - 65px)',
              }}
            >
              <SideMenu />
              <Layout>
                <Routes>
                  <Route path="/" element={<MainTitle />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/home" element={<MainTitle />}></Route>
                  <Route path="/repair_app" element={<RepairEquip />}></Route>
                  <Route path="/computer_equip" element={<CompEquip />}></Route>
                  <Route path="/employees" element={<Employees />}></Route>
                  <Route path="/job_catalogue" element={<JobCatalog />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/add_comp_eq" element={<AddCompEq />}></Route>
                  <Route path="/add_rep_eq" element={<AddRepairEq />}></Route>
                  <Route path="/add_job" element={<AddJob />}></Route>
                  <Route path="/add_task" element={<AddTask />}></Route>
                  <Route
                    path="/performance_chart"
                    element={<PerformanceChart />}
                  ></Route>
                  <Route path="/tasks" element={<Tasks />}></Route>
                </Routes>
              </Layout>
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return (
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      );
    }
  }
}

export default App;
