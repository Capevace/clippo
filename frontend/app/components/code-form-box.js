import { h, Component } from 'preact';
import sanatizeShortCode from '../helpers/sanatize-short-code';

import { css } from 'glamor';

import { Row, Col } from 'react-grid-system';

const inputStyle = css({
  height: '40px',
  border: 'none',
  borderRadius: '5px',
  textAlign: 'center',
  fontSize: '20px',
  width: '100%'
});

const buttonStyle = css({
  height: '40px',
  border: 'none',
  borderRadius: '5px',
  textAlign: 'center',
  fontSize: '17px',
  width: '100%',
  background: '#00FFA6',
  cursor: 'pointer',
  ':hover': {
    background: '#00e092'
  },
  ':active': {
    background: '#008254'
  }
});

class CodeFormBox extends Component {
  state = {
    codeFieldValue: ''
  };

  updateCodeField = e =>
    this.setState({ codeFieldValue: sanatizeShortCode(e.target.value) });

  render(props, state) {
    return (
      <Row>
        <Col xs={6}>
          <input
            {...inputStyle}
            value={state.codeFieldValue}
            onChange={this.updateCodeField}
            placeholder="xyz-xyz"
          />
        </Col>
        <Col xs={6}>
          <button
            {...buttonStyle}
            onClick={() => props.onCodeSubmit(state.codeFieldValue)}
          >
            Connect to Client
          </button>
        </Col>
      </Row>
    );
  }
}

export default CodeFormBox;
