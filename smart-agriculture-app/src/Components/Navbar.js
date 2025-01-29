import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";

function NavigationBar(props) {
  return (
    <Navbar>
    <Container>
        <Navbar.Brand as={Link} to="/">Smart Agri</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/about">About</Nav.Link> 
          <Nav.Link as={Link} to="/">Home</Nav.Link> 
        </Nav>
      </Container>
  </Navbar>
  );
}

export default NavigationBar;