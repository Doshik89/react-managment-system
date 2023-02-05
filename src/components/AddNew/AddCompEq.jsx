import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Typography, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import './addNew.css';

const { useForm } = Form;

function AddCompEq() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [owner, setOwner] = useState([]);
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

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  const onFinish = useCallback(
    async values => {
      const requiredFields = [
        'device_name',
        'arrival_date',
        'deletion_date',
        'condition',
        'notes',
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
          'https://autovaq.herokuapp.com/api/computer/',
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
          description: 'Computer equipment added successfully.',
        });
        navigate('/computer_equip');
      } catch (err) {
        console.log(err);
        notification.error({
          message: 'Error',
          description: 'Failed to add computer equipment.',
        });
      }
    },
    [form, dataSource, navigate]
  );

  return (
    <div className="bodyAddNew">
      <Form className="FormAddNew" form={form} onFinish={onFinish}>
        <Typography.Title className="logTitle">
          Компьютерная техника
        </Typography.Title>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="owner"
          label="Владелец"
        >
          <Select className="inputField">
            {owner.map(owner => (
              <Select.Option key={owner.id} value={owner.id}>
                {owner.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="device_name"
          label="Название оборудование"
        >
          <Input className="inputField" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="arrival_date"
          label="Дата прибытия"
        >
          <Input placeholder="MM-DD-YYYY" className="inputField" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="deletion_date"
          label="Дата удаления"
        >
          <Input placeholder="MM-DD-YYYY" className="inputField" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="condition"
          label="Состояние"
        >
          <Select className="inputField">
            <Select.Option value="Свободное">Свободное</Select.Option>
            <Select.Option value="На рабочем месте">
              На рабочем месте
            </Select.Option>
            <Select.Option value="В ремонте">В ремонте</Select.Option>
            <Select.Option value="Снято с учета">Снято с учета</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="formLabel"
          name="notes"
          label="Заметки"
        >
          <Input className="inputFieldNote" />
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

export default AddCompEq;
