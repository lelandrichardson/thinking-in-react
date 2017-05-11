import React from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';
import windowSize from '../utils/windowSize';
import Debug from '../utils/Debug';

const withWindowSize = (propName = 'windowSize') => Component => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        size: windowSize.get(),
      };
      this.subscription = null;
    }
    componentDidMount() {
      this.subscription = windowSize.subscribe(() => this.setState({ size: windowSize.get() }));
    }
    componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
    render() {
      return (
        <Component
          {...this.props}
          {...{ [propName]: this.state.size }}
        />
      );
    }
  }
  hoistNonReactStatic(Wrapper, Component);
  return Wrapper;
};

const debounce = wait => Component => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        trigger: 0,
      };
      this.timeout = null;
    }
    shouldComponentUpdate(nextProps, nextState) {
      return nextState.trigger !== this.state.trigger;
    }
    update() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setState({ trigger: this.state.trigger + 1 });
      }, wait);
    }
    componentWillReceiveProps() {
      this.update();
    }
    componentWillUnmount() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
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

// const DebouncedDisplayCount = debounce(100)(Debug);
// const DebouncedDiv = debounce(100)('div');
const WindowSize = withWindowSize('size')(debounce(1000)((Debug)));

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
        <h1>Window Size</h1>
        <WindowSize />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
