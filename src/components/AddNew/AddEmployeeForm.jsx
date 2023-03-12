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

function AddEmployeeForm() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [positions, setPositions] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchPositions = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://autovaq.herokuapp.com/api/position/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setPositions(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const fetchWorkplaces = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://autovaq.herokuapp.com/api/job_catalogue/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setWorkplaces(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  useEffect(() => {
    fetchWorkplaces();
  }, [fetchWorkplaces]);

  const onFinish = useCallback(
    async values => {
      const requiredFields = [
        'position',
        'name',
        'surname',
        'lastname',
        'workplace',
      ];
      try {
        for (const field of requiredFields) {
          if (!values[field] || values[field].trim().length === 0) {
            notification.error({
              message: 'Fields cannot be empty or contain only spaces',
              description: `Enter proper details in "${field}" field`,
            });
            return;
          }
        }
        const token = localStorage.getItem('token');
        const res = await axios.post(
          'https://autovaq.herokuapp.com/api/employee/',
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
          description: 'Employee added successfully.',
        });
        navigate('/employees');
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
          <Typography.Title className="logTitle">Сотрудники</Typography.Title>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="position"
            label="Должность"
          >
            <Select className="inputField">
              {positions.map(position => (
                <Select.Option key={position.id} value={position.pos}>
                  {position.pos}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="name"
            label="Имя"
          >
            <Input className="inputField" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="surname"
            label="Фамилия"
          >
            <Input className="inputField" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="lastname"
            label="Отчество"
          >
            <Input className="inputField" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="formLabel"
            name="workplace"
            label="Место работы"
          >
            <Select className="inputField">
              {workplaces.map(workplaces => (
                <Select.Option
                  key={workplaces.id}
                  value={workplaces.workplace_name}
                >
                  {workplaces.workplace_name}
                </Select.Option>
              ))}
            </Select>
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

export default AddEmployeeForm;
