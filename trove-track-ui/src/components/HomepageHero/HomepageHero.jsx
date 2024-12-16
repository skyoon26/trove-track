import './homepage-hero.css';

const HomepageHero = () => {
  return (
    <div className="p-5 homepage-hero-section">
      <div className="container homepage-hero-text">
        <h1 className="display-5 fw-bold">Welcome to TroveTrack.</h1>
        <h2></h2>
        <p className="col-md-8 fs-4 py-2">Manage your inventory with ease using our straightforward tool. Track stock levels, create new invoices, and stay on top of low stock items — all in one place. We will help you keep your inventory organized and your business running smoothly. Inventory management made easy!</p>
        <button className="btn-navyblue" type="button">
          <span>
            Sign In
          </span>
        </button>
      </div>
    </div>
  );
}

export default HomepageHero;