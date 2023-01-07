import React from 'react';
import { Form, Input, Typography, Button, message } from 'antd';
import teamImg from '../../resources/img/logBG.png';
import './login.css';

const Login = () => {
  const login = () => {
    message.success('Login Succcesful!');
  };

  return (
    <div className="body">
      <div className="logBG container ">
        <div className="row g-0">
          <div className="leftSide col-lg-5">
            <Form className="loginForm" onFinish={login}>
              <Typography.Title className="logTitle">
                InControll
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter valid email',
                  },
                ]}
                label="Email"
                name={'myEmail'}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter valid password',
                  },
                ]}
                label="Password"
                name={'myPassword'}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log In
              </Button>
            </Form>
          </div>
          <div className="col-lg-7">
            <img className="img-fluid" src={teamImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
