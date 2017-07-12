import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { getSocket } from '../../session';
import ClipboardMessage from '../../helpers/ClipboardMessage';

import PasteUtilContainer from './components/PasteUtilContainer';
import ClipboardList from './components/ClipboardList';

function emitClipboard(message, clientId) {
  const serialized = ClipboardMessage.serialize(message);
  getSocket().emit('post-clipboard', {
    clipboard: serialized,
    clientId
  });
  console.log(serialized.value);
  getSocket().emit(
    `post-clipboard-data-${clientId}-${serialized.id}`,
    serialized.value
  );
}

const ShareContainer = ({ clipboards, pasteQueue, clientId }) => (
  <div>
    <PasteUtilContainer
      onPaste={clipboard => emitClipboard(clipboard, clientId)}
    />
    <ClipboardList
      clipboards={clipboards}
      ownClientId={clientId}
      queue={pasteQueue}
    />
  </div>
);

const mapStateToProps = state => ({
  clipboards: state.exchange.clipboards,
  pasteQueue: state.exchange.pasteQueue,
  clientId: state.connection.id
});

export default connect(mapStateToProps)(ShareContainer);
