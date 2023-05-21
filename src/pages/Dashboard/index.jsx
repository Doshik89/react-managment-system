import './dashboard.css';
import { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Layout } from 'antd';
import mainPNG1 from '../../resources/img/mainPage/mainPNG1.png';
import mainPNG2 from '../../resources/img/mainPage/mainPNG2.png';
import mainPNG3 from '../../resources/img/mainPage/mainPNG3.png';
import mainPNG4 from '../../resources/img/mainPage/mainPNG4.png';
import mainPNG5 from '../../resources/img/mainPage/mainPNG5.png';

const { Content } = Layout;

const Dashboard = () => {
  const [username, setUsername] = useState('');

  const images = useMemo(
    () => [mainPNG1, mainPNG2, mainPNG3, mainPNG4, mainPNG5],
    []
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );

  const token = localStorage.getItem('token');

  const fetchUsername = useCallback(async () => {
    try {
      const res = await axios.get('https://autovaq.herokuapp.com/profile/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const fullName = `${res.data[0].fields.name} ${res.data[0].fields.surname}`;
      setUsername(fullName);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchUsername();
  }, [fetchUsername]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex(Math.floor(Math.random() * images.length));
    }, 3600000 + Math.floor(Math.random() * 3600000)); // Random interval between 1-2 hours
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <Layout>
      <Layout>
        <Content className="site-layout-background">
          <div className="welcome">
            <h1>Hello, {username}!</h1>
            <p>You have successfully logged in to your account.</p>
            <p>What would you like to do today?</p>
            <div
              className="mainPNG"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={images[selectedImageIndex]} alt="Hello" />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
