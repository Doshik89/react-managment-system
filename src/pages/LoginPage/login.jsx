import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, Typography, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import teamImg from '../../resources/img/logBG.png';
import './login.css';

const API_AUTH_URL = 'https://autovaq.herokuapp.com/login/';

const Login = () => {
  const navigate = useNavigate();

  const [formError, setFormError] = useState(null);

  const login = useMemo(
    () => async values => {
      try {
        const { data } = await axios.post(API_AUTH_URL, values);
        const { token } = data;
        console.log(data);
        return { success: true, token };
      } catch (error) {
        console.log(error);
        return { success: false, message: error.response.data.message };
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async values => {
      const { token, message: errorMessage } = await login(values);
      if (token) {
        notification.success({
          message: 'Login successful',
          description: errorMessage,
        });
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        notification.error({
          message:
            'Authorization failed. Please enter correct username and password.',
          description: errorMessage,
        });

        setFormError(errorMessage);
      }
    },
    [login, navigate, setFormError]
  );

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
                    message: 'Please enter the username',
                  },
                  { whitespace: true },
                  { min: 3 },
                ]}
                hasFeedback
                name="username"
              >
                <Input
                  style={{
                    borderRadius: 5,
                    transition: 'all 0.2s ease-in-out',
                    '&:focus': {
                      borderColor: '#FFA100',
                      boxShadow: '0 0 10px #FFA100',
                    },
                  }}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                  { whitespace: true },
                  { min: 3 },
                ]}
                name="password"
              >
                <Input.Password
                  style={{
                    borderRadius: 5,
                    transition: 'all 0.2s ease-in-out',
                    '&:focus': {
                      borderColor: '#FFA100',
                      boxShadow: '0 0 10px #FFA100',
                    },
                  }}
                  placeholder="Password"
                  size="large"
                />
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
