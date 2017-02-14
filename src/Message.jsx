import React, {Component} from 'react';

class Message extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    const { username, content } = this.props.message;

    return (
      <div>
        <div className="message">
          <span className="message-username">{ username }</span>
          <span className="message-content">{ content }</span>
        </div>
      </div>
    )
  }
}
export default Message;
