import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar
				bg="primary"
				variant="dark"
				expand="lg"
				collapseOnSelect
				className="custom-navbar"
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<Image
								src={'/images/logo.png'}
								fluid
								alt="logo"
								className="d-inline-block align-top navbar-logo"
							/>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/eyeglasses">
								<Nav.Link>Eyeglasses</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/sunglasses">
								<Nav.Link>Sunglasses</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i>Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user"></i>Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
