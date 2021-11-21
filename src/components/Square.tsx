import React from 'react';

type SquareProps = {
  value: number;
};

type State = {
  value: string | null;
};

class Square extends React.Component<SquareProps, State> {
  constructor(props: SquareProps) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    const handleClick = () => {
      this.setState({ value: 'X' });
    }

    return (
      <button className="square" onClick={handleClick}>
        {this.state.value}
      </button>
    );
  }
}

export default Square;
