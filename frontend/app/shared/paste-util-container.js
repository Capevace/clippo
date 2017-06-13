import { h, Component } from 'preact';
import isMobile from 'is-mobile';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FileInput from './file-input';
import FileInputLabel from './file-input-label';
import HighlightBox from './highlight-box';

const PasteLabel = props => (
  <span
    style={{
      color: 'black',
      fontSize: '20px',
      fontWeight: 'bold'
    }}
    {...props}
  />
);

class PasteUtilContainer extends Component {
  state = {
    trickValue: ''
  };

  updateTrickValue = () => {
    this.setState({ trickValue: '' });
  };

  fileSelected = e => {
    const fileReader = new FileReader();
    fileReader.onload = e => this.passUpClipboard(e.target.result);
    fileReader.readAsDataURL(e.target.files[0]);
  };

  onPaste = e => {
    if (e.clipboardData.types.includes('Files')) {
      const reader = new FileReader();
      reader.onload = evt => this.passUpClipboard(evt.target.result);
      reader.readAsDataURL(e.clipboardData.files[0]);
    } else {
      this.passUpClipboard(e.clipboardData.getData('text/plain'));
    }
  };

  passUpClipboard = clipboard =>
    this.props.onPaste ? this.props.onPaste(clipboard) : null;

  componentWillMount() {
    document.addEventListener('paste', this.onPaste);
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.onPaste);
  }

  render(props, state) {
    return (
      <center style="margin-top: 40px; margin-bottom: 30px;">
        {isMobile()
          ? <TextField
              errorStyle={{}}
              hintText="Paste your text/image here"
              value={state.trickValue}
              onChange={this.updateTrickValue}
            />
          : <PasteLabel>Press CTRL+V or CMD+V</PasteLabel>}

        &nbsp;&nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;&nbsp;

        <FileInput
          type="file"
          name="paster"
          id="paster"
          onChange={this.fileSelected}
        />
        <FileInputLabel htmlFor="paster">
          Drop a file
        </FileInputLabel>
      </center>
    );
  }
}

export default PasteUtilContainer;
