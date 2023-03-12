import './register.css';
import { Form, Button, Input, Select, notification } from 'antd';
import { Layout } from 'antd';
import axios from 'axios';

const { Content } = Layout;

const onFinish = values => {
  axios
    .post('https://autovaq.herokuapp.com/register/', values)
    .then(res => {
      console.log(res);
      notification.success({
        message: 'Registration successful!',
        duration: 2,
      });
    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        console.error(err.response.data);
        notification.error({
          message: 'This username already exists',
          duration: 2,
        });
      } else {
        console.error(err);
        notification.error({
          message: 'An error occurred',
          duration: 2,
        });
      }
    });
};

function Register() {
  return (
    <Layout style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Layout>
        <Content className="site-layout-background">
          <div className="container  d-flex justify-content-center vertical-center">
            <div className="form-shadow">
              <Form
                autoComplete="off"
                labelCol={{ span: 11 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                onFinishFailed={error => {
                  console.log({ error });
                }}
                style={{
                  background: 'white',
                  width: `100%`,
                  padding: 60,
                  borderRadius: `2%`,
                }}
              >
                <h1 className="d-flex justify-content-center">
                  Create Account
                </h1>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "'Please enter the employee's username'",
                    },
                    { whitespace: true },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input
                    style={{
                      fontWeight: 'bold',
                      borderRadius: 5,
                      transition: 'all 0.2s ease-in-out',
                      '&:focus': {
                        borderColor: '#FFA100',
                        boxShadow: '0 0 10px #FFA100',
                      },
                    }}
                    placeholder="Enter a username"
                  />
                </Form.Item>
                <Form.Item
                  name="first_name"
                  label="Employee's name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the employee's name",
                    },
                    { whitespace: true },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input
                    style={{
                      fontWeight: 'bold',
                      borderRadius: 5,
                      transition: 'all 0.2s ease-in-out',
                      '&:focus': {
                        borderColor: '#FFA100',
                        boxShadow: '0 0 10px #FFA100',
                      },
                    }}
                    placeholder="Enter a name"
                  />
                </Form.Item>
                <Form.Item
                  name="last_name"
                  label="Employee's last name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the employee's last name",
                    },
                    { whitespace: true },
                    { min: 3 },
                  ]}
                  hasFeedback
                >
                  <Input
                    style={{
                      fontWeight: 'bold',
                      borderRadius: 5,
                      transition: 'all 0.2s ease-in-out',
                      '&:focus': {
                        borderColor: '#FFA100',
                        boxShadow: '0 0 10px #FFA100',
                      },
                    }}
                    placeholder="Enter your last name"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the employee's password",
                    },
                    { min: 6 },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    style={{
                      fontWeight: 'bold',
                      borderRadius: 5,
                      transition: 'all 0.2s ease-in-out',
                      '&:focus': {
                        borderColor: '#FFA100',
                        boxShadow: '0 0 10px #FFA100',
                      },
                    }}
                    placeholder="Enter the password"
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please select the gender',
                    },
                  ]}
                  name="gender"
                  label="Gender"
                >
                  <Select placeholder="Choose a gender">
                    <Select.Option value="M">Male</Select.Option>
                    <Select.Option value="F">Female</Select.Option>
                    <Select.Option value="O">Other</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please select the role',
                    },
                  ]}
                  name="role"
                  label="Role"
                >
                  <Select placeholder="Choose a role">
                    <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="Employee">Employee</Select.Option>
                    <Select.Option value="SysAdmin">SysAdmin</Select.Option>
                    <Select.Option value="HR">HR</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className="d-flex justify-content-center"
                  wrapperCol={{ span: 24 }}
                >
                  <Button
                    className="effect1"
                    type="primary"
                    htmlType="submit"
                    style={{
                      background: '#5ebbfd',
                      borderColor: '#5ebbfd',
                      color: 'white',
                      paddingRight: 80,
                      paddingLeft: 80,
                    }}
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Register;
