import React from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';
import windowSize from '../utils/windowSize';
import Debug from '../utils/Debug';

// EXERCISE 3:
// make a `withWindowSize` HOC that wraps a component and passes
// in a prop to the wrapped component with the screen's current
// width and height, and automatically updates the wrapped component
// whenever the window is resized. The HOC would allow you to configure
// what prop name it used to pass down the window size object, but
// would default to `windowSize`.

// HINT: Use the windowSize module.
/*
  // get window size:
  windowSize.get(); // => { width: 1024, height: 768 }

  // subscribe to updates
  const sub = windowSize.subscribe(() => console.log(windowSize.get()));

  // unsubscribe from updates
  sub.unsubscribe();
*/

// HINT: don't forget to unsubscribe when the component is unmounted!

const withWindowSize = (propName = 'windowSize') => Component => {
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

const WindowSize = withWindowSize('size')(Debug);

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
