import { h } from 'preact';

const FileInputLabel = props => (
  <label
    style={{
      background: '#2196f3',
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
      cursor: 'pointer',
      display: 'inline-block'
    }}
    {...props}
  />
);

export default FileInputLabel;
