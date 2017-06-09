import { h, Component } from 'preact';

import RaisedButton from 'material-ui/RaisedButton';
import Loader from './Loader';
import { FileInput, FileInputLabel } from './file-input';

async function parseQRCodeInFile(file) {
  const QRCode = (await import('qrcode-reader')).default;

  return new Promise((resolve, reject) => {
    const qr = new QRCode();
    qr.callback = (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    };

    const fileReader = new FileReader();
    fileReader.onload = e => qr.decode(e.target.result);
    fileReader.readAsDataURL(file);
  });
}

class QRReader extends Component {
  constructor() {
    super();
    this.state = {
      decoding: false
    };

    this.focusQRInput = this.focusQRInput.bind(this);
    this.decode = this.decode.bind(this);
    this.qrInput = null;
  }

  async decode(e) {
    try {
      const { result } = await parseQRCodeInFile(e.target.files[0]);

      if (this.props.onDecode) this.props.onDecode(result);
    } catch (e) {
      // Nothing found
      alert(
        ('We were unable to detect a QRCode in that picture.', e.toString())
      );
    }
  }

  focusQRInput() {
    if (this.qrInput) this.qrInput.click();
  }

  render(props, state) {
    return state.decoding
      ? <Loader loading label="Parsing..." />
      : <div>
          <FileInput
            type="file"
            name="qrcode"
            id="qrcode"
            onChange={this.decode}
            ref={input => {
              this.qrInput = input;
            }}
          />
          <FileInputLabel htmlFor="qrcode">
            Scan QR Code
          </FileInputLabel>
        </div>;
  }
}

export default QRReader;
