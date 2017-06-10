import { h } from 'preact';

import { Grid, Row, Col } from 'react-flexbox-grid';
import ClipboardCard from './clipboard-card';

const ClipboardList = ({ clipboards, ownClientId }) => (
  <Grid fluid>
    {clipboards.map(message => (
      <Row>
        {ownClientId === message.clientId ? <Col xs={1} sm={6} md={8} /> : null}
        <Col xs={11} sm={6} md={4} style="margin: 20px 0px;">
          <ClipboardCard clipboard={message.clipboard} />
        </Col>
        {ownClientId !== message.clientId ? <Col xs={1} sm={6} md={8} /> : null}
      </Row>
    ))}
  </Grid>
);

export default ClipboardList;
