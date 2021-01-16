import React from "react";

export class Counter extends React.Component<{}, { count: number }> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 }
  }

  render() {
    return (
      <div id="counter">
        <h1>{this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Add</button>
      </div>
    );
  }
}

