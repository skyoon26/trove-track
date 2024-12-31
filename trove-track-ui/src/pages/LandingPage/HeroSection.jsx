import { Container, Row, Col } from 'react-bootstrap';
import './hero-section.css';
import chest from "../../assets/images/chest.png"

const HeroSection = () => {
  return (
    <div className="hero-section p-4">
      <div className="container d-flex flex-column flex-lg-row align-items-center">
        <div className="text-content">
          <h1 className="display-5 fw-bold">Welcome to TroveTrack.</h1>
          <p className="col-md-10 fs-4 py-2">Manage your inventory with ease using our straightforward tool. Track stock levels, create new invoices, and stay on top of low stock items — all in one place. We will help you keep your inventory organized and your business running smoothly. Inventory management made easy!</p>
          <button className="btn-navyblue" type="button">
            <span>
              Sign in
            </span>
          </button>
        </div>
        
        <div className="image-content">
          <img src={chest} alt="Treasure chest representing organized inventory with TroveTrack"/>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
