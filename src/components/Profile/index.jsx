import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Form,
  Input,
  Button,
  message,
  Skeleton,
  Select,
  Space,
} from 'antd';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import './profile.css';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://autovaq.herokuapp.com/profile/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        setUser(response.data[0].fields);
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed to fetch user data');
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    const avatarColor = form.getFieldValue('avatarColor');
    setUser(prevUser => ({ ...prevUser, avatarColor }));
  }, [form]);

  const onFinish = values => {
    setLoading(true);
    axios
      .put('https://autovaq.herokuapp.com/profile/', values, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        setUser(response.data[0].fields);
        message.success('User data saved successfully');
        setLoading(false);
        setEditMode(false);
      })
      .catch(error => {
        message.error('Failed to save user data');
        setLoading(false);
      });
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.setFieldsValue(user);
    }
  };

  const colorOptions = {
    '#000000': 'Dark',
    '#4682B4': 'Steel Blue',
    '#333333': 'Dark Grey',
    '#006400': 'Dark Green',
    '#8B0000': 'Dark Red',
    '#2F4F4F': 'Slate Grey',
    '#36454F': 'Charcoal',
    // add more colors here
  };

  const getColorName = hexCode => colorOptions[hexCode] || hexCode;

  return (
    <div>
      <h1 className="title-shadow">My Profile</h1>
      {loading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={user}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="shadow-bg-sec" style={{ position: 'relative' }}>
              <Space>
                <div className="profile-avatar">
                  <Avatar
                    style={{
                      backgroundColor: editMode
                        ? form.getFieldValue('avatarColor')
                        : user.avatarColor || '#4682B4',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    size={128}
                  >
                    {user.name}
                  </Avatar>
                </div>

                <div className="fullname">
                  <Form.Item
                    label=""
                    name="name"
                    style={{ marginRight: '5px', fontSize: '17px' }}
                  >
                    {editMode ? (
                      <Input placeholder="Enter your name" />
                    ) : (
                      <span>{user.name || 'N/A'}</span>
                    )}
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="surname"
                    style={{ marginRight: '5px', fontSize: '17px' }}
                  >
                    {editMode ? (
                      <Input placeholder="Enter your surname" />
                    ) : (
                      <span>{user.surname || 'N/A'}</span>
                    )}
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="lastname"
                    style={{ fontSize: '17px' }}
                  >
                    {editMode ? (
                      <Input placeholder="Enter your lastname" />
                    ) : (
                      <span>{user.lastname || 'N/A'}</span>
                    )}
                  </Form.Item>
                  <div className="edit-button">
                    <Form.Item>
                      {!editMode ? (
                        <Button
                          type="primary"
                          icon={
                            <EditOutlined className="d-flex align-content-center" />
                          }
                          style={{ width: 45, height: 40 }}
                          onClick={handleEditMode}
                        />
                      ) : (
                        <div>
                          <Button
                            type="primary"
                            icon={
                              <CheckCircleOutlined className="d-flex align-content-center" />
                            }
                            style={{
                              width: 45,
                              height: 40,
                              marginRight: 16,
                              backgroundColor: '#52c41a',
                              borderColor: '#52c41a',
                            }}
                            htmlType="submit"
                            loading={loading}
                          />
                          <Button
                            type="primary"
                            icon={
                              <CloseCircleOutlined className="d-flex align-content-center" />
                            }
                            style={{
                              width: 45,
                              height: 40,
                              backgroundColor: '#f5222d',
                              borderColor: '#f5222d',
                            }}
                            onClick={handleEditMode}
                          />
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>
              </Space>
            </div>
            <Space className="shadow-bg-sec ">
              <Space.Compact direction="vertical">
                <Form.Item label="Position" name="position">
                  <span>{user.position || 'N/A'}</span>
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: false,
                      message: 'Please enter your phone number',
                    },
                    { whitespace: true },
                    {
                      pattern: /^\+\d{11}$/,
                      message:
                        'Please enter a valid phone number (e.g., +77474410000)',
                    },
                    { min: 11 },
                  ]}
                  hasFeedback
                >
                  {editMode ? (
                    <Input placeholder="Enter your phone" />
                  ) : (
                    <span>{user.phone || 'N/A'}</span>
                  )}
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: false,
                      message: 'Please enter your email',
                    },
                    {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                    { whitespace: true },
                    { min: 5 },
                  ]}
                  hasFeedback
                >
                  {editMode ? (
                    <Input placeholder="Enter your email" />
                  ) : (
                    <span>{user.email || 'N/A'}</span>
                  )}
                </Form.Item>
                <Form.Item label="Avatar Color" name="avatarColor">
                  {editMode ? (
                    <Select>
                      {Object.entries(colorOptions).map(([value, label]) => (
                        <Select.Option
                          key={value}
                          value={value}
                          children={label}
                        />
                      ))}
                    </Select>
                  ) : (
                    <span>{getColorName(user.avatarColor) || 'N/A'}</span>
                  )}
                </Form.Item>
              </Space.Compact>
            </Space>
          </div>
        </Form>
      )}
    </div>
  );
};

export default UserProfile;
