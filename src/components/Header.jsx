import { Link, useLocation,useNavigate } from "react-router-dom"
import '../styles/styles.css'; // Import the styles.css file
export default function Navbar({ isLoggedIn, isAdmin, handleLogout }) {
  const navigate = useNavigate();
  
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };
  
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        MyCourse
      </Link>
      <ul>
        <CustomLink to="/">Courses</CustomLink>
        {(isLoggedIn&&isAdmin) && <CustomLink to="/dashboard">Dashboard</CustomLink>}
        <CustomLink to="/contact">Contact</CustomLink>
        {!isLoggedIn && <CustomLink to="/login">Login</CustomLink>}
        {isLoggedIn && (
          <li className="logout-container">
            <button onClick={handleLogoutClick} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}