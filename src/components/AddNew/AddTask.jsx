import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Layout, Form, Input, Button, notification, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import './addNew.css';

const { useForm } = Form;

function AddTask() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [owner, setOwner] = useState([]);
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  //Fetching owner from employee API
  useEffect(() => {
    async function fetchOwners() {
      try {
        const res = await axios.get(
          'https://autovaq.herokuapp.com/api/employee/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setOwner(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOwners();
  }, [token]);

  //Fetching hr from hr API
  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await axios.get('https://autovaq.herokuapp.com/api/adm/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAdmin(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAdmin();
  }, [token]);

  //onFinish function that validates fields, makes a POST request to a API
  const onFinish = useCallback(
    async values => {
      const requiredFields = ['tsk_desc'];
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
          'https://autovaq.herokuapp.com/api/task/',
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
          description: 'Task added successfully.',
        });
        navigate('/tasks');
      } catch (err) {
        console.log(err);
        notification.error({
          message: 'Error',
          description: 'Failed to add employee.',
        });
      }
    },
    [form, dataSource, navigate]
  );

  return (
    <Layout style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div className="bodyAddNew">
        <Form className="FormAddNew" form={form} onFinish={onFinish}>
          <h1 className="logTitle">Employee Work Tasks</h1>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="emp_id"
            label="Employee"
          >
            <Select placeholder="Select Employee name" className="inputField">
              {owner.map(owner => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.surname} {owner.name} {owner.lastname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="hr_id"
            label="Admin"
          >
            <Select placeholder="Select Admin name" className="inputField">
              {admin.map(admin => (
                <Select.Option key={admin.id} value={admin.id}>
                  {admin.surname} {admin.name} {admin.lastname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="tsk_desc"
            label="Task"
          >
            <Input.TextArea
              placeholder="Enter a note"
              style={{ height: 50 }}
              className="inputField"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="tsk_status"
            initialValue="Невыполнено"
          >
            <Input type="hidden" />
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

export default AddTask;
