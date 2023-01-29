import './dashboard.css';
import titlePNG from '../../resources/img/titlePNG.png';
import Navbar from '../../components/AppNavbar/navbar';
import SideMenu from '../../components/SideMenu/side-menu';
import { Layout } from 'antd';

const { Content } = Layout;

const MainTitle = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <SideMenu />
        <Layout>
          <Content className="site-layout-background">
            <div className="main-title">
              <div>
                <h2>Добро пожаловать, USER</h2>
              </div>

              <div className="d-flex justify-content-center">
                <img className="titlePNG " src={titlePNG} alt="titlePNG" />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainTitle;
