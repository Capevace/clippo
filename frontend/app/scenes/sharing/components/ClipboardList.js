import { h } from 'preact';

import { Row, Col } from 'react-grid-system';
import ClipboardCard from './ClipboardCard';

const ClipboardEntry = ({ isFromOwnClient, clipboard }) => (
  <Row>
    {isFromOwnClient ? <Col xs={1} sm={4} md={4} /> : null}
    <Col xs={11} sm={8} md={8} style="margin: 20px 0px;">
      <ClipboardCard clipboard={clipboard} />
    </Col>
    {isFromOwnClient ? <Col xs={1} sm={4} md={4} /> : null}
  </Row>
);

const ClipboardList = ({ clipboards, queue, ownClientId }) => (
  <section>
    {queue.map((queueItem, index) => (
      <ClipboardEntry key={queueItem.id} isFromOwnClient />
    ))}
    {clipboards.map((message, index) => (
      <ClipboardEntry
        key={message.id}
        isFromOwnClient={message.clientId === ownClientId}
        clipboard={message.clipboard}
      />
    ))}
  </section>
);

export default ClipboardList;
