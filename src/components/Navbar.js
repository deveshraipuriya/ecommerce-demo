import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function NavbarHeader() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">E - Commerce</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
        </Navbar>
    )
}
