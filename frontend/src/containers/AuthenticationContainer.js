import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { getSocket } from '../session';

import { Grid, Row, Col } from 'react-flexbox-grid';
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
import Loader from '../components/Loader';
import QRReader from '../components/QRReader';
import QRCode from '../components/QRCode';

const CodeLabel = props => (
  <span
    style={{
      color: 'gray',
      fontFamily: 'monospace',
      fontSize: '50px'
    }}
    {...props}
  />
);
const CodeSeparator = props => (
  <span
    style={{
      color: '#dedede',
      pointerEvents: 'none',
      userSelect: 'none'
    }}
    {...props}
  />
);

function sanatizeCodeField(input) {
  return input.replace(/-/g, '');
}

class AuthenticationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeField: ''
    };
    this.updateCodeField = this.updateCodeField.bind(this);
    this.onCodeSubmit = this.onCodeSubmit.bind(this);
  }

  updateCodeField(e) {
    const newValue = sanatizeCodeField(e.target.value);
    this.setState({
      codeField: newValue
    });
  }

  onCodeSubmit() {
    getSocket().emit('session-request', {
      shortKey: sanatizeCodeField(this.state.codeField)
    });
  }

  requestSession(key) {
    getSocket().emit('session-request', {
      key
    });
  }

  render({ connectionKey, connectionShortKey }, state) {
    const shortKey = connectionShortKey || '000000';
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={4} md={4}>
              {connectionKey
                ? <QRCode
                    connectionKey={connectionKey}
                    style={{ width: '100%' }}
                  />
                : <Loader loading label={'Fetching key...'} />}
            </Col>
            <Col xs={12} sm={8} md={4}>
              <h2>How it works</h2>
              <ol>
                <li>Open this page on your device</li>
                <li>Scan this QR Code or enter the following code</li>
              </ol><br />
              <center>
                <QRReader onDecode={this.requestSession} /><br />
                {!connectionShortKey
                  ? <CodeLabel>
                      LOA<CodeSeparator>D</CodeSeparator>ING
                    </CodeLabel>
                  : <CodeLabel>
                      {shortKey.substr(0, 3)}
                      <CodeSeparator>-</CodeSeparator>
                      {shortKey.substr(3, 3)}
                    </CodeLabel>}
              </center>
            </Col>
            <Col xs={12} md={4} style="margin-top: 30px">
              <Card>
                <CardHeader title="Or enter your code here" />
                <CardActions>
                  <TextField
                    value={state.codeField}
                    onChange={this.updateCodeField}
                    hintText="Enter your code here"
                  />
                  <br />
                  <RaisedButton
                    primary
                    label="Connect"
                    onClick={this.onCodeSubmit}
                    style="float: right"
                  />
                </CardActions>
              </Card>
            </Col>
          </Row>

        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  connectionKey: state.connection.key,
  connectionShortKey: state.connection.shortKey
});

export default connect(mapStateToProps)(AuthenticationContainer);
