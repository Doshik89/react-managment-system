import './main-title.css';
import titlePNG from '../../resources/img/titlePNG.png';

const MainTitle = () => {
  return (
    <div className="main-title">
      <div>
        <h2>Добро пожаловать, USER</h2>
      </div>

      <div className="d-flex justify-content-center">
        <img className="titlePNG " src={titlePNG} alt="titlePNG" />
      </div>
    </div>
  );
};

export default MainTitle;
