import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Layout,
  Form,
  Input,
  Button,
  notification,
  Typography,
  Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import './addNew.css';

const { useForm } = Form;

function AddRepairEq() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [owner, setOwner] = useState([]);
  const [computer, setComputer] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchOwners = useCallback(async () => {
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
  }, [token]);

  const fetchComputer = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://autovaq.herokuapp.com/api/computer/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setComputer(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  useEffect(() => {
    fetchComputer();
  }, [fetchComputer]);

  const onFinish = useCallback(
    async values => {
      const requiredFields = ['req_desc'];
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
          'https://autovaq.herokuapp.com/api/request/',
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
          description: 'Employee added successfully.',
        });
        navigate('/repair_app');
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
          <Typography.Title className="logTitle">
            {' '}
            Заявки на ремонт
          </Typography.Title>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="emp_id"
            label="Сотрудник"
          >
            <Select className="inputField">
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
            name="computer"
            label="Оборудование"
          >
            <Select className="inputField">
              {computer.map(computer => (
                <Select.Option key={computer.id} value={computer.id}>
                  {computer.device_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="req_desc"
            label="Содержание"
          >
            <Input.TextArea style={{ height: 50 }} className="inputField" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="req_status"
            initialValue="Принято"
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

export default AddRepairEq;
