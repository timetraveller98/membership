'use client';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

const NavbarData = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-body sticky-top" expanded={expanded}>
      <Container>
        <Link href="/" onClick={closeNavbar}>
          <Image src="/logo.png" className="m-0 p-2" width={260} height={65} alt="logo" />
        </Link>
        <Navbar.Toggle className="me-3 text-light" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="text-secondary d-flex align-items-center my-4">
            <Link href="/create" passHref legacyBehavior>
              <Nav.Link style={{ textDecoration: 'none' }} onClick={closeNavbar}>
                Add Customer
              </Nav.Link>
            </Link>
            {/* <Link href="/membership" passHref legacyBehavior>
              <Nav.Link style={{ textDecoration: 'none' }} onClick={closeNavbar}>
                Add Membership
              </Nav.Link>
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarData;
