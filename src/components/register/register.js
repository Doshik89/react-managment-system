import './register.css';
import { Form, Button, Input, Select } from 'antd';

function Register() {
	return (
		<div className="container  d-flex justify-content-center vertical-center">
			<div className="form-shadow">
				<Form
					autoComplete="off"
					labelCol={{ span: 11 }}
					wrapperCol={{ span: 20 }}
					onFinish={(values) => {
						console.log({ values });
					}}
					onFinishFailed={(error) => {
						console.log({ error });
					}}
					style={{
						background: 'white',
						width: `100%`,
						padding: 60,
						borderRadius: `2%`,
					}}
				>
					<h1 className="d-flex justify-content-center">Create Account</h1>
					<Form.Item
						name="name"
						label="Имя сотрудника"
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите имя сотрудника',
							},
							{ whitespace: true },
							{ min: 3 },
						]}
						hasFeedback
					>
						<Input placeholder="Введите имя" />
					</Form.Item>
					<Form.Item
						name="lastName"
						label="Фамилия сотрудника"
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите фамилию сотрудника',
							},
							{ whitespace: true },
							{ min: 3 },
						]}
						hasFeedback
					>
						<Input placeholder="Введите фамилию" />
					</Form.Item>
					<Form.Item
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите email сотрудника',
							},
							{
								type: 'email',
								message: 'Пожалуйста, введите действительный email',
							},
						]}
						hasFeedback
						name="email"
						label="Email"
					>
						<Input placeholder="Введите email" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Пароль"
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите пароль сотрудника',
							},
							{ min: 6 },
							{
								validator: (_, value) =>
									value && value.includes('!')
										? Promise.resolve()
										: Promise.reject('Пароль не соответствует критериям'),
							},
						]}
						hasFeedback
					>
						<Input.Password placeholder="Введите пароль" />
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						label="Подтверждение пароля"
						dependencies={['password']}
						rules={[
							{
								required: true,
								message: 'Пожалуйста, повторно введите пароль сотрудника',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject('Пароли не совпадают');
								},
							}),
						]}
						hasFeedback
					>
						<Input.Password placeholder="Повторите пароль" />
					</Form.Item>

					<Form.Item name="gender" label="Пол" requiredMark="optional">
						<Select placeholder="Выберите пол">
							<Select.Option value="male">Мужчина</Select.Option>
							<Select.Option value="female">Женщина</Select.Option>
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
	);
}

export default Register;
