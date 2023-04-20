import './app.css';
import React, { useEffect, useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainTitle from '../pages/Dashboard/dashboard';
import Register from '../pages/Register/register';
import RepairEquip from '../pages/repairEquip';
import CompEquip from '../pages/compEquip';
import Employees from '../pages/Employees';
import JobCatalog from '../pages/jobCatalog';
import Login from '../pages/LoginPage/login';
import AddCompEq from '../components/AddNew/AddCompEq';
import AddRepairEq from '../components/AddNew/AddRepairEq';
import SideMenu from '../components/SideMenu/side-menu';
import Navbar from '../components/AppNavbar/navbar';
import NotFound from '../components/NotFound/NotFound';
import Spinner from '../components/Spinner/Spinner';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (!token || token === 'undefined' || token === 'null') {
      navigate('/login');
      setIsLoading(false); // set loading state to false if on /login page
    } else if (currentPath === '/login') {
      navigate('/');
      setIsLoading(false); // set loading state to false if on /login page
    }
  }, [navigate]);

  const fetchRole = useCallback(async () => {
    try {
      const res = await axios.get('https://autovaq.herokuapp.com/view-role/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUsername(res.data.role);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchRole(token);
  }, [token, fetchRole, username]);

  return (
    <ContentRoute
      username={username}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}

function ContentRoute(props) {
  const location = useLocation();
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
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

        // Set allowed routes based on the user's role
        if (res.data.role === 'Employee' || res.data.role === 'SysAdmin') {
          setAllowedRoutes([
            '/',
            '/home',
            '/repair_app',
            '/computer_equip',
            '/add_comp_eq',
            '/add_rep_eq',
          ]);
        } else if (res.data.role === 'HR') {
          setAllowedRoutes(['/', '/home', '/register', '/job_catalogue']);
        } else if (res.data.role === 'Admin') {
          setAllowedRoutes([
            '/',
            '/home',
            '/repair_app',
            '/computer_equip',
            '/employees',
            '/job_catalogue',
            '/add_comp_eq',
            '/add_rep_eq',
            '/register',
          ]);
        }

        props.setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRole();
  }, [props]);

  if (props.isLoading) {
    return <Spinner />;
  } else {
    const isRouteAllowed = allowedRoutes.includes(location.pathname);

    if (isRouteAllowed) {
      return (
        <div className="app">
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
                  <Route path="/job_catalogue" element={<JobCatalog />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/add_comp_eq" element={<AddCompEq />}></Route>
                  <Route path="/add_rep_eq" element={<AddRepairEq />}></Route>
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
