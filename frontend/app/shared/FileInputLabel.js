import { h } from 'preact';
import { css } from 'glamor';

const labelStyle = css({
  background: '#00FFA6',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '4px',
  color: 'black',
  cursor: 'pointer',
  display: 'inline-block',
  ':hover': {
    background: '#00e092'
  },
  ':active': {
    background: '#008254'
  }
});
const FileInputLabel = props => <label {...labelStyle} {...props} />;

export default FileInputLabel;
