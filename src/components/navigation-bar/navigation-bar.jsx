import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-bootstrap';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg='transparent' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          Cthulhuflix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link as={Link} to='/'>Register</Nav.Link>
                <Nav.Link as={Link} to='/signup'>Login</Nav.Link>              
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};