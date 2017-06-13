import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import sanatizeShortCode from '../../helpers/sanatize-short-code';
import {
  getSocket,
  requestSession,
  requestSessionWithShortKey
} from '../../session';

import { css } from 'glamor';

import { Row, Col } from 'react-grid-system';
import HighlightBox from '../../shared/highlight-box';
import Loader from '../../shared/Loader';
import AuthCodeForm from './components/AuthCodeForm';
import AuthCodeLabel from './components/AuthCodeLabel';
import AuthQRCode from './components/AuthQRCode';
import AuthTutorial from './components/AuthTutorial';

class AuthenticationContainer extends Component {
  onCodeSubmit = code => requestSessionWithShortKey(sanatizeShortCode(code));

  render({ connectionKey, connectionShortKey }, state) {
    return (
      <div>
        <Row>
          <Col xs={12} sm={6}>
            <AuthQRCode connectionKey={connectionKey} />
          </Col>
          <Col xs={12} sm={6}>
            <AuthTutorial />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <HighlightBox heading="Your Code">
              {connectionShortKey
                ? <AuthCodeLabel shortKey={connectionShortKey} />
                : <Loader
                    loading
                    color="#00e092"
                    width={40}
                    style="margin: 0;"
                  />}
            </HighlightBox>
          </Col>
          <Col xs={12} sm={6}>
            <HighlightBox heading="Enter a Code">
              <AuthCodeForm onCodeSubmit={this.onCodeSubmit} />
            </HighlightBox>
            {/* <center>
              <QRReader onDecode={requestSession} /><br />

            </center> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  connectionKey: state.connection.key,
  connectionShortKey: state.connection.shortKey
});

export default connect(mapStateToProps)(AuthenticationContainer);
