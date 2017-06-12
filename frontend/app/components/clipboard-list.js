import { h } from 'preact';

import { Container, Row, Col } from 'react-grid-system';
import ClipboardCard from './clipboard-card';

const ClipboardList = ({ clipboards, ownClientId }) => (
  <Container>
    {clipboards.map(message => (
      <Row>
        {ownClientId === message.clientId ? <Col xs={1} sm={6} md={8} /> : null}
        <Col xs={11} sm={6} md={4} style="margin: 20px 0px;">
          <ClipboardCard clipboard={message.clipboard} />
        </Col>
        {ownClientId !== message.clientId ? <Col xs={1} sm={6} md={8} /> : null}
      </Row>
    ))}
  </Container>
);

export default ClipboardList;
