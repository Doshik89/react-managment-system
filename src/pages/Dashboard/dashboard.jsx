import './dashboard.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'antd';

const { Content } = Layout;

const MainTitle = () => {
  const [username, setUsername] = useState('');

  const token = localStorage.getItem('token');

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
    fetchRole();
  }, [fetchRole]);

  return (
    <Layout>
      <Layout>
        <Content className="site-layout-background">
          <div className="welcome">
            <h1>Welcome back, {username}!</h1>
            <p>You have successfully logged in to your account.</p>
            <p>What would you like to do today?</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainTitle;
