import { h, Component } from 'preact';
import sanatizeShortCode from '../helpers/sanatize-short-code';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CodeFormBox extends Component {
  state = {
    codeFieldValue: ''
  };

  updateCodeField = e =>
    this.setState({ codeFieldValue: sanatizeShortCode(e.target.value) });

  render(props, state) {
    return (
      <Card>
        <CardHeader title="Or enter your code here" />
        <CardActions>
          <TextField
            errorStyle={{}}
            value={state.codeFieldValue}
            onChange={this.updateCodeField}
            hintText="Enter your code here"
          />
          <br />
          <RaisedButton
            primary
            label="Connect"
            onClick={() => props.onCodeSubmit(state.codeFieldValue)}
            style="float: right"
          />
        </CardActions>
      </Card>
    );
  }
}

export default CodeFormBox;
