import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Popconfirm,
  Button,
  Space,
  Form,
  Input,
  Select,
  Tag,
  Modal,
  notification,
} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { Layout } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

function CompEquip() {
  const [username, setUsername] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editRowKey, setEditRowKey] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchRole = useCallback(async () => {
    try {
      const res = await axios.get('https://autovaq.herokuapp.com/view-role/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUsername(res.data.role);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchRole(token);
  }, [token, fetchRole, username]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    axios
      .get('https://autovaq.herokuapp.com/api/computer/', {
        headers: {
          Authorization: `Token ${token}`,
        },
        mode: 'no-cors',
      })
      .then(res => {
        setDataSource(res.data.sort((a, b) => a.id - b.id));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchRole().then(() => {
      setDataFetched(true);
    });
  }, [fetchRole]);

  const handleDelete = value => {
    const token = localStorage.getItem('token');
    axios
      .delete(`https://autovaq.herokuapp.com/api/computer/${value.id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => {
        let newContact = [...dataSource].filter(item => item.id !== value.id);
        setDataSource(newContact);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleView = record => {
    Modal.info({
      title: 'View Row Data',
      content: (
        <div>
          {Object.keys(record).map(key =>
            record[key] ? (
              <p key={key}>
                {key}: {record[key]}
              </p>
            ) : (
              <p key={key}>{key}: None</p>
            )
          )}
        </div>
      ),
      onOk() {},
    });
  };

  const isEditing = record => {
    return record.id === editRowKey;
  };

  const cancel = () => {
    setEditRowKey('');
  };

  const save = async id => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const token = localStorage.getItem('token');
        axios
          .put(
            `https://autovaq.herokuapp.com/api/computer/${item.id}/`,
            {
              ...row,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          )
          .then(res => {
            newData.splice(index, 1, { ...item, ...row });
            setDataSource(newData);
            setEditRowKey('');
            notification.success({
              message: 'Changes saved successfully',
            });
          })
          .catch(err => {
            notification.error({
              message: 'Changes were not saved',
              description: 'Please try again later',
            });
          });
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const edit = record => {
    form.setFieldsValue({
      ...record,
    });
    setEditRowKey(record.id);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Employee',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Equipment name',
      dataIndex: 'device_name',
      key: 'device_name',
    },
    {
      title: 'Arrival date',
      dataIndex: 'arrival_date',
      key: 'arrival_date',
    },
    {
      title: 'Date of deletion',
      dataIndex: 'deletion_date',
      key: 'deletion_date',
    },
    {
      title: 'Note',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Status',
      dataIndex: 'condition',
      key: 'condition',
      align: 'center',
      render: (text, record) => {
        const editable = isEditing(record);
        let tagColor = '';
        switch (text) {
          case 'Снято с учета':
            tagColor = 'blue';
            break;
          case 'Свободное':
            tagColor = 'orange';
            break;
          case 'На рабочем месте':
            tagColor = 'green';
            break;
          case 'В ремонте':
            tagColor = 'purple';
            break;
          default:
            tagColor = 'gray';
        }
        return editable ? (
          <Form.Item
            name="condition"
            style={{ margin: 0 }}
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="Снято с учета">Снято с учета</Select.Option>
              <Select.Option value="Свободное">Свободное</Select.Option>
              <Select.Option value="На рабочем месте">
                На рабочем месте
              </Select.Option>
              <Select.Option value="В ремонте">В ремонте</Select.Option>
            </Select>
          </Form.Item>
        ) : (
          <Tag color={tagColor}>
            {text.includes('Снято с учета')
              ? 'Снято с учета'
              : text.includes('Свободное')
              ? 'Свободное'
              : text.includes('На рабочем месте')
              ? 'На рабочем месте'
              : text.includes('В ремонте')
              ? 'В ремонте'
              : ''}
          </Tag>
        );
      },
      editable: true, // set editable to true for the status column
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: '10',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        const isEmployee = username === 'Employee';

        return dataSource.length >= 1 ? (
          <Space key={record.id}>
            {dataFetched ? (
              <>
                <Button
                  type="primary"
                  disabled={editable}
                  onClick={() => handleView(record)}
                  style={{ maxWidth: '50px' }}
                >
                  <EyeOutlined className="d-flex align-content-center" />
                </Button>
                {!isEmployee && (
                  <>
                    <Popconfirm
                      title="Are you sure want to delete?"
                      onConfirm={() => handleDelete(record)}
                    >
                      <Button danger type="primary" disabled={editable}>
                        <DeleteOutlined className="d-flex align-content-center" />
                      </Button>
                    </Popconfirm>
                    {editable ? (
                      <span>
                        <Space size="middle">
                          <Button onClick={e => save(record.id)} type="primary">
                            Save
                          </Button>
                          <Popconfirm
                            title="Are you to cancel?"
                            onConfirm={cancel}
                          >
                            <Button>Cancel</Button>
                          </Popconfirm>
                        </Space>
                      </span>
                    ) : (
                      <Button
                        onClick={() => edit(record)}
                        type="primary"
                        style={{ background: '#5ccf51', maxWidth: '50px' }}
                      >
                        <EditOutlined className="d-flex align-content-center" />
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : (
              <Button
                type="primary"
                style={{ background: '#808080', maxWidth: '50px' }}
              >
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
              </Button> // replace this with your loader component
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editTable) {
      //not editble
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <Layout>
      <Layout>
        <Content className="site-layout-background">
          <div>
            <Space
              className="d-flex justify-content-between"
              style={{ marginBottom: 20 }}
            >
              <h1 style={{ marginLeft: 20, marginTop: 30 }}>
                Computer equipment
              </h1>
              <Space>
                <Button
                  style={{
                    marginTop: 15,
                    backgroundColor: '#00B0FF',
                    color: '#fff',
                    width: 150,
                    height: 40,
                    borderRadius: 5,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  onClick={() => navigate('/add_comp_eq')}
                >
                  Add New
                </Button>
                <Button
                  style={{
                    marginTop: 15,
                    marginLeft: 10,
                    marginRight: 30,
                    backgroundColor: '#00B0FF',
                    color: '#fff',
                    width: 150,
                    height: 40,
                    borderRadius: 5,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <CSVLink data={dataSource}>Export</CSVLink>
                </Button>
              </Space>
            </Space>

            <Space
              className="d-flex justify-content-center"
              style={{ marginTop: 20, marginBottom: 20, marginLeft: 10 }}
            ></Space>
            <Form form={form} component={false}>
              {loading ? (
                <Spinner />
              ) : (
                <Table
                  loading={loading}
                  dataSource={dataSource}
                  columns={mergedColumns}
                  bordered
                  responsive
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                />
              )}
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default CompEquip;
