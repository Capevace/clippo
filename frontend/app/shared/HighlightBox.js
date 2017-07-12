import { h } from 'preact';
import { css } from 'glamor';

const highlightBox = css({
  boxSizing: 'border-box',
  width: '100%',
  background: '#000',
  borderRadius: '5px',
  color: '#fff',
  padding: '20px',
  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.5)'
});

const highlightBoxHeading = css({
  textAlign: 'center',
  fontSize: '20px',
  margin: 0,
  marginBottom: '15px'
});

const HighlightBox = props => (
  <div {...highlightBox} style={props.style} {...props}>
    {props.heading ? <h2 {...highlightBoxHeading}>{props.heading}</h2> : null}
    {props.children}
  </div>
);

export default HighlightBox;
