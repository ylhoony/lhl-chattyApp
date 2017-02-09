import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
    }


  addUsername (e) {
    console.log('username test');
    if (e.key === 'Enter') {
      this.props.onKeyPress(e);
    }
    console.log('username test: ', e.target.value);
    return e.target.value;
  }

  addMsg(e) {
    console.log('message test');
    if (e.key === 'Enter') {
      console.log('add Msg: ', e.target.value);
      // this.props.onKeyPress();
      var message = {
        username: this.state.currentUser.name,
        content: e.target.value
      }

      var messages = this.state.messages.concat(message)

      // calls the render method in the App component
      this.setState({ messages: messages })
      console.log(message);
    }
  }




    // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }


  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMsg={this.addMsg.bind(this)}  />
      </div>
    );
  }
}

export default App;
