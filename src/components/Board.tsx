import React from 'react';
import { Square } from './';

type BoardProps = {};

type State = {
  squares: Array<Square>;
};

class Board extends React.Component<BoardProps, State> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }
}