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
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const { value } = e.target;
    const isValid = value.length <= MAX_LEN;
    this.props.onChange(value, isValid);
  }
  render() {
    const { value } = this.props;
    return (
      <div>
        <textarea
          type="text"
          value={this.props.value}
          onChange={this.onChange}
        />
        <div style={{ color: colorForLength(value.length) }}>
          {value.length} / {MAX_LEN}
        </div>
      </div>
    );
  }
}

const fn = function () { console.log('this', this); }
const obj = { fn: fn };
obj.fn(); // obj
fn(); // undefined

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: '',
      oneValid: true,
      two: '',
      twoValid: true,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      one: '',
      oneValid: true,
      two: '',
      twoValid: true,
    });
  }
  render() {
    const valid = this.state.oneValid && this.state.twoValid;
    return (
      <div>
        <h1>Multi-Tweet Composer</h1>
        <TweetComposer
          value={this.state.one}
          onChange={(one, oneValid) => this.setState({ one, oneValid })}
        />
        <TweetComposer
          value={this.state.two}
          onChange={(two, twoValid) => this.setState({ two, twoValid })}
        />
        <button
          onClick={this.onClick}
          disabled={!valid}
        >Send Tweets!</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
