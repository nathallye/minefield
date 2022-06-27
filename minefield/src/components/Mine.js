import React from "react";
import { StyleSheet, View } from "react-native";

const Mine = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.coreMine} />
      <View style={styles.line} />
      <View style={[styles.line, { transform: [{ rotate: "45deg" }] }]} /> 
      <View style={[styles.line, { transform: [{ rotate: "90deg" }] }]} />
      <View style={[styles.line, { transform: [{ rotate: "135deg" }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // para mecher no alinhamento dos elementos/flex items no Eixo Principal/main axis(que nesse caso é a coluna/column) 
    alignItems: "center", // para mecher no alinhamento dos elementos/flex items no Eixo Principal/main axis(que nesse caso é a coluna/column) 
  },
  coreMine: {
    backgroundColor: "black", // cor de fundo do miolo/núcleo da mina

    justifyContent: "center", // para mecher no alinhamento dos elementos/flex items no Eixo Principal/main axis(que nesse caso é a coluna/column)
    alignItems: "center", // para mecher no alinhamento dos elementos/flex items no Eixo Principal/main axis(que nesse caso é a coluna/column) 

    height: 14, // altura do miolo/núcleo da mina
    width: 14, // largura do miolo/núcleo da mina
    borderRadius: 10, // para arredondar a borda
  },
  line: {
    backgroundColor: "black", // cor de fundo das linhas da mina

    position: "absolute", // vai centralizar com o miolo por conta das propriedades de alinhamento do container
    height: 3, // altura das linas da mina
    width: 20, // largura das linhas da mina
    borderRadius: 3, // as pontas das linhas da mina vão ser arredondadas 
  },
});

export default Mine;