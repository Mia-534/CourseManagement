
import "../styles/styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} MyCourse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
