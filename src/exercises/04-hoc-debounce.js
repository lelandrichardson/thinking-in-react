import React from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

// EXERCISE:
// Build a `debounce` HOC that accepts a number `wait` (of milliseconds),
// and returns a new debounced version of the passed Component that will
// postpone re-rendering itself until after wait milliseconds have elapsed
// since the last time it was provided new props.

// HINT:
// the point of this is to prevent the component from re-rendering. What
// lifecycle allows us to say when the component should or should not
// update?

// HINT:
// `debounce` can be implemented using `setTimeout` and `clearTimeout`.

const debounce = wait => Component => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }
  hoistNonReactStatic(Wrapper, Component);
  return Wrapper;
};


class DisplayCount extends React.Component {
  render() {
    return <h3>{this.props.label} {this.props.count}</h3>
  }
}

const DebouncedDisplayCount = debounce(100)(DisplayCount);
const DebouncedDiv = debounce(100)('div');
const LongDebouncedDisplayCount = debounce(1000)(DisplayCount);
const LongDebouncedDiv = debounce(1000)('div');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>Higher Order Components</h1>
        <button onClick={(e) => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
        <DisplayCount label="Normal: " count={this.state.count} />
        <DebouncedDiv>
          <DisplayCount label="In a div (100ms): " count={this.state.count} />
        </DebouncedDiv>
        <DebouncedDisplayCount label="Debounced (100ms): " count={this.state.count} />
        <LongDebouncedDiv>
          <DisplayCount label="In a div (1s): " count={this.state.count} />
        </LongDebouncedDiv>
        <LongDebouncedDisplayCount label="Debounced (1s): " count={this.state.count} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
