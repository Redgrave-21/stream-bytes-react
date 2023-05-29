import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import navStyles from '../../styles/navbar.module.css'
import formStyles from '../../styles/forms.module.css';
import SideBar from '../SideBar/SideBar';
import { BiMenu } from 'react-icons/bi';

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <SideBar/>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll">
          <BiMenu/>
        </Navbar.Toggle>
        <Navbar.Collapse id={navStyles.navbarScroll}>
          <Form className={formStyles.searchForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
