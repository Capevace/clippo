import { h } from 'preact';

const FileInput = props => (
  <input
    style={{
      width: '0.1px',
      height: '0.1px',
      opacity: 0,
      overflow: 'hidden',
      position: 'absolute',
      zIndex: -1
    }}
    {...props}
  />
);

export default FileInput;
