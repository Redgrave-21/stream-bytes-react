import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CgMenu } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const navigate = useNavigate();
  function gotoLibrary() {
    console.log("goto library clicked from sidebar");
    // navigate('/library');
  }

  return (
    <div>
      <CgMenu onClick={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {/* <li onClick={gotoLibrary}> Library</li> */}
            <li><a href='/library'> Library</a></li>
          </ul>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
