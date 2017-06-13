import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import sanatizeShortCode from '../helpers/sanatize-short-code';
import {
  getSocket,
  requestSession,
  requestSessionWithShortKey
} from '../session';

import { css } from 'glamor';

import { Container, Row, Col } from 'react-grid-system';
import CodeFormBox from '../components/code-form-box';
import ShortKeyLabel from '../components/short-key-label';
import ConnectionQRCode from '../components/connection-qr-code';
import HighlightBox from '../components/highlight-box';
import Tutorial from '../components/tutorial';

class AuthenticationContainer extends Component {
  onCodeSubmit = code => requestSessionWithShortKey(sanatizeShortCode(code));

  render({ connectionKey, connectionShortKey }, state) {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={6}>
            <ConnectionQRCode connectionKey={connectionKey} />
          </Col>
          <Col xs={12} sm={6}>
            <Tutorial />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <HighlightBox heading="Your Code">
              <ShortKeyLabel shortKey={connectionShortKey} />
            </HighlightBox>
          </Col>
          <Col xs={12} sm={6}>
            <HighlightBox heading="Enter a Code">
              <CodeFormBox onCodeSubmit={this.onCodeSubmit} />
            </HighlightBox>
            {/* <center>
              <QRReader onDecode={requestSession} /><br />

            </center> */}
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
