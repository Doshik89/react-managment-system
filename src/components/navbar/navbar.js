import './navbar.css';
import logo from '../../resources/img/logo.png';
import { Button, Modal, Form, Input, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 navbar-shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-1" href="/">
        <img className="logo" src={logo} alt="Logo" />
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-nav ">
        <div className="nav-item text-nowrap info-header d-flex align-items-center btn-outline">
          <Button
            className="nav-link px-3 btn"
            type="primary"
            style={{ background: 'white' }}
            onClick={showModal}
          >
            Log in
          </Button>
          <Modal
            title="Log In"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form
              autoComplete="off"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={values => {
                console.log({ values });
              }}
              onFinishFailed={error => {
                console.log({ error });
              }}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите email',
                  },
                  {
                    type: 'email',
                    message: 'Пожалуйста, введите email',
                  },
                ]}
                hasFeedback
                name="email"
                label="Email"
              >
                <Input placeholder="Введите email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Пароль"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите пароль',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Введите пароль" />
              </Form.Item>
            </Form>
          </Modal>

          <Button className="nav-link px-3 btn" danger>
            <Space>
              Log out <LogoutOutlined className="d-flex align-content-center" />
            </Space>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
