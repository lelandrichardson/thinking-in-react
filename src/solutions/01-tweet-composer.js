import React from 'react';
import ReactDOM from 'react-dom';

const MAX_LEN = 140;
const WARN_LEN = 120;
const COLOR_INVALID = 'red';
const COLOR_WARNING = '#ff9800';
const COLOR_NORMAL = 'black';

const colorForLength = length => length > MAX_LEN
  ? COLOR_INVALID
  : length > WARN_LEN
    ? COLOR_WARNING
    : COLOR_NORMAL;

class TweetComposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    const { text } = this.state;
    return (
      <div>
        <textarea
          type="text"
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <div style={{ color: colorForLength(text.length) }}>
          {text.length} / {MAX_LEN}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Tweet Composer</h1>
        <TweetComposer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
