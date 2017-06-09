import { h, Component } from 'preact';

class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null
    };

    if (props.connectionKey) this.updateUrl(props.connectionKey);
  }

  async updateUrl(key) {
    const qr = await import('qrcode');

    qr.toDataURL(key, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({
        url
      });
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.connectionKey !== this.props.connectionKey) {
      this.updateUrl(newProps.connectionKey);
    }
  }

  render(props, state) {
    return state.url
      ? <img
          style={props.style}
          class={props.class}
          width={300}
          src={state.url}
        />
      : 'Generating...';
  }
}

export default QRCode;
