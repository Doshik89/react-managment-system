import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Popconfirm,
  Button,
  Space,
  Form,
  Input,
  Tag,
  Select,
  Modal,
} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { Layout, notification } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

function RepairEquip() {
  const [username, setUsername] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSource, setDataSource] = useState([]);
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
    fetchRole().then(() => {
      setDataFetched(true);
    });
  }, [fetchRole]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    axios
      .get('https://autovaq.herokuapp.com/api/request/', {
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

  const handleDelete = value => {
    const token = localStorage.getItem('token');
    axios
      .delete(`https://autovaq.herokuapp.com/api/request/${value.id}/`, {
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
            `https://autovaq.herokuapp.com/api/request/${item.id}/`,
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
      emp_id: record.emp_id || '',
      sys_id: record.sys_id || '',
    });
    setEditRowKey(record.id);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: '1',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Employee ID',
      dataIndex: 'emp_id',
      editTable: false,
      key: '2',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Sys ID',
      dataIndex: 'sys_id',
      editTable: false,
      key: '3',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Equipment ID',
      dataIndex: 'computer',
      editTable: false,
      key: '4',
    },
    {
      title: 'Date of registration',
      dataIndex: 'reg_date',
      editTable: false,
      key: '5',
    },
    {
      title: 'Date of acceptance',
      dataIndex: 'req_acc_date',
      editTable: false,
      key: '6',
    },
    {
      title: 'Date of completion',
      dataIndex: 'req_cmp_date',
      editTable: false,
      key: '7',
    },
    {
      title: 'Note',
      dataIndex: 'req_desc',
      editTable: true,
      key: '8',
    },
    {
      title: 'Status',
      dataIndex: 'req_status',
      key: '9',
      align: 'center',
      render: (text, record) => {
        const editable = isEditing(record);
        let tagColor = '';
        switch (text) {
          case 'Принято':
            tagColor = 'blue';
            break;
          case 'В процессе':
            tagColor = 'orange';
            break;
          case 'Выполнено':
            tagColor = 'green';
            break;
          default:
            tagColor = 'gray';
        }
        return editable ? (
          <Form.Item
            name="req_status"
            style={{ margin: 0 }}
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="Принято">Принято</Select.Option>
              <Select.Option value="В процессе">В процессе</Select.Option>
              <Select.Option value="Выполнено">Выполнено</Select.Option>
            </Select>
          </Form.Item>
        ) : (
          <Tag color={tagColor}>
            {text.includes('Принято')
              ? 'Принято'
              : text.includes('В процессе')
              ? 'В процессе'
              : text.includes('Выполнено')
              ? 'Выполнено'
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
              <h1 style={{ marginLeft: 20, marginTop: 30 }}>Repair requests</h1>
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
                  onClick={() => navigate('/add_rep_eq')}
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

export default RepairEquip;
