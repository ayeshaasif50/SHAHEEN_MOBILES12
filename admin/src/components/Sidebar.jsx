import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'

// IMPORT ICONS
import cartIcon from '../assets/cart.png'
import addIcon from '../assets/icons8-add-50.png'
import listIcon from '../assets/list_8952086.png'
import logoutIcon from '../assets/icons8-logout-50.png'

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken")
      navigate("/login")
    }
  }

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="admin-sidebar">
        <div className="sidebar-top">

          <p className="menu-section-label">Products</p>

          <NavLink
            to="/add"
            className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
          >
            <img src={addIcon} alt="add" className="menu-icon-img" />
            <span>Add Items</span>
          </NavLink>

          <NavLink
            to="/list"
            className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
          >
            <img src={listIcon} alt="list" className="menu-icon-img" />
            <span>List Items</span>
          </NavLink>

          <p className="menu-section-label">Sales</p>

          <NavLink
            to="/orders"
            className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
          >
            <img src={cartIcon} alt="orders" className="menu-icon-img" />
            <span>Orders</span>
          </NavLink>

        </div>

        <div className="sidebar-footer">
          <div className="footer-info">
            <div className="footer-avatar">A</div>
            <div className="footer-text">
              <p>Admin</p>
              <span>Shaheen Mobiles</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <img src={logoutIcon} alt="logout" className="menu-icon-img" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      {/* Sirf 480px se neeche show hoga (CSS se control) */}
      <nav className="mobile-bottom-nav">

        <NavLink
          to="/add"
          className={({ isActive }) => isActive ? 'mob-nav-item active' : 'mob-nav-item'}
        >
          <img src={addIcon} alt="add" className="mob-nav-icon" />
          <span>Add</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) => isActive ? 'mob-nav-item active' : 'mob-nav-item'}
        >
          <img src={listIcon} alt="list" className="mob-nav-icon" />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => isActive ? 'mob-nav-item active' : 'mob-nav-item'}
        >
          <img src={cartIcon} alt="orders" className="mob-nav-icon" />
          <span>Orders</span>
        </NavLink>

        <button className="mob-nav-item mob-logout-btn" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout" className="mob-nav-icon" />
          <span>Logout</span>
        </button>

      </nav>
    </>
  )
}

export default Sidebar
