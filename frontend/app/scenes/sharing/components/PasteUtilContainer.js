import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import isMobile from 'is-mobile';
import {
  ADDED_CLIPBOARD_TO_QUEUE,
  REMOVED_CLIPBOARD_TO_QUEUE
} from '../../../redux/exchange/actions';
import ClipboardMessage from '../../../helpers/ClipboardMessage';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FileInput from '../../../shared/FileInput';
import FileInputLabel from '../../../shared/FileInputLabel';

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

function generateQueueId() {
  return String(Math.floor(Math.random() * 9999));
}

function createClipboardMessage(type, value) {
  return {
    type,
    value
  };
}

async function standardizeClipboardData(clipboardData) {
  return new Promise((resolve, reject) => {
    const data = clipboardData;

    // Pasted thing is a file-like thing
    if (
      clipboardData.types.includes('Files') &&
      clipboardData.files.length !== 0
    ) {
      // Read file as ArrayBuffer
      const fileType = clipboardData.items[clipboardData.items.length - 1].type;
      fileToClipboardMessage(clipboardData.files[0], fileType).then(resolve);
    } else {
      const message = new ClipboardMessage(
        'text/plain',
        clipboardData.getData('text/plain')
      );
      resolve(message);
    }
  });
}

async function fileToClipboardMessage(file, fileType) {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const message = new ClipboardMessage(fileType, e.target.result);
      resolve(message);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

class PasteUtilContainer extends Component {
  state = {
    trickValue: ''
  };

  updateTrickValue = () => {
    this.setState({ trickValue: '' });
  };

  fileSelected = async e => {
    // const fileReader = new FileReader();
    // fileReader.onload = e => {
    //   this.props.removeClipboardToQueue(queueId);
    //   this.prepareClipboard(e.target.result);
    // };

    // const queueId = generateQueueId();
    // this.props.addClipboardToQueue(queueId);
    const clipboardMessage = await fileToClipboardMessage(
      e.target.files[0],
      null
    );
    this.passUpClipboard(clipboardMessage);
  };

  onPaste = async e => {
    const clipboardMessage = await standardizeClipboardData(e.clipboardData);
    this.passUpClipboard(clipboardMessage);
  };

  passUpClipboard = clipboard => {
    window.shit = window.shit || [];

    window.shit.push(clipboard);

    return this.props.onPaste ? this.props.onPaste(clipboard) : null;
  };

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

const mapActionsToProps = dispatch => ({
  addClipboardToQueue: queueId => {
    dispatch({
      type: ADDED_CLIPBOARD_TO_QUEUE,
      id: queueId
    });
  },
  removeClipboardToQueue: queueId => {
    dispatch({
      type: REMOVED_CLIPBOARD_TO_QUEUE,
      idToDelete: queueId
    });
  }
});

export default connect(() => ({}), mapActionsToProps)(PasteUtilContainer);
