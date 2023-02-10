import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Typography, Select } from 'antd';
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
      const requiredFields = [
        'req_desc',
        'req_acc_date',
        'reg_date',
        'req_cmp_date',
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
          'https://autovaq.herokuapp.com/api/request/',
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
                {owner.surname} {owner.name}
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
          label="Состояние"
        >
          <Select className="inputField">
            <Select.Option value="Принято">Принято</Select.Option>
            <Select.Option value="В процессе">В процессе</Select.Option>
            <Select.Option value="Выполнено">Выполнено</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="reg_date"
          label="Дата регистрации"
        >
          <Input placeholder="YYYY-MM-DD" className="inputField" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="req_acc_date"
          label="Дата принятия"
        >
          <Input placeholder="YYYY-MM-DD" className="inputField" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="req_cmp_date"
          label="Дата выполнения"
        >
          <Input placeholder="YYYY-MM-DD" className="inputField" />
        </Form.Item>

        <Form.Item className="d-flex justify-content-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddRepairEq;
