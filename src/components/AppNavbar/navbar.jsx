import './navbar.css';
import logo from '../../resources/img/logo.png';
import { Button, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 navbar-shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-1" href="/">
        <img className="logo" src={logo} alt="Logo" />
      </a>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap info-header d-flex align-items-center btn-outline">
          <Button
            className="nav-link px-3 btn"
            type="primary"
            style={{ background: 'white' }}
          >
            Log in
          </Button>
          <Button className="nav-link px-3 btn" danger>
            <Space>
              Log out <LogoutOutlined className="d-flex align-content-center" />
            </Space>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
