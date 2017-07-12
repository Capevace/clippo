import { h } from 'preact';
import { connect } from 'preact-redux';
import { css } from 'glamor';

const snackbarContainerStyle = css({
  display: 'block',
  position: 'fixed',
  bottom: '0',
  padding: '10px',
  width: '500px',
  left: '50%',
  marginLeft: '-250px'
});

const snackbarStyle = css({
  padding: '15px',
  background: 'black',
  borderRadius: '5px',
  color: 'white',
  marginBottom: '10px',
  boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.34)',
  textAlign: 'center'
});

const MessagesContainer = ({ messages }) => (
  <div {...snackbarContainerStyle}>
    {Object.keys(messages).map((messageKey, index) => (
      <div {...snackbarStyle} key={messageKey}>
        {messages[messageKey]}
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps)(MessagesContainer);
