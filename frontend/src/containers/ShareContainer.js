import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import isMobile from 'is-mobile';
import { getSocket } from '../session';
import isSrcImage from '../helpers/is-src-image';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FileInput, FileInputLabel } from '../components/file-input';

const PasteLabel = props => (
  <span
    style={{
      color: 'gray',
      fontSize: '20px',
      fontWeight: 'bold'
    }}
    {...props}
  />
);

class ShareContainer extends Component {
  constructor() {
    super();
    this.state = {
      v: ''
    };
    this.postClipboard = this.postClipboard.bind(this);
    this.fileSelected = this.fileSelected.bind(this);
  }

  componentWillMount() {
    document.addEventListener('paste', this.postClipboard);
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.postClipboard);
  }

  fileSelected(e) {
    const fileReader = new FileReader();
    fileReader.onload = e => this.emitClipboard(e.target.result);
    fileReader.readAsDataURL(e.target.files[0]);
  }

  emitClipboard(clipboard) {
    getSocket().emit('post-clipboard', {
      clientId: this.props.clientId,
      clipboard
    });
  }

  postClipboard(e) {
    if (e.clipboardData.types.includes('Files')) {
      const file = e.clipboardData.files[0];
      const reader = new FileReader();
      reader.onload = evt => {
        this.emitClipboard(evt.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      this.emitClipboard(e.clipboardData.getData('text/plain'));
    }
  }

  render(props, state) {
    return (
      <div>
        <Card style="margin-bottom: 20px;">
          <CardText>
            <center>
              {isMobile()
                ? <TextField
                    hintText="Paste your text/image here"
                    value={state.v}
                    onChange={e => this.setState({ v: '' })}
                  />
                : <PasteLabel>Press CTRL+V or CMD+V</PasteLabel>}
              &nbsp;&nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;&nbsp;
              <FileInput
                type="file"
                name="paster"
                id="paster"
                onChange={this.fileSelected}
              />
              <FileInputLabel htmlFor="paster">
                Drop a file
              </FileInputLabel>
            </center>
          </CardText>
        </Card>
        <Grid fluid>
          {this.props.clipboards.reverse().map(message => (
            <Row>
              {props.clientId === message.clientId
                ? <Col xs={1} sm={6} md={8} />
                : null}
              <Col xs={11} sm={6} md={4} style="margin: 20px 0px;">
                <Card>
                  {isSrcImage(message.clipboard)
                    ? <CardMedia>
                        <img src={message.clipboard} />
                      </CardMedia>
                    : <div>
                        <CardText>
                          <span
                            style={{
                              wordBreak: 'break-word'
                            }}
                          >
                            {message.clipboard}
                          </span>
                        </CardText>
                        {/* <CardActions>
                          <RaisedButton label="Copy" />
                        </CardActions> */}
                      </div>}

                </Card>
              </Col>
              {props.clientId !== message.clientId
                ? <Col xs={1} sm={6} md={8} />
                : null}
            </Row>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clipboards: state.exchange.clipboards,
  clientId: state.connection.id
});

export default connect(mapStateToProps)(ShareContainer);
