import { h } from 'preact';
import { css } from 'glamor';

const orderedList = css({
  counterReset: 'item',
  paddingLeft: 0
});

const orderedListItem = css({
  display: 'block',
  marginBottom: '20px',
  fontSize: '20px',
  fontWeight: 300,
  ':before': {
    content: 'counter(item)',
    counterIncrement: 'item',
    color: '#C9C9C9',
    fontWeight: 'bold',
    fontSize: '20px',
    marginRight: '20px'
  }
});

const textSeparator = css({
  fontWeight: 'bold',
  fontStyle: 'italic',
  marginLeft: '10px',
  marginRight: '10px',
  color: '#A2A2A2'
});

const AuthTutorial = () => (
  <span>
    <h2>How it works</h2>
    <ol {...orderedList}>
      <li {...orderedListItem}>
        Open <strong>Clippo</strong> on your device
      </li>
      <li {...orderedListItem}>
        Scan this QR Code
        <span {...textSeparator}>or</span>
        Enter a Code
      </li>
      <li {...orderedListItem}>Paste and share anything you want</li>
    </ol><br />
  </span>
);

export default AuthTutorial;
