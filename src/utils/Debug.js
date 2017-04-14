import React from 'react';

class Debug extends React.Component {
  render() {
    return (
      <pre
        style={{
          backgroundColor: '#efefef',
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: 8
        }}
      >
        <code>
          {JSON.stringify(this.props, null, 2)}
        </code>
      </pre>
    );
  }
}

module.exports = Debug;
