import { h } from 'preact';

import QRCode from '../../../shared/QRCode';
import Loader from '../../../shared/Loader';

const AuthQRCode = ({ connectionKey }) =>
  connectionKey
    ? <QRCode
        connectionKey={connectionKey}
        style={{ height: '200px', display: 'block', margin: '0 auto' }}
      />
    : <Loader loading style="margin: 70px 0;" />;

export default AuthQRCode;
