import React from 'react';
import ReactDOM from 'react-dom';
import users from '../utils/users';
import sleep from '../utils/sleep';

const contains = prefix => user => user.name.toLowerCase().indexOf(prefix.toLowerCase()) !== -1;
const calculateFps = times => Math.round(1000 / (times.reduce((a, b) => a + b) / times.length));

// EXERCISE:
// This example has a screen that renders 500 users to the page, and provides
// a UI to search for the user by name. The `User` component has been made to
// emulate a much more expensive component by adding in a `sleep(3)` into the
// render function. The App is also updating very rapidly to display a
// framerate counter. Without removing the `sleep(3)` call or the framerate
// counter, try to tweak and refactor the app to be more performant, providing
// as close to a consistent 60fps as possible.

// HINT: what components are rendering, and how often? Do they need to?

class User extends React.Component {
  render() {
    const { image, name } = this.props;
    sleep(3);
    return (
      <li>
        <img src={image} />
        <span>{name}</span>
      </li>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: performance.now(),
      times: [16.66],
      filter: '',
      users,
    };
    this.updateTime = this.updateTime.bind(this);
  }
  updateTime() {
    const { time, times } = this.state;
    const newTime = performance.now();

    const diff = newTime - time;
    if (times.length > 60) {
      times.shift();
    }
    times.push(diff);
    this.setState({
      time: newTime,
      times,
    }, () => {
      this.raf = requestAnimationFrame(this.updateTime);
    });
  }
  componentDidMount() {
    this.updateTime();
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }
  render() {
    const { filter, time, times } = this.state;
    const fps = calculateFps(times);
    return (
      <div>
        <h1>Which city is the best?</h1>
        <div>
          {Math.round(time)}
        </div>
        <div>
          FPS: {calculateFps(times)}
        </div>
        <input
          type="text"
          value={this.state.filter}
          onChange={e => this.setState({ filter: e.target.value })}
        />
        <ul>
          {this.state.users.filter(contains(filter)).map((user, i) => (
            <User
              key={i}
              name={user.name}
              image={user.picture}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
