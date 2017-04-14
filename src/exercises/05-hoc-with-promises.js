import React from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';


// EXERCISE:
// Build a `withPromises` HOC that accepts a map of promise returning
// functions, and creates a component that renders a "loading" view (which
// is specified by the second argument of the HOC) until all of the promises
// returned from the map are resolved, at which point the component renders
// the wrapped component, but with the results of the promises passed in as
// props.

const withPromises = (promiseMap, renderLoading = () => null) => Component => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading; true,
      };
    }
    render() {
      if (this.state.loading) {
        return renderLoading(this.props);
      }
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
        {/* TODO: render comments */}
      </div>
    );
  }
}


const BASE_URL = 'https://jsonplaceholder.typicode.com';
const getPost = id => fetch(`${BASE_URL}/posts/${id}`).then(r => r.json());
const getUser = id => fetch(`${BASE_URL}/users/${id}`).then(r => r.json());
const getComments = id => fetch(`${BASE_URL}/posts/${id}/comments`).then(r => r.json());

const ConnectedPost = withPromises({
  post: props => getPost(props.id),
  // FOLLOWUP: add a promise to get comments as well, and render them in
  // the `Post` component
  // comments: ...
}, () => <Loader />)(Post);

const ConnectedUser = withPromises({
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
