import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Flag from "./Flag";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <TouchableOpacity onPress={props.onFlagPress}
          style={styles.flagButton}>
          <Flag bigger />
        </TouchableOpacity>
        <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
      </View>
      <TouchableOpacity onPress={props.onNewGame}
        style={styles.button}>
          <Text style={styles.buttonLabel}>Novo Jogo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE", // cor de fundo do flag container

    flex: 1, // irá permitir o flag container crescer em todo espaço possível
    flexDirection: "row", // por padrão o flex direction do RN é a coluna/column
    justifyContent: "space-around", // para mecher no alinhamento dos elementos/flex items no Eixo Principal/main axis(que nesse caso é a linha/row, pois alteramos o flexDirection para row)
    alignItems: "center", // para mecher no alinhamento dos elementos/flex items no eixo cruzado/cross axis(que nesse caso é no eixo da coluna/column, pois alteramos o flexDirection para row) 

    paddingTop: 20, // espaçamento entre o conteúdo/flag container e a borda do topo
    paddingHorizontal: 20, // espaçamento entre o conteúdo/flag container e a borda do eixo horizontal(esquerda e direita)
  },
  flagContainer: {
    flexDirection: "row", // por padrão o flex direction do RN é a coluna/column
  },
  flagButton: {
    marginTop: 10, // espaçamento entre a borda superior do botão e os demais elementos
    minWidth: 30, // largura mínima do botão
  }, 
  flagsLeft: {
    fontSize: 30, // tamanho da fonte do texto
    fontWeight: "bold", // peso da fonte (bold = negrito)

    paddingTop: 5, // espaçamento entre o conteúdo/flags left e a borda do topo
    marginLeft: 20, // // espaçamento entre a borda esquerda do flags left e os demais elementos
  },
  button: {
    backgroundColor: "#999", // cor de fundo do botão

    padding: 5, // espaçamento entre o conteúdo/button e a todas as bordas
  },
  buttonLabel: {
    fontSize: 20, // tamanho da fonte do texto do botão
    fontWeight: "bold", // peso da fonte do texto do botão (bold = negrito)
    color: "#DDD" // cor da fonte do texto do botão
  }
});

export default Header;