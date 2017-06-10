import { h, Component } from 'preact';

import Loader from './loader';
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
  state = {
    decoding: false
  };

  decode = async e => {
    this.setState({ decoding: true });

    try {
      const { result } = await parseQRCodeInFile(e.target.files[0]);

      if (this.props.onDecode) this.props.onDecode(result);
    } catch (e) {
      // Nothing found
      alert(
        ('We were unable to detect a QRCode in that picture.', e.toString())
      );
    } finally {
      this.setState({ decoding: false });
    }
  };

  render(props, state) {
    return state.decoding
      ? <Loader loading label="Decoding Picture..." />
      : <div>
          <FileInput
            type="file"
            name="qrcode"
            id="qrcode"
            onChange={this.decode}
          />
          <FileInputLabel htmlFor="qrcode">
            Scan QR Code
          </FileInputLabel>
        </div>;
  }
}

export default QRReader;
