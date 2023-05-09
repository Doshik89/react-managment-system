import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Layout, Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import './addNew.css';

const { useForm } = Form;

function AddJob() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  //onFinish function that validates fields, makes a POST request to a API
  const onFinish = useCallback(
    async values => {
      const requiredFields = ['workplace_name', 'cabinet'];
      try {
        for (const field of requiredFields) {
          const value = values[field];
          if (typeof value !== 'string' || value.trim().length === 0) {
            notification.error({
              message: 'Fields cannot be empty or contain only spaces',
              description: `Enter proper details in "${field}" field`,
            });
            return;
          }
        }

        const data = {
          ...values,
        };

        const token = localStorage.getItem('token');
        const res = await axios.post(
          'https://autovaq.herokuapp.com/api/job_catalogue/',
          data,
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
          description: 'Job added successfully.',
        });
        navigate('/job_catalogue');
      } catch (err) {
        console.log(err);
        notification.error({
          message: 'Error',
          description: 'Failed to add job.',
        });
      }
    },
    [form, dataSource, navigate]
  );

  return (
    <Layout style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div className="bodyAddNew">
        <Form className="FormAddNew" form={form} onFinish={onFinish}>
          <h1 className="logTitle">Job Catalogue</h1>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="workplace_name"
            label="Workplace name"
          >
            <Input.TextArea
              placeholder="Enter workplace name"
              style={{ height: 50 }}
              className="inputField"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="cabinet"
            label="Cabinet/workshop"
          >
            <Input.TextArea
              placeholder="Enter cabinet 'Room - (1,2,3)'"
              style={{ height: 50 }}
              className="inputField"
            />
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

export default AddJob;
