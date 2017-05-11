import React from 'react';
import ReactDOM from 'react-dom';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now(),
    };
  }
  render() {
    return (
      <div
        style={{
          width: 100,
          height: 100,
          background: 'blue',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 150,
            height: 100,
            background: 'red',
            border: '1px solid black',
            zIndex: 100,
          }}
        >
        </div>
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 140,
            width: 100,
            height: 150,
            background: 'yellow',
            border: '1px solid black',
            //zIndex: 99,
          }}
        >
        </div>
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 60,
            width: 100,
            height: 150,
            background: 'green',
            border: '1px solid black',
            //zIndex: 99,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              width: 100,
              height: 150,
              background: 'orange',
              border: '1px solid black',
              zIndex: 110,
            }}
          >
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(App, { foo: 'bar' }),
  document.getElementById('root')
);

