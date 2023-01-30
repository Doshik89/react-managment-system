import React, { useEffect, useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import teamImg from '../../resources/img/logBG.png';
import './login.css';

const API_AUTH_URL = 'https://autovaq.herokuapp.com/login/';

const login = async values => {
  try {
    const { data } = await axios.post(API_AUTH_URL, values);
    const { token } = data;
    console.log(data);
    return { success: true, token };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.response.data.message };
  }
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const [formError, setFormError] = useState(null);

  const handleSubmit = async values => {
    const { success, token, message } = await login(values);
    if (success) {
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      setFormError(message);
    }
  };

  return (
    <div className="body">
      <div className="logBG container ">
        <div className="row g-0">
          <div className="leftSide col-lg-5">
            <Form className="loginForm" onFinish={handleSubmit}>
              <Typography.Title className="logTitle">
                InControll
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    type: 'text',
                    message: 'Please enter valid username',
                  },
                ]}
                name="username"
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                ]}
                name="password"
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="logBtn"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ marginTop: '20px' }}
                >
                  Sign In
                </Button>
                <Typography.Text className="formError">
                  {formError}
                </Typography.Text>
              </Form.Item>
            </Form>
          </div>
          <div className="rightSide col-lg-7">
            <img className="img-fluid" src={teamImg} alt="team" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
