import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5fcff",

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    textAlign: "center",

    fontSize: 20,
  }
})