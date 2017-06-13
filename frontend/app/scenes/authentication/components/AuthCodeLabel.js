import { h } from 'preact';

const CodeLabel = props => (
  <div
    style={{
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '35px',
      textAlign: 'center'
    }}
    {...props}
  />
);
const CodeSeparator = props => (
  <span
    style={{
      color: 'gray',
      pointerEvents: 'none',
      userSelect: 'none'
    }}
    {...props}
  />
);

const AuthCodeLabel = ({ shortKey }) =>
  !shortKey
    ? <CodeLabel>
        LOA<CodeSeparator>D</CodeSeparator>ING
      </CodeLabel>
    : <CodeLabel>
        {shortKey.substr(0, 3)}
        <CodeSeparator>-</CodeSeparator>
        {shortKey.substr(3, 3)}
      </CodeLabel>;

export default AuthCodeLabel;
