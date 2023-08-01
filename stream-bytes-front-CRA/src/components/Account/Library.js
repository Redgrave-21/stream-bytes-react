import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../../contexts/AuthContext';

import { getUserData } from '../../helpers/RequestHelper';

export default function Library() {
  const [isAuthenticated, setIsAuthenticated]  = useContext(AuthContext);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function getUserPageData() {
      const result = await getUserData();
      setResponse(result.playlist);
      console.log("Is authenticated", isAuthenticated);
    }

    getUserPageData();
  }, []); // Add isAuthenticated as a dependency

  return (
    <div>
      <div>
        <h5>Your Playlists</h5>
        <h6>playlist name</h6>
        <Row xs={1} md={2} lg={3} xl={3}>
          {response && response.length !== 0 ? (
            response.map((video) => (
              <Col>
                <Card>
                  <p>{video.title}</p>
                </Card>
              </Col>
            ))
          ) : (
            <p>You currently have no playlists created</p>
          )}
        </Row>
      </div>
    </div>
  );
}
