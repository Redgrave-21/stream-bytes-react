import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import navStyles from '../../styles/navbar.module.css'
import formStyles from '../../styles/form.module.css';
import SideBar from '../SideBar/SideBar';
import { BiMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <SideBar />
        {/* <a href="/library">Library</a> */}
        <Navbar.Brand><Link to="/">Stream Bytes</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll">
          <BiMenu />
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
