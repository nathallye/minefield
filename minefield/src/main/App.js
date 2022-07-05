import React, {Component} from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import params from "../params";

import MineField from "../components/MineField";

import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag
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
      won: false,
      lost: false,
    }
  }

  onOpenField = (row, column) => { // não precisamos receber o board, pois ele já esta no state
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board)
      Alert.alert("Você acabou de explodir!", "Fim de Jogo");
    }

    if (won) {
      Alert.alert("Parabéns!", "Você venceu!");
    }

    this.setState({ board, won, lost }); // como a chave e o valor possuem o mesmo nome podemos simplificar dessa forma. A forma completa fica assim: { board: board, won: won, lost: lost }
  }

  onSelectField = (row, column) => { // não precisamos receber o board, pois ele já esta no state
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);

    const won = wonGame(board);
    
    if (won) {
      Alert.alert("Parabéns!", "Você Venceu!!");
    }

    this.setState({ board, won }); // como a chave e o valor possuem o mesmo nome podemos simplificar dessa forma. A forma completa fica assim: { board: board, won: won }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <View style={styles.board}>
          <MineField board={this.state.board} 
           onOpenField={this.onOpenField} 
           onSelectField={this.onSelectField} />
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