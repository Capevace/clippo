import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { getSocket } from '../session';

import PasteUtilContainer from '../components/paste-util-container';
import ClipboardList from '../components/clipboard-list';

function emitClipboard(clipboard, clientId) {
  getSocket().emit('post-clipboard', {
    clipboard,
    clientId
  });
}

const ShareContainer = ({ clipboards, clientId }) => (
  <div>
    <PasteUtilContainer
      onPaste={clipboard => emitClipboard(clipboard, clientId)}
    />
    <ClipboardList clipboards={clipboards} ownClientId={clientId} />
  </div>
);

const mapStateToProps = state => ({
  clipboards: state.exchange.clipboards,
  clientId: state.connection.id
});

export default connect(mapStateToProps)(ShareContainer);
