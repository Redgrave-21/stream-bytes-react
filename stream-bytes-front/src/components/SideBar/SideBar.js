import React from 'react';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CgMenu } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export default function SideBar() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const navigate = useNavigate();
  // function gotoLibrary() {
  //   console.log("goto library clicked from sidebar");
  //   // navigate('/library');
  // }

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
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Library">Library</Link></li>
            <li><Link to="/Account">Account</Link></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
