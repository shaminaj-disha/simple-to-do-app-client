import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Simple to-do App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            {
                                user && <>
                                    <NavDropdown title="Options" id="collasible-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="addTask">Add Task</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="deleteTasks">Delete Tasks</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="showTasks">Show All</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            {
                                user ?
                                    <Nav.Link onClick={handleSignOut}>Log out</Nav.Link>
                                    :
                                    <Nav.Link as={Link} to="login">Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;