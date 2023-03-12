import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import './addNew.css';

const { useForm } = Form;

function AddPositionForm() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const onFinish = useCallback(
    async values => {
      try {
        if (!values.pos || values.pos.trim().length === 0) {
          notification.error({
            message: 'Fields cannot be empty or contain only spaces',
            description: 'Enter proper details in all fields',
          });
          return;
        }
        const token = localStorage.getItem('token');
        const res = await axios.post(
          'https://autovaq.herokuapp.com/api/position/',
          values,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setDataSource([...dataSource, res.data]);
        form.resetFields();
        notification.success({
          message: 'Success',
          description: 'Position added successfully.',
        });
        navigate('/positions');
      } catch (err) {
        console.log(err);
        notification.error({
          message: 'Error',
          description: 'Failed to add position.',
        });
      }
    },
    [form, dataSource, navigate]
  );

  return (
    <Layout style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div className="bodyAddNew">
        <Form className="FormAddNew" form={form} onFinish={onFinish}>
          <Typography.Title className="logTitle">Должности</Typography.Title>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="pos"
            label="Position"
          >
            <Input className="inputField" />
          </Form.Item>
          <Form.Item className="d-flex justify-content-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default AddPositionForm;
