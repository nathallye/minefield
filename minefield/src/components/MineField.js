import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  console.log(props)
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c} 
        onOpen={() => props.onOpenField(r, c)} 
        onSelect={e => props.onSelectField(r, c)} />
    })
    return <View 
      key={r}
      style={{flexDirection: "row"}}>{columns}</View> // flexDirection: "row" por padrão o flex direction do RN é a coluna/column, e para organizar direitinho os campos em linha vamos aplicar essa propriedade
  })

  return (
    <View style={styles.container}>{rows}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
  } 
});

export default MineField;