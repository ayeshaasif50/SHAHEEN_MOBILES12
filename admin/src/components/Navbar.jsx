import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">
          <img src="/logo3.png" alt="Shaheen Mobiles Logo" />
        </div>

        <div className="brand-text">
          <h1>Shaheen Mobiles</h1>
          <span>Admin Panel</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="live-badge">
          <span className="live-dot"></span>
          Live
        </div>

        <div className="avatar">A</div>
      </div>
    </nav>
  );
};

export default Navbar;