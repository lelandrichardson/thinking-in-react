import React from 'react';
import ReactDOM from 'react-dom';

const cityComparator = (a, b) => b.votes - a.votes;

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false,
      downvoted: false,
    };
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
  }
  up() {
    const { upvoted } = this.state;
    this.setState({ upvoted: !upvoted });
    this.props.onVote(upvoted ? -1 : +1);
  }
  down() {
    const { downvoted } = this.state;
    this.setState({ downvoted: !downvoted });
    this.props.onVote(downvoted ? +1 : -1);
  }
  render() {
    const { name, votes } = this.props;
    const { upvoted, downvoted } = this.state;
    const color = upvoted ? 'green' : downvoted ? 'red' : 'black';
    return (
      <li style={{ color }}>
        <button onClick={this.up} disabled={downvoted}>+</button>
        <button onClick={this.down} disabled={upvoted}>-</button>
        {`${name} (${votes})`}
      </li>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { name: 'San Francisco', votes: 0 },
        { name: 'Portland', votes: 0 },
        { name: 'Seattle', votes: 0 },
        { name: 'New York', votes: 0 },
        { name: 'Los Angeles', votes: 0 },
      ],
    };
  }
  updateVotes(city, add) {
    const { cities } = this.state;
    const index = cities.indexOf(city);
    this.setState({
      cities: [
        ...cities.slice(0, index),
        { ...city, votes: city.votes + add },
        ...cities.slice(index + 1),
      ],
    });
  }
  render() {
    return (
      <div>
        <h1>Which city is the best?</h1>
        <ul>
          {this.state.cities.sort(cityComparator).map((city, i) => (
            <City
              key={city.name}
              name={city.name}
              votes={city.votes}
              onVote={add => this.updateVotes(city, add)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
