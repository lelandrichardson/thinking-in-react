import React from 'react';

class Incremental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: React.Children.count(props.children),
      rendered: props.initial,
    };
    this.increment = this.increment.bind(this);
    this.raf = null;
  }
  increment() {
    if (this.state.rendered < this.state.length) {

      this.setState({
        rendered: this.state.rendered + this.props.increment,
      });
    }
  }
  componentDidMount() {
    this.raf = requestAnimationFrame(this.increment);
  }
  componentDidUpdate() {
    this.raf = requestAnimationFrame(this.increment);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.setState({
        length: React.Children.count(nextProps.children),
        rendered: nextProps.initial,
      });
    }
  }
  render() {
    const { children } = this.props;
    const { rendered, length } = this.state;
    return (
      <ul>
        {React.Children.map(children, (child, i) => {
          if (i > rendered) return null;
          return child;
        })}
      </ul>
    );
  }
}

module.exports = Incremental;
