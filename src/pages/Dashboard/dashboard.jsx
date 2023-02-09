import './dashboard.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import titlePNG from '../../resources/img/titlePNG.png';
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
      <Layout>
        <Content className="site-layout-background">
          <div className="main-title">
            <div>
              <h2>Welcome back, {username}</h2>
            </div>

            <div className="d-flex justify-content-center">
              <img className="titlePNG " src={titlePNG} alt="titlePNG" />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainTitle;
