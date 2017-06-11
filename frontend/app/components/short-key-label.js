import { h } from 'preact';

const CodeLabel = props => (
  <span
    style={{
      color: 'gray',
      fontFamily: 'monospace',
      fontSize: '50px'
    }}
    {...props}
  />
);
const CodeSeparator = props => (
  <span
    style={{
      color: '#dedede',
      pointerEvents: 'none',
      userSelect: 'none'
    }}
    {...props}
  />
);

const ShortKeyLabel = ({ shortKey }) =>
  !shortKey
    ? <CodeLabel>
        LOA<CodeSeparator>D</CodeSeparator>ING
      </CodeLabel>
    : <CodeLabel>
        {shortKey.substr(0, 3)}
        <CodeSeparator>-</CodeSeparator>
        {shortKey.substr(3, 3)}
      </CodeLabel>;

export default ShortKeyLabel;
