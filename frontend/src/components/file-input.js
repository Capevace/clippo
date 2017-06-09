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

export { FileInput, FileInputLabel };
