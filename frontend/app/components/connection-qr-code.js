import { h } from 'preact';

import QRCode from './qr-code';
import Loader from './loader';

const ConnectionQRCode = ({ connectionKey }) =>
  connectionKey
    ? <QRCode connectionKey={connectionKey} style={{ width: '100%' }} />
    : <Loader loading label={'Fetching key...'} style={{ width: '100%' }} />;

export default ConnectionQRCode;
