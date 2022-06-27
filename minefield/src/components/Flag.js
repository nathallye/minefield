import React from "react";
import { StyleSheet, View } from "react-native";

const Flag = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.flagpole} />
      <View style={styles.flag} />
      <View style={styles.base1} />
      <View style={styles.base2} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2, // margem do topo do container
  },
  flagpole: {
    backgroundColor: "#222", // cor de fundo do mastro da bandeira

    position: "absolute", // posicionar o mastro da bandeira de acordo com o elemento pai(View container)
    height: 14, // altura do mastro da bandeira 
    width: 2, // largura do mastro da bandeira
    
    marginLeft: 9, // margem a esquerda do mastro da mandeira
  },
  flag: {
    backgroundColor: "#F22", // cor de fundo da bandeira

    position: "absolute", // posicionar a bandeira de acordo com o elemento pai(View container)
    height: 5, // altura da bandeira
    width: 6, // largura da bandeira
    
    marginLeft: 3, // margem a esquerda da bandeira
  },
  base1: {
    backgroundColor: "#222", // cor de fundo da base menor da bandeira
    
    position: "absolute", // posicionar a base1 da bandeira de acordo com o elemento pai(View container)
    height: 2, // altura da base1 da bandeira
    width: 6, // largura da base um da bandeira
    
    marginLeft: 7, // margem a esquerda da base1 da bandeira
    marginTop: 10, // margem ao topo da base1 da bandeira
  },
  base2: {
    backgroundColor: "#222", // cor de fundo da base maior da bandeira

    position: "absolute", // posicionar a base2 da bandeira de acordo com o elemento pai(View container)
    height: 2, // altura da base1 da bandeira
    width: 10, // largura da base1 da bandeira
    
    marginLeft: 5, // margem a esquerda da base2 da bandeira 
    marginTop: 12, // margem ao topo da base2 da bandeira
  },
});

export default Flag;