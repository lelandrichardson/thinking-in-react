import React from 'react';
import ReactDOM from 'react-dom';

const MAX_LEN = 140;
const WARN_LEN = 120;
const COLOR_INVALID = 'red';
const COLOR_WARNING = '#ff9800';
const COLOR_NORMAL = 'black';

// EXERCISE: STEP 1
// Make your TweetComposer component from the previous exercise
// reusable by making it a "controlled" component, having a `value`
// prop and an `onChange` callback (passing back both the value and
// whether or not it's valid or not). Prove that it's now reusable
// by using the component twice in the `App` component and having
// each one have independent values


// EXERCISE: STEP 2
// make the "submit" button disabled when either of the two
// tweet composer components are in an invalid state. The
// button can be disabled using the `disabled={boolean}` prop.

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
  constructor(props) {
    super(props);
    this.state = {
      one: '',
      two: '',
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      one: '',
      two: '',
    });
  }
  render() {
    return (
      <div>
        <h1>Multi-Tweet Composer</h1>
        <TweetComposer
          value={this.state.one}
          onChange={(one) => this.setState({ one })}
        />
        <TweetComposer
          value={this.state.two}
          onChange={(two) => this.setState({ two })}
        />
        <button onClick={this.onClick}>Send Tweets!</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
