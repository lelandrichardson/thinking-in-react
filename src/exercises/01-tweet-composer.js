import React from 'react';
import ReactDOM from 'react-dom';

const MAX_LEN = 140;
const WARN_LEN = 120;
const COLOR_INVALID = 'red';
const COLOR_WARNING = '#ff9800';
const COLOR_NORMAL = 'black';

// EXERCISE:
// build out a `TweetComposer` component that is an "augmented"
// `<textarea>` that has an indicator for the textarea's text
// length, and is colored `COLOR_INVALID` when the length is
// greater than `MAX_LEN`, or `COLOR_WARNING` when the text
// length is greater than `WARN_LEN`, and just `COLOR_NORMAL`
// otherwise.

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
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ text: e.target.value });
  }
  render() {
    const { text } = this.state;
    return (
      <div>
        <textarea
          type="text"
          value={text}
          onChange={this.onChange}
        />
        <div style={{ color: colorForLength(text.length) }}>
          {text.length} / {MAX_LEN}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
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
