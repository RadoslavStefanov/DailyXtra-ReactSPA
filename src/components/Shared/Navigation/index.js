import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

import styles from './Navigation.module.css';

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><img src="/images/nav-logo.png" className={styles.navLogo}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="aboutus" className={styles.dxaNavLink}>About Us</NavLink>
            <NavLink to="subscribe" className={styles.dxaNavLink}>Subscribe</NavLink>
          </Nav>
          <Nav>
            <NavLink to="myprofile" className={styles.vertFix}>Profile</NavLink>
            <NavLink to="foryou" className={styles.accentNavBtn}>For YOU</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;