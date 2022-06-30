import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import MineField from "../components/MineField";

import { 
  createMinedBoard 
} from "../logic";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.createState()
  }

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(rows * columns * params.difficultLevel);
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, columns, this.minesAmount()),
    }
  }

  render() {
    console.log(this.createState)
    return (
      <View style={styles.container}>
        <Text>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    backgroundColor: "#AAA",
    alignItems: "center",
  }
});