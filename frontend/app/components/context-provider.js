import { h, Component } from 'preact';

export default class ContextProvider extends Component {
  getChildContext = () => this.props.context;

  render(props) {
    return props.children[0];
  }
}
