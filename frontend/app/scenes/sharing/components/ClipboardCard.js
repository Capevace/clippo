import { h, Component } from 'preact';
import { css } from 'glamor';
import isSrcImage from '../../../helpers/is-src-image';

import HighlightBox from '../../../shared/HighlightBox';
import Loader from '../../../shared/Loader';

const marginStyle = css({
  marginTop: '10px',
  marginBottom: '10px'
});

class ClipboardCard extends Component {
  state = {
    updateCounter: 0
  };
  forceRerender() {
    this.setState({ updateCounter: this.state.updateCounter + 1 });
  }

  render({ clipboard, loading }) {
    console.log('tt', clipboard.decodedValue, clipboard.isImage());
    if (!clipboard.decodedValue)
      clipboard
        .getDecodedValue()
        .then(() => (console.log('fin'), this.forceRerender()));

    return (
      <HighlightBox {...marginStyle}>
        {clipboard.isImage()
          ? clipboard.decodedValue
              ? <img src={clipboard.toImageDataURL()} style="width: 100%;" />
              : <Loader loading color="#00e092" />
          : <div>
              <span
                style={{
                  wordBreak: 'break-word'
                }}
              >
                {clipboard.decodedValue || <Loader loading color="#00e092" />}
              </span>
            </div>}
      </HighlightBox>
    );
  }
}
export default ClipboardCard;
