import React from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

const getPost = id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(r => r.json());
const getUser = id => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(r => r.json());
const getComments = id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(r => r.json());

const withPromise = ({
  getData,
  mapResultToProps = data => ({ data }),
  renderLoading = () => null,
}) => Component => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        results: {},
      };
    }
    resolve(props) {
      this.setState({ loading: true });

      getData(props)
        .then(results => mapResultToProps(results))
        .then(results => {
          if (this.mounted) {
            this.setState({ loading: false, results });
          }
        });
    }
    componentDidMount() {
      this.mounted = true;
      this.resolve(this.props);
    }
    componentWillReceiveProps(nextProps) {
      this.resolve(nextProps);
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    render() {
      if (this.state.loading) {
        return renderLoading();
      }

      return (
        <Component
          {...this.props}
          {...this.state.results}
        />
      );
    }
  }
  hoistNonReactStatic(Wrapper, Component);
  return Wrapper;
};

class Loader extends React.Component {
  render() {
    return (
      <div>
        Loading!
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <span>
        {user.name} ({user.email})
      </span>
    );
  }
}

class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <li>
        <div>{comment.name} ({comment.email})</div>
        <p>{comment.body}</p>
      </li>
    );
  }
}


class Post extends React.Component {
  render() {
    const { post, comments } = this.props;
    return (
      <div>
        <div>This is a Post!</div>
        <h3>{post.title} <ConnectedUser id={post.userId} /></h3>
        <p>{post.body}</p>
        <h3>Comments:</h3>
        <ul>
          {comments.map(c => <Comment key={c.id} comment={c} />)}
        </ul>
      </div>
    );
  }
}

const ConnectedPost = withPromise({
  post: props => getPost(props.id),
  comments: props => getComments(props.id),
}, () => <Loader />)(Post);

const ConnectedUser = withPromise({
  user: props => getUser(props.id),
})(User);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
    };
  }
  render() {
    return (
      <div>
        <h1>Higher Order Components</h1>
        <input value={this.state.id} onChange={e => this.setState({ id: +e.target.value })} />
        <ConnectedPost id={this.state.id} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
