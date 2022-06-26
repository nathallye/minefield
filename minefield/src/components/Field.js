import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

const Field = (props) => {
  const { mined, opened, nearMines } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (styleField.length === 1) styleField.push(styles.regular);

  let color = null;
  if (nearMines > 0) {
    if (nearMines === 1) color = "#2A28D7";
    if (nearMines === 2) color = "#2B520F";
    if (nearMines > 2 && nearMines < 6) color = "#F9060A";
    if (nearMines >= 6) color = "F221A9";
  }

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  field: { // todos os campos indepedentes de estarem explodidos ou não vão receber esse objeto de estilo
    height: params.blockSize, // a altura do "campinho" vai ser a que definimos em params
    width: params.blockSize, // a largura do "campinho" vai ser a que definimos em params
    borderWidth: params.borderSize, // a largura da borda do "campinho" vai ser a que definimos em params
  },
  regular: {
    backgroundColor: "#999", // cor do fundo do "campinho regular" cinza intermediário entre as duas bordas
    borderLeftColor: "#CCC", // cor da borda esquerda do "campinho regular" cinza mais claro
    borderTopColor: "#CCC", // cor da borda do topo do "campinho regular" cinza mais claro
    borderRightColor: "#333", // cor da borda direita do "campinho regular" cinza mais escuro
    borderBottomColor: "#333", // cor da borda de baixo do "campinho regular"  cinza mais escuro
  },
  opened: {
    backgroundColor: "#999", // cor do fundo do "campinho" quando está aberto
    borderColor: "#777", // cor das bordas do "campinho" quando está aberto

    justifyContent: "center", // para mecher no alinhamento dos elementos/flex items no Eixo Principal/main axis(que nesse caso é a coluna/column) 
    alignItems: "center", // para mecher no alinhamento dos elementos/flex items no eixo cruzado/cross axis(que nesse caso é no eixo da linha/row) 
  },
  label: {
    fontWeight: "bold", // peso da fonte - bold/negrito
    fontSize: params.fontSize, // o tamanho da fonte vai ser a que definimos em params
  }
});

export default Field;