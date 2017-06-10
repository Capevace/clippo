import { h } from 'preact';
import isSrcImage from '../helpers/is-src-image';

import { Card, CardMedia, CardText } from 'material-ui/Card';

const ClipboardCard = ({ clipboard }) => (
  <Card>
    {isSrcImage(clipboard)
      ? <CardMedia>
          <img src={clipboard} />
        </CardMedia>
      : <div>
          <CardText>
            <span
              style={{
                wordBreak: 'break-word'
              }}
            >
              {clipboard}
            </span>
          </CardText>
        </div>}

  </Card>
);

export default ClipboardCard;
