import { h } from 'preact';
import { css } from 'glamor';
import isSrcImage from '../helpers/is-src-image';

import HighlightBox from './highlight-box';

const marginStyle = css({
  marginTop: '10px',
  marginBottom: '10px'
});

const ClipboardCard = ({ clipboard }) => (
  <HighlightBox {...marginStyle}>
    {isSrcImage(clipboard)
      ? <img src={clipboard} style="width: 100%;" />
      : <div>
          <span
            style={{
              wordBreak: 'break-word'
            }}
          >
            {clipboard}
          </span>
        </div>}
  </HighlightBox>
);

export default ClipboardCard;
