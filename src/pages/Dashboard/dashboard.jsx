import './dashboard.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import titlePNG from '../../resources/img/titlePNG.png';
import Navbar from '../../components/AppNavbar/navbar';
import SideMenu from '../../components/SideMenu/side-menu';
import { Layout } from 'antd';

const { Content } = Layout;

const MainTitle = () => {
  const [username, setUsername] = useState('');

  const token = localStorage.getItem('token');

  const fetchPositions = useCallback(async () => {
    try {
      const res = await axios.get('https://autovaq.herokuapp.com/api/login/', {
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
    fetchPositions();
  }, [fetchPositions]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <SideMenu />
        <Layout>
          <Content className="site-layout-background">
            <div className="main-title">
              <div>
                <h2>Добро пожаловать, {username}</h2>
              </div>

              <div className="d-flex justify-content-center">
                <img className="titlePNG " src={titlePNG} alt="titlePNG" />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainTitle;
