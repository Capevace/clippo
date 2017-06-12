import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import sanatizeShortCode from '../helpers/sanatize-short-code';
import {
  getSocket,
  requestSession,
  requestSessionWithShortKey
} from '../session';

import { Container, Row, Col } from 'react-grid-system';
import TextField from 'material-ui/TextField';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../components/loader';
import QRReader from '../components/qr-reader';
import QRCode from '../components/qr-code';
import CodeFormBox from '../components/code-form-box';
import ShortKeyLabel from '../components/short-key-label';
import ConnectionQRCode from '../components/connection-qr-code';

class AuthenticationContainer extends Component {
  onCodeSubmit = code => requestSessionWithShortKey(sanatizeShortCode(code));

  render({ connectionKey, connectionShortKey }, state) {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={4} md={4}>
            <ConnectionQRCode connectionKey={connectionKey} />
          </Col>
          <Col xs={12} sm={8} md={4}>
            <h2>How it works</h2>
            <ol>
              <li>Open this page on your device</li>
              <li>Scan this QR Code or enter the following code</li>
            </ol><br />
            <center>
              <QRReader onDecode={requestSession} /><br />
              <ShortKeyLabel shortKey={connectionShortKey} />
            </center>
          </Col>
          <Col xs={12} md={4} style={{ marginTop: '30px' }}>
            <CodeFormBox onCodeSubmit={this.onCodeSubmit} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  connectionKey: state.connection.key,
  connectionShortKey: state.connection.shortKey
});

export default connect(mapStateToProps)(AuthenticationContainer);
