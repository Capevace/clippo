import { h } from 'preact';

import { Row, Col } from 'react-grid-system';
import ClipboardCard from './clipboard-card';

const ClipboardList = ({ clipboards, ownClientId }) => (
  <section>
    {clipboards.map((message, index) => (
      <Row key={message.id}>
        {ownClientId === message.clientId ? <Col xs={1} sm={6} md={8} /> : null}
        <Col xs={11} sm={6} md={4} style="margin: 20px 0px;">
          <ClipboardCard clipboard={message.clipboard} />
        </Col>
        {ownClientId !== message.clientId ? <Col xs={1} sm={6} md={8} /> : null}
      </Row>
    ))}
  </section>
);

export default ClipboardList;
