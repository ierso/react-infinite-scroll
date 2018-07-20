import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import Message from './components/message';
import './scss/app.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Infinite Scroll',
      messages: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://message-list.appspot.com/messages')
      .then((response => response.json()))
      .then((json => json.messages))
      .then(messages => this.setState({
        messages: [...this.state.messages, ...messages],
      }));
  }

  renderMessages = () => {
    if (this.state.messages.length) {
      const { messages } = this.state;
      return (
        messages.map((message, index) => {
          return (
            <Message
            id={index}
            image={`http://message-list.appspot.com${message.author.photoUrl}`} 
            name={message.author.name}
            content={message.content}
            />
          )
        })
      )
    } return (
      <div className="o-loading">loading...</div>
    )
  }
  
  render() {
    const { title, messages } = this.state;
    return (
      <div className="app">
        <div className="app__wrapper">
          <h1 className="app__title">{title}</h1>
          <InfiniteScroll 
            dataLength={messages.length}
            next={this.fetchData}
            hasMore={true}
          />
          {this.renderMessages()}
          <InfiniteScroll />
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
