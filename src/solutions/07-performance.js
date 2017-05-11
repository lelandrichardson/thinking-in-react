import React from 'react';
import ReactDOM from 'react-dom';
import users from '../utils/users';
import sleep from '../utils/sleep';
import Incremental from '../utils/Incremental';

const contains = prefix => user => user.name.toLowerCase().indexOf(prefix.toLowerCase()) !== -1;
const calculateFps = times => Math.round(1000 / (times.reduce((a, b) => a + b) / times.length));

class User extends React.PureComponent {
  render() {
    const { image, name } = this.props;
    sleep(3);
    return (
      <li>
        <img src={image} width={32} height={32} />
        <span>{name}</span>
      </li>
    );
  }
}

class FilteredUsers extends React.PureComponent {
  render() {
    const { filter, users } = this.props;
    return (
      <Incremental initial={20} increment={20}>
        {users.filter(contains(filter)).map((user, i) => (
          <User
            key={user.id}
            name={user.name}
            image={user.picture}
          />
        ))}
      </Incremental>
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
    const { users, filter, time, times } = this.state;
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
        <FilteredUsers
          filter={filter}
          users={users}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
