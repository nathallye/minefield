# Projeto Campo Minado(minefild)

Construindo um aplicativo do jogo campo minado utilizando React Native.

![image]()

## Iniciando um projeto com a CLI(Command Line Interface) do React Native

- Dentro da pasta que desejamos criar o projeto, vamos executar o comando seguinte:

```
npx react-native init minefield
                      [nome-do-projeto]
```

- Concluindo a inicialização do projeto, vamos entrar na pasta do projeto criada e rodar o comando para inicializar o Metro Bundle(o qual vai compilar o JS e passar para o app conseguir renderizar):

```
npx react-native start
```

- Obs.: Antes de startar o android, é necessário se conectar a máquina virtual ao IP do emulador, rodando o comando abaixo:

```
adb connect 10.0.2.2:5555
```

- Vamos deixar rodando o Metro e abrir um novo terminal no diretório do projeto e realizar a instalação do Android:

```
yarn android ou npx react-native run-android
```

## Parâmetros do Jogo

- O jogo vai ter uns parâmetros importantes e por isso, na raíz do projeto iremos criar uma pasta chamada _src_ e nela iremos criar uma arquivo chamado _params.js_.
Nesse arquivo iremos trabalhar com as dimensões do dispositivo para saber a quantidade de colunas e linhas vamos conseguir colocar no dispositivo em questão, que irão gerar os campos que representam o tabuleiro do jogo. Vamos assumir um tamanho padrão para o campo, e a partir disso pelas dimensões do dispositivo conseguimos definir a quantidade que conseguimos colocar tanto no eixo x(linhas) quanto no eixo y(colunas).

- Então, nesse arquivo iremos importar a API _Dimensions_ do react native e em seguida, criar uma constante chamada _params_ que vai receber os parâmetros do jogo:

``` JS
import { Dimensions } from "react-native";

const params = {
  
}
```

- Lembrando que o objeto é uma constante, mas o que está dentro pode ser alterado, ou seja, os parâmetros serão passíveis de alteração. 
O primeiro parâmetro será o tamanho do bloco/_blockSize_ que o seu valor será 30; outro parâmetro será a largura da borda/_borderSize_ que vai receber o valor 5; o tamanho da fonte/_fontSize_ vai receber o valor 15:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
}
```

- Outro parâmetro será a proporção do cabeçalho/_headerRatio_ que vai ter a proporção de 15%(0.15) do tamanho da tela, e os 85% restante vai representar a área do jogo; e o nível de dificuldade/_difficultLevel_ vai ser um percentual sobre a quantidade de campos em tela e esses campos estarão com minas, e iniciar como 10%(0.10 - padrão fácil), ou seja, 10% dos campos estão com minhas no início do jogo, pode ser alterada futuramente:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
}
```

- Também teremos como parâmetro um método chamado _getColumnsAmount_ para calcular a quantidade colunas disponíveis baseado no tamanho do block/_blockSize_.
A constante largura/_width_ na qual iremos usar a API _Dimensions_ e o método get para pegarmos o tamanho da janela/_window_, nesse queremos a largura da janela então iremos usar o método _width_:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
  }
}
```

- E iremos dividir a largura/_width_ pelo tamanho do bloco/_this.blockSize_ e "em cima" do resultado dessa divisão vamos usar a função _Math.floor_ que irá arredondar o resultado para baixo.
E na frente de tudo, vamos usar o _return_ para que esse método _getColumnsAmount_ retorne o valor resultante:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
    return Math.floor(width / this.blockSize);
  }
}
```

- E iremos seguir os mesmos passos para criar o método chamado _getRowsAmount_ para calcular a quantidade linhas disponíveis baseado no tamanho do block/_blockSize_.
Só que nesse caso, como temos o tamanho que o cabeçalho irá ocupar/_headerRatio_ primeiramente iremos criar uma constante chamada altura total/_totalHeight_ na qual iremos usar a API _Dimensions_ e o método get para pegarmos o tamanho da janela/_window_, nesse queremos a altura da janela então iremos usar o método _height_:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
    return Math.floor(width / this.blockSize);
  },
  getRowsAmount() {
    const totalHeight = Dimensions.get("window").height;
  }
}
```

- Em seguida, vamos criar uma constante chamada altura do tabuleiro/_boardHeight_ a qual irá receber a altura total/_totalHeight_ multiplicado por 1 menos o valor do rodapé/_this.headerRatio_ o que irá resultar na altura restante da janela:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
    return Math.floor(width / this.blockSize);
  },
  getRowsAmount() {
    const totalHeight = Dimensions.get("window").height;
    const boardHeight = totalHeight * (1 - this.headerRatio);
  }
}
```

- Agora, iremos dividir a altura do tabuleiro/_boardHeight_ pelo tamanho do bloco/_this.blockSize_ e "em cima" do resultado dessa divisão vamos usar a função _Math.floor_ que irá arredondar o resultado para baixo.
E na frente de tudo, vamos usar o _return_ para que esse método _getRowsAmount_ retorne o valor resultante:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
    return Math.floor(width / this.blockSize);
  },
  getRowsAmount() {
    const totalHeight = Dimensions.get("window").height;
    const boardHeight = totalHeight * (1 - this.headerRatio);
    return Math.floor(boardHeight / this.blockSize);
  }
}
```

- Feito isso, vamos exportar por padrão/_export default_ o objeto _params_:

``` JS
import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15,
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
    return Math.floor(width / this.blockSize);
  },
  getRowsAmount() {
    const totalHeight = Dimensions.get("window").height;
    const boardHeight = totalHeight * (1 - this.headerRatio);
    return Math.floor(boardHeight / this.blockSize);
  }
}


export default params;
```

- E dentro do componente baseado em classe _App.js_ vamos importar os parâmetros/_params_:

``` JS
import React, {Component} from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        
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
})
```

- E em seguida, vamos exibir em tela a quantidade de linhas/_getRowsAmount_ e de colunas/_getColumnsAmount_ que o dispositivo suporta:

``` JS
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
```

## Componente Campo/Field #01

- Dentro de src vamos criar uma pasta chamada _components_ e dentro dela vamos criar o componente funcional Campo/_Field_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

const Field = (props) => {
  return (
    <View>

    </View>
  );
}

export default Field;
```

- Inicialmente, iremos criar uma constante chamada _styleField_, que vai receber os estilos que iremos aplicar ao campo. O estilo padrão vai se chamar _field_(iremos criar esse objeto de estilo com o StyleSheet mais a frente):

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

const Field = (props) => {

  const styleField = [styles.field];

  return (
    <View style={styleField}>

    </View>
  );
}

export default Field;
```

- Em seguida, iremos realizar a verificação se o array _styleField_ tiver apenas um elemento, vai ser empurrado/_push_ para dentro dele o estilo _regular_(iremos criar esse objeto de estilo com o StyleSheet mais a frente):

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

const Field = (props) => {

  const styleField = [styles.field];
  // vão haver outras consições para aplicação de estilo aqui(se o campo aberto, explodido) e caso passe por todos sem cair na condição siginifica que campinho tá regular
  if (styleField.length === 1) return styleField.push(styles.regular);

  return (
    <View style={styleField}>

    </View>
  );
}

export default Field;
```

- Agora, vamos criar os objetos de estilos _field_ e _regular_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

const Field = (props) => {

  const styleField = [styles.field];
  if (styleField.length === 1) return styleField.push(styles.regular);

  return (
    <View style={styleField}>

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
});

export default Field;
```

- Feito isso, vamos importar o componente Campo/_Field_ dentro do componente principal(App) e em seguida referenciá-lo para visualizarmos em tela:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <Field />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // [...]
})
```

## Componente Campo/Field #02

- Vamos esperar receber de props três atributos: primeiro _mined_ ou seja, se está minado ou não; _opened_ se o campo está aberto ou não; e _nearMines_ para sabermos quantas minhas temos ao redor do campo.
Vamos usar o destructuring para receber esses valores de _props_ e armazenar em constantes com seus respectivos nomes:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

const Field = (props) => {
  const { mined, opened, nearMines } = props;

  const styleField = [styles.field];
  if (styleField.length === 1) styleField.push(styles.regular);

  return (
    <View style={styleField}>
      
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Em seguida, vamos adicionar mais uma verificação para aplicação de estilo. No caso, se o campo tiver o atributo _opened_ verdadeiro/_true_, ou seja, tiver aberto, vamos empurrar/_push_ para dentro do array _styleField_ o objeto de estilo _opened_(iremos criar esse objeto de estilo com o StyleSheet mais a frente):

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import params from "../params";

const Field = (props) => {
  const { mined, opened, nearMines } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (styleField.length === 1) styleField.push(styles.regular);

  return (
    <View style={styleField}>
      
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Dando continuidade, antes do _return_ do JSX do componente iremos fazer uma condicional de aplicação de cores "em cima" do número de minas presentes dentro da propriedade _nearMines_.
Primeiramente vamos criar uma variável chamada _color_ que inicialmente vai ser _null_ e em seguida iremos primeiro verificar se a quantidade de minas perto campo/_nearMines_ é maior que 0 e se passar aí sim é feita as demais verificações e aplicar cores ao _color_ de acordo com a quantidade de minas/_nearMines_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

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
      
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Em seguida, vamos importar o componente _Text_ do react native e referenciá-lo para exibirmos a quantidade de minas. Só que iremos exibir esse texto de forma condicional... a primeira verificação será que _mined_ seja falso(!mined ou seja, se for falso o ! vai tornar em true e vai passar na condição), ou seja, o campo não pode estar minado, pois se estiver minado no lugar do número terá uma mina:

``` JSX
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
      {!mined}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- A segunda condição vai ser se o campo está aberto, ou seja, _opened_ true.
E a terceira condição é que a quantidade de minas ao redor do campo _nearMines_ tem que ser maior que 0:

``` JSX
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
      {!mined && opened && nearMines > 0}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Se todas as condições forem verdadeiras(?) então será renderizado um _Text_ interpolado com a quantidade de minas _nearMines_ que recebemos via props e o seu _style_ vai ser _styles.label_(iremos criar esse objeto de estilo com o StyleSheet mais a frente) e a cor/_color_ vai ser exatamente a cor que foi inferida através da quantidade de minas. E se alguma condição for falsa(:) iremos retornar _false_:

``` JSX
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
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>) // parênteses opcional 
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Em seguida, iremos criar os objetos de estilo _opened_ e _label_:

``` JSX
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
  field: { 
    height: params.blockSize, 
    width: params.blockSize, 
    borderWidth: params.borderSize, 
  },
  regular: {
    backgroundColor: "#999", 
    borderLeftColor: "#CCC",
    borderTopColor: "#CCC", 
    borderRightColor: "#333", 
    borderBottomColor: "#333", 
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
```

- Feito isso, dentro do componente _App_ vamos criar outras referênciar do Campo/_Field_ e passar via props os atributos _opened_ e _nearMines_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <Field />
        <Field opened />
        <Field opened nearMines={1} />
        <Field opened nearMines={2} />
        <Field opened nearMines={3} />
        <Field opened nearMines={4} />
        <Field opened nearMines={5} />
        <Field opened nearMines={6} />
        <Field opened nearMines={7} />
        <Field opened nearMines={8} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // [...]
})
```

## Componente Mina/Mine

- Dentro de src/components vamos criar o componente funcional Mina/_Mine_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

const Mine = (props) => {
  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
})

export default Mine;
```

- Dentro da _View_ container vamos inserir uma outra View que vai representar o miolo/núcleo da mina e iremos aplicar o objeto de estilo _coreMine_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

const Mine = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.coreMine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  coreMine: {

  },
})

export default Mine;
```

- E outras _View_ que irão representar as "linhas" ao redor da mina, a primeira irá receber apenas o objeto de estilo _line_(essa vai ser a linha horizontal) e as demais irão receber o objeto de estilo _line_ e mais as propriedades que irão rotacionar(45°, 90° e 135°) essas linhas:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

const Mine = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.coreMine} />
      <View style={styles.line} /> {/*horizontal*/}
      <View style={[styles.line, { transform: [{ rotate: "45deg" }] }]} /> {/*diagonal*/}
      <View style={[styles.line, { transform: [{ rotate: "90deg" }] }]} /> {/*vertical*/}
      <View style={[styles.line, { transform: [{ rotate: "135deg" }] }]} /> {/*diagonal*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  coreMine: {

  },
  line: {

  },
})

export default Mine;
```

- Agora, iremos aplicar as propriedades nos objetos de estilos _container_, _coreMine_ e _line_:

``` JSX
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
})

export default Mine;
```

- Feito isso, dentro do componente Campo/_Field_ vamos importar o componente Mina/_Mine_:

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";

const Field = (props) => {
  const { mined, opened, nearMines } = props;

  // [...]

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- E além das propriedades _mined_, _opened_ e _nearMines_ vamos também esperar receber via props o _exploded_ para saber se o campo está ou não explodido.
E iremos realizar a verificação se _exploded_ foi passado como props para o campo, se verdadeiro iremos empurrar o estilo _exploded_(iremos criar esse objeto de estilo com o StyleSheet mais a frente) para o array de estilos _styleField_:

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";

const Field = (props) => {
  const { mined, opened, nearMines, exploded } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
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
  // [...]
});

export default Field;
```

- E agora, iremos inserir uma renderização condicional para exibir ou não a Mina/_Mine_, pois só iremos exibir caso as props _mined_(campo está minado) e(&&) _opened_(campo está aberto) tenham sido passadas para o Campo/_Field_:

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";

const Field = (props) => {
  const { mined, opened, nearMines, exploded } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
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

      {mined && opened
      ? (<Mine />)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Dando continuidade vamos criar o objeto de estilo _exploded_:

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";

const Field = (props) => {
  const { mined, opened, nearMines, exploded } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
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

      {mined && opened
      ? (<Mine />)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
  label: {
    fontWeight: "bold", 
    fontSize: params.fontSize, 
  },
  exploded: {
    backgroundColor: "red", // quando a mina explodir a cor de fundo do campo vai ficar vermelha
    borderColor: "red", // e a borda também
  }
});

export default Field;
```

- E agora, voltando no componente _App_ além de ter componente os Campo/_Field_ com as props _opened_(aberto) e _nearMines_(com o número de minas ao redor).
Também vamos inserir componentes _Field_ um com a propriedade _mined_(minado); outro _mined_(minado) e _opened_(aberto); e por fim _mined_(minado), _opened_(aberto) e _exploded_(explodiu):

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <Field />
        <Field opened />
        <Field opened nearMines={1} />
        <Field opened nearMines={2} />
        <Field opened nearMines={3} />
        <Field opened nearMines={4} />
        <Field opened nearMines={5} />
        <Field opened nearMines={6} />
        <Field opened nearMines={7} />
        <Field opened nearMines={8} />
        <Field mined />
        <Field mined opened />
        <Field mined opened exploded/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // [...] 
})
```

## Componente Bandeira/Flag #01

- Dentro de src/components vamos criar o componente funcional Bandeira/_Flag_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

const Flag = (props) => {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
});

export default Flag;
```

- E para desenhar a bandeira vamos separar em vários componentes _View_(dentro da View container) que cada um vai desenhar uma parte da bandeira. 
A primeira _View_ vai receber o objeto de estilo mastro/_flagpole_, a segunda vai receber o objeto de estilo _flag_ que vai ser a própria bandeira e a terceira vai receber o estilo _base1_ que vai ser responsável pela base menor e a quarta vai receber o objeto _base2_ que será a base maior da bandeira:

``` JSX
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

  },
  flagpole: {

  },
  flag: {

  },
  base1: {

  },
  base2: {

  },
});

export default Flag;
```

- Agora, vamos aplicar as propriedades nos objetos de estilo _container_, _flagpole_, _flag_, _base1_ e _base2_:

``` JSX
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
    
    marginLeft: 9, // margem a esquerda do mastro da bandeira
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
```

- Feito isso, no componente Campo/_Field_ vamos importar o componente Bandeira/_Flag_:

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";
import Flag from "./Flag";

const Field = (props) => {
  const { mined, opened, nearMines, exploded } = props;

  // [...]

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>)
      : (false)}

      {mined && opened
      ? (<Mine />)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- E além das propriedades _mined_, _opened_, _nearMines_ e _exploded_ vamos também esperar receber via props o _flagged_ para saber se o campo está marcado com uma bandeira.
E iremos realizar a verificação se _flagged_ foi passado como props para o campo, se verdadeiro iremos empurrar o estilo _flagged_ para o array de estilos _styleField_:

``` JSX 
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";
import Flag from "./Flag";

const Field = (props) => {
  const { mined, opened, nearMines, exploded, flagged } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
  if (flagged) styleField.push(styles.flagged);
  if (styleField.length === 1) styleField.push(styles.regular);

  // [...]

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>)
      : (false)}

      {mined && opened
      ? (<Mine />)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- Também iremos realizar uma alteração na lógica para aplicar o estilo _regular_ quando o campo receber a propriedade _flagged_(o campo "bandeirado" por padrão vai precisar estar fechado), ou seja, quando não receber _!opened_ e(&&) _!exploded_:

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";
import Flag from "./Flag";

const Field = (props) => {
  const { mined, opened, nearMines, exploded, flagged } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
  if (flagged) styleField.push(styles.flagged);
  if (!opened && !exploded) styleField.push(styles.regular);

  // [...]

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>)
      : (false)}

      {mined && opened
      ? (<Mine />)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [...]
});

export default Field;
```

- E agora, iremos inserir uma renderização condicional para exibir ou não a Bandeira/_Flag_, pois só iremos exibir caso a prop _flagged_(compo está com bandeira) tenha sido passada para o Campo/_Field_ e(&&) campo não esteja aberdo, ou seja, _opened_ seja falso((_!opened_ ou seja, se for falso o ! vai tornar em true e vai passar na condição):

``` JSX
import React from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Mine from "./Mine";
import Flag from "./Flag";

const Field = (props) => {
  const { mined, opened, nearMines, exploded, flagged } = props;

  const styleField = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
  if (flagged) styleField.push(styles.flagged);
  if (!opened && !exploded) styleField.push(styles.regular);

  let color = null;
  if (nearMines > 0) {
    if (nearMines === 1) color = "#2A28D7";
    if (nearMines === 2) color = "#2B520F";
    if (nearMines > 2 && nearMines < 6) color = "#F9060A";
    if (nearMines >= 6) color = "#F221A9";
  }

  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 
      ? (<Text style={[styles.label, { color: color }]}>{nearMines}</Text>)
      : (false)}

      {mined && opened
      ? (<Mine />)
      : (false)}

      {flagged && !opened
      ? (<Flag />)
      : (false)}
    </View>
  );
}

const styles =  StyleSheet.create({
  // [..]
});

export default Field;
```

- Agora, voltando no componente _App_ vamos exibir o componente Campo/_Field_ passando _flagged_(marcado com a bandeira):

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <Field />
        <Field opened />
        <Field opened nearMines={1} />
        <Field opened nearMines={2} />
        <Field opened nearMines={3} />
        <Field opened nearMines={4} />
        <Field opened nearMines={5} />
        <Field opened nearMines={6} />
        <Field opened nearMines={7} />
        <Field opened nearMines={8} />
        <Field mined />
        <Field mined opened />
        <Field mined opened exploded/>
        <Field flagged />
        <Field flagged opened /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // [...]
})
```

## Componente Bandeira/Flag #02

- Vamos alterar o componente _Flag_ para receber a propriedade _bigger_ que vai representar a bandeira grande que será responsável pelo modal onde iremos selecionar o nível de dificuldade do jogo.
Primeiramente, vamos criar os objetos de estilo _flagpoleBigger_, _flagBigger_, _base1Bigger_ e _base2Bigger_:

``` JSX
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
  // [...]
  flagpoleBigger: {
    height: 28,  // altura do mastro da bandeira maior
    width: 4, // largura do mastro da bandeira maior

    marginLeft: 16, // margem a esquerda do mastro da bandeira maior
  },
  flagBigger: {
    height: 10, // altura da bandeira maior
    width: 14, // largura da bandeira maior

    marginLeft: 3, // margem a esquerda da bandeira maior
  },
  base1Bigger: {
    height: 4, // altura da base1 da bandeira maior
    width: 12, // largura da base1 um da bandeira maior
    
    marginLeft: 12, // margem a esquerda da base1 da bandeira maior
    marginTop: 20, // margem ao topo da base1 da bandeira maior
  },
  base2Bigger: {
    height: 4, // altura da base2 da bandeira maior
    width: 20, // largura da base2 um da bandeira maior
    
    marginLeft: 8, // margem a esquerda da base2 da bandeira maior
    marginTop: 24, // margem ao topo da base2 da bandeira maior
  },
});

export default Flag;
```

- Agora, vamos adicionar de forma condicional os estilos Bigger para as View(que são responsáveis por desejar a bandeira) caso seja passado via props o _bigger_ para o componente _Flag_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

const Flag = (props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.flagpole, props.bigger ? (styles.flagpoleBigger) : (null)]} />
      <View style={[styles.flag, props.bigger ? (styles.flagBigger) : (null)]} />
      <View style={[styles.base1, props.bigger ? (styles.base1Bigger) : (null)]} />
      <View style={[styles.base2, props.bigger ? (styles.base2Bigger) : (null)]} />
    </View>
  )
}

const styles = StyleSheet.create({
  // [...]
});

export default Flag;
```

## Lógica do Jogo #01

- Vamos criar um arquivo em que ele irá conter várias funções com a lógica do jogo, para deixar tudo mais organizado. 
Dentro de src vamos criar um arquivo chamado lógica/_logic_. 
E dentro dele, iremos criar três funções: a primeira função que vai ser responsável por criar o tabuleiro/_board_; a segunda será responsável por espalhar as minas dentro do tabuleiro; e a última irá chamar tanto a função que criou o tabuleiro/_board_ quanto a função que espalha as minas para criar o tabuleiro com as minas.

- Vamos criar a função _createBoard_ a qual irá receber como parâmentro a quantidade de linhas/_rows_ e colunas/_columns_ que queremos nesse tabuleiro:

``` JS
const createBoard = (rows, columns) => {
  
}
```

- Em seguida, essa função vai retornar a criação de um _Array_ com o número de posições de acordo com o que foi passado no atributo _rows_, onde método _fill_ vai atribuir valores zerados a todas as posições desse array:

``` JS
const createBoard = (rows, columns) => {
  return Array(rows).fill(0)
}
```

- E com isso, vamos conseguir utilizar o método _map_ para percorrer todas as posições desse Array criado. Onde vamos ignorar o primeiro atributo, que nesse caso é o próprio elemento, como ele é zero, vamos ignorar colocando o simbolo underline; e vamos pegar o segundo atributo que é o indice de cada elemento que iremos percorrer, o qual iremos chamar de _row_:

``` JS
const createBoard = (rows, columns) => {
  return Array(rows).fill(0).map((_, row) => )
}
```

- E para finalizar o _map_ nesse primeiro array vamos passar a função callback para ele o qual irá repetir todo esse processo só que criando um Array com o número de _columns_ passada como atributo para a função:

``` JS
const createBoard = (rows, columns) => {
  return Array(rows).fill(0).map((_, row) => {
    return Array(columns).fill(0).map((_, column) => {
      
    })
  })
}
```

- E na função callback desse segundo _map_ iremos retornar um objeto com os atributos _row_(esse atributo vai receber o valor de _row_ que capturamos através do map) e _column_(esse atributo vai receber o valor de _column_ que capturamos através do map):

``` JS
const createBoard = (rows, columns) => {
  return Array(rows).fill(0).map((_, row) => {
    return Array(columns).fill(0).map((_, column) => {
      return {
        row, // mesmo que row: row(chave: valor), mas como ambos tem o mesmo nome podemos usar a forma simplificada 
        column, // mesmo que column: column(chave: valor), mas como ambos tem o mesmo nome podemos usar a forma simplificada 
      }
    })
  })
}
```

- Além disso, nesse objeto iremos ter o demais atributos: aberto/_opened_, marcação de bandeira/_flagged_, minado/_mined_ e se explodiu/_exploded_ todos recebendo o valor booleano false/_false_. Além disso, a quantidade de minas/_nearMines_ iniciando com 0:

``` JS
const createBoard = (rows, columns) => {
  return Array(rows).fill(0).map((_, row) => {
    return Array(columns).fill(0).map((_, column) => {
      return {
        row,
        column, 
        opened: false,
        flagged: false,
        mined: false,
        exploded: false,
        nearMines: 0
      }
    })
  })
}
```

- Tudo isso porque, esse é um objeto que vai está associado com cada um dos campos do campo minado, e a partir dessa matriz(array de arrays) que vai conter vários objetos(com número da linha que ele tá, número da coluna, se tá aberto...) vamos saber os dados de cada campo.

- Em seguida, vamos criar a segunda função espalhar minas/_spreadMines_ e ela irá receber os atributos tabuleiro/_board_ que foi criado a partir da função _createBoard_ e a quantidade de minas/_minesAmount_ que queremos espalhar usando essaf função:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  

}
```

- E dentro da função vamos pegar a quantidade de linhas e colunas de acordo com o tabuleiro criado:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const column = board[0].length; // dentro de um dos arrays do board temos o tamanho de colunas
}
```

- Vamos pegar também a quantidade de minas plantadas/_minesPlanted_ iniciando com 0:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const column = board[0].length; 
  let minesPlanted = 0;
}
```

- O próximo passo é fazer um _while_ que irá testar enquanto a quantidade de minas plantadas/_minesPlanted_ for menor que a quantidade de minas que queremos espalhar dentro do campo/_minesAmount_ continue:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const column = board[0].length; 
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    
  }
}
```

- Dentro do _while_ vamos precisar selecionar qual é a linha e coluna que queremos plantar a mina, e para isso vamos usar o _Math.random_ para "sortear".
A constante linha selecionada/_rowSel_ vai receber um _parseInt_(para converter o resultado em número inteiro) "em cima" de _Math.random_ multiplicado pelas linhas/_rows_(para gerar um valor o qual o valor máximo será o número de linhas) na base 10:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const column = board[0].length; 
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = parseInt(Math.random() * rows, 10);
    
  }
}
```

- E o mesmo iremos fazer para selecionar uma coluna:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const column = board[0].length; 
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = parseInt(Math.random() * rows, 10);
    const columnSel = parseInt(Math.random() * column, 10);
  }
}
```

- Em seguida, iremos verificar se já há uma mina dentro do campo selecionado(de acordo com a linha/_rowSel_ e coluna/_columnSel_ sorteadas) e se passar aí sim iremos "plantar" a bomba e incrementar + 1 no numero de minas plantadas/_minesPlanted_:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const column = board[0].length; 
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = parseInt(Math.random() * rows, 10);
    const columnSel = parseInt(Math.random() * column, 10);

    if (!board[rowSel][columnSel].mined) { // o campo não está minado
      board[rowSel][columnSel].mined = true; // aí sim plantamos a bomba nesse campo
      minesPlanted += 1;
    }
  }
}
```

- Feito isso, por fim, iremos criar a função _createMinedBoard_ que irá criar o tabuleiro com as minas plantadas.
Essa função, irá receber como atributos a quantidade de linhas/_rows_, de colunas/_columns_ e e de minas que queremos plantar/_minesAmount_:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  // [...]
  }
}

const createMinedBoard = (rows, columns, minesAmount) => {

}
```

- E dentro dessa função iremos criar o tabuleiro/_board_ chamando a função _creatBoard_ passando o número de linhas/_rows_ e colunas/_columns_ para ela:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  // [...]
}

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
}
```

- Em seguida, iremos chamar a função para espalhar as minas/_spreadMines_ e iremos passar como parâmetro para ela o tabuleiro que criamos/_board_ e o número de minas/_minesAmount_ que queremos espalhar pelo tabuleiro:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  // [...]
}

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
}
```

- Por fim, iremos retornar o tabuleiro/_board_ já com as minas plantadas e para que seja possível usar essa função _createMinedBoard_ fora do seu arquivo vamos exportá-la:

``` JS
const createBoard = (rows, columns) => {
  // [...]
}

const spreadMines = (board, minesAmount) => {
  // [...]
}

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
}

export { createMinedBoard };
```

## Componente Tabuleiro/MineField 

- Dentro de src/components vamos criar o componente funcional _MineField_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  return (
    <View>

    </View>
  );
}

const styles = StyleSheet.create({

});

export default MineField;
```

- Vamos uma constante chamada linhas/_rows_ que esperar receber via props o tabuleiro/_board_ e nele vamos utilizar o método _map_ o qual irá pegar o elemento/_row_ e o indice/_r_ de cada elemento e a função callback desse map vai receber a const colunas/_columns_ que vai receber _row.map_ qiue vai pecorrer cada campo/_field_ e o seu indice/_c_, ou seja, dentro das linhas vamos ter os campos:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      
    })
  })

  return (
    <View>

    </View>
  );
}

const styles = StyleSheet.create({

});

export default MineField;
```

- E na função callback do segundo _map_ vamos transformar cada campo/_field_ em um componente JSX.
Vamos retornar o componente _Field_ passando para ele via props o objeto _field_(tem todos os atributos -row, column, opened, flagged, mined- que passamos no arquivo logic para ele na função _creatBoard_).
E também o atributo key passando como valor o indice/_c_ de cada _field_, pois sempre que retornamos um array de elementos JSX, a chave é importante:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c} />
    })
  })

  return (
    <View>

    </View>
  );
}

const styles = StyleSheet.create({

});

export default MineField;
```

- Uma vez que a const _columns_ armazena todos os campos/_fields_ de uma linha/_row_, podemos retornar uma _View_ que vai encapsular todas os campos/colunas/_fields_ de uma mesma linha:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c} />
    })
    return <View key={r}>{columns}</View>
  })

  return (
    <View>

    </View>
  );
}

const styles = StyleSheet.create({

});

export default MineField;
```

- Agora, no retorno da _View_ do componente _MineField_ vamos encapsular essa constante _rows_ criada acima.
Aplicando e criando o objeto de estilo _container_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  const rows = props.board.map((row, r) => { // percorre as linhas do board
    const columns = row.map((field, c) => { // percorre as colunas de cada linha do board, que já são os próprios campos
      return <Field {...field} key={c} />
    })
    return <View key={r}>{columns}</View>
  })

  return (
    


  container: {
    backgroundColor: "#EEE",
    flexDirection: "row", // por padrão o flex direction do RN é a coluna/column
  } 
});

export default MineField;
```

- Salvando o _MineField_ temos o componente pronto e agora vamos precisar usá-lo dentro do componente _App_. 
Olhando para o componente _MineField_ pronto, notamos que precisamos passar algumas informações para ele funcionar, que no caso é o tabuleiro/_board_ e para criar o _board_ (através da função _createBoard_) precisamos fornecer três dados: quantidade delinhas/_rows_, quantidade de colunas/_columns_ e o número de minas que queremos espalhar no tabuleiro/_minesAmount_. 
Se olharmos, já temos essas informações da quantidade de _rows_ e _columns_ a partir dos métodos criados(_getColumnsAmount()_ e _getRowsAmount()_) e a quantidade de minas a partir do percentual de difuculdade passado/_difficultLevel_ dentro do arquivo _params_.
E esse trabalho de pegar esses valores de _params_, calcular e chamar o componente _MineField_ vai acontecer dentro do componente _App_.

- Para isso, dentro do componente _App_ vamos importar o _MinedField_ e a função responsável por criar o tabuleiro/_createMinedBoard_ de dentro do arquivo _logic_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";
import MineField from "../components/MineField";

import { 
  createMineBoard 
} from "../params";

export default class App extends Component {
  render() {
    return (
      // [...]
    );
  }
}

const styles = StyleSheet.create({
  container: {
  // [...]
})
```

- Agora, vamos criar duas funções. 
A primeira função _minesAmount_ vai ser responsável por calcular a quantidade de minas que estará presente no tabuleiro, ela vai conter uma const chamada _rows_ que vai receber o método _getRowsAmount()_(que calcula a quantidade de rows a partir do modelo do aparelho) de dentro de _params_ e outra const chamada _columns_ que vai receber o método _getColumnsAmount()_(que calcula a quantidade de columns a partir do modelo do aparelho) de dentro de _params_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";
import MineField from "../components/MineField";

import { 
  createMineBoard 
} from "../params";

export default class App extends Component {

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
  }

  render() {
    return (
      // [...]
    );
  }
}

const styles = StyleSheet.create({
  // [...]
})
```

- E para calcular a quantidade de minas a serem espalhadas nesse tabuleiro, vamos retornar/_return_ através do método _Math.ceil_ a multiplicação do número de linhas/_rows_ e colunas/_columns_(que vai dá exatamente a quantidade de campos) pelo percentual de dificuldade/_difficultLevel_ diretamente de _params_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";
import MineField from "../components/MineField";

import { 
  createMineBoard 
} from "../params";

export default class App extends Component {

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(rows * columns * params.difficultLevel);
  }

  render() {
    return (
      // [...]
    );
  }
}

const styles = StyleSheet.create({
  // [...]
})
```

- E a segunda função _createState_ será responsável pelo estado do componente.
Dentro dessa função, assim como a anterior teremos constantes com a quantidade de linhas/_rows_ e colunas/_columns_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";
import MineField from "../components/MineField";

import { 
  createMineBoard 
} from "../params";

export default class App extends Component {

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(rows * columns * params.difficultLevel);
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
  }

  render() {
    return (
      // [...]
    );
  }
}

const styles = StyleSheet.create({
  // [...]
});
```

- Em seguida, essa função vai retornar/_return_ um objeto, que por enquanto ele vai conter um único atributo que vai ser o tabuleiro/_board_(matriz composta pelos objetos com o estado de cada um dos campos do jogo -row, column, opened, flagged, mined, exploded, nearMines-). Dentro do atributo iremos chamar a função que irá criar o tabuleiro/_createMinedBoard_ passando para ela o número de linhas/_rows_, número de colunas/_columns_ e o número de minas que o valor calculado é retornado através da função _minesAmount()_ :

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";
import MineField from "../components/MineField";

import { 
  createMineBoard 
} from "../params";

export default class App extends Component {

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(rows * columns * params.difficultLevel);
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMineBoard(rows, columns, this.minesAmount()),
    }
  }

  render() {
    return (
      // [...]
    );
  }
}

const styles = StyleSheet.create({
  // [...]
});
```

- Dando continuidade, vamos criar o construtor chamar o resultado da função que cria o estado _this.createState()_ a partir _this.state_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import Field from "../components/Field";
import MineField from "../components/MineField";

import { 
  createMinedBoard 
} from "../params";

export default class App extends Component {

  constructor(props) {
    super(props)
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
      board: createMinedBoard(rows, columns, this.minesAmount())
    }
  }

  render() {
    return (
      // [...]
    );
  }
}

const styles = StyleSheet.create({
  // [...]
});
```

- Agora, vamos remover as referências ao componente _Field_, e no lugar vamos inserir uma nova _View_ e dentro dela vamos inserir o componente _MineField_ e vamos enviar via props para o atributo _board_ o objeto _this.state.board_:

``` JSX
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";

import params from "../params";

import MineField from "../components/MineField";

import { 
  createMinedBoard 
} from "../logic";

export default class App extends Component {

  constructor(props) {
    super(props)
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
      board: createMinedBoard(rows, columns, this.minesAmount())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Minefield</Text>
        <Text>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
          
        <View style={styles.board}>
          <MineField board={this.state.board}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // [...]
});
```

- E vamos limpar os estilos anteriores e criar algo mais enxuto, já que não estamos mais usando o _Field_:

``` JSX
import React from "react";
import { StyleSheet, View } from "react-native";

import Field from "./Field";

const MineField = (props) => {
  console.log(props)
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c} />
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
```

## Lógica do Jogo #02

- A partir de determinado campo, precisamos descobrir seus vizinhos e para isso vamos pegar a linha do elemento, subtrair um para pegar o elemento da frente e somar um para pegar o elemento de trás, por exemplo linha 3 fica assim [2, 3, 4] e o mesmo será feito para a coluna, e juntando tudo dá nove pares ou seja, 8 vizinhos.

- Vamos voltar para o arquivo _logic_ e por enquanto nele temos apenas uma única função sendo exportada, que é a função que cria um tabuleiro minado/_createMinedBoard_.
Agora, vamos compementar esse arquvio com outras funções que dizem respeito a lógica do jogo.

- Primeiro vamos criar uma função que é responsável por clonar um tabuleiro/_cloneBoard_, essa função vai receber como parâmetro um tabuleiro/_board_ e vamos gerar um clone a partir dele. E para fazer isso, vamos fazer um _map_ emcima do _board_ que irá percorrer as linhas/_rows_ e em cima delas vamos fazer um novo _map_ o que irá percorrer cada campo/_field_ e para cada compo/_field_ iremos retornar um novo objeto usando o operador _spreed_ para clonar o campo/_field_:

``` JS
// [...]

const cloneBoard = (board) => {
  return board.map(rows => {
    return rows.map(field => {
      return { ... field };
    })
  })
}

export { createMinedBoard };
```

É importante clonar o tabuleiro/_board_, pois sempre que vamos mecher no estado de um componente usando React não mechemos diretamente na referência do objeto e sim vamos gerando novos objetos, que é a evolução do estado. E vamos chegar na situação que vários componentes vão referênciar determinado dado(estado compartilhado entre multiplos componentes) e mudar o estado de um componente pode gerar um impacto em outro que não queremos, então usar princípios funcionais é interesante para que tenha um desaclopamento maior do dado.

- Em seguida, vamos criar a função que vai "pegar" os vizinhos/_getNeighbors_, e essa função irá receber o tabuleiro/_board_, além disso, irá receber a linha/_row_ e a coluna/_column_ onde está localizado o campo que queremos verificar a vizinhança:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  
}

export { createMinedBoard };
```

- Dentro dessa função, iremos criar a const vizinhos/_neighbords_ que irá receber um array vazio.
Também iremos criar a const linhas/_rows_ que vai receber um array com as linhas dos possivéis vizinhos(para descobrir os vizinhos vamos pegar a linha do elemento, subtrair um para pegar o elemento da frente e somar um para pegar o elemento de trás):

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
}

export { createMinedBoard };
```

- E iremos fazer a mesma coisa para pegar as colunas/_columns_:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
}

export { createMinedBoard };
```

- Dessa forma, temos 9 possibilidades de vizinhos, então temos que excluir o próprio nó/campo e os que estão fora dos limites da matriz.
Para isso, vamos fazer um _forEach_ "em cima" das linhas/_rows_ para percorrer cada linha/_row_ e em cada linha vamos fazer outro _forEach_ nas colunas/_coluns_ e desse modo vamos acessar cada campo. E para cada campo vamos fazer alguns testes:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  
  rows.forEach(r => {
    columns.forEach(c => {
      
    })
  })
}

export { createMinedBoard };
```

- Vamos criar uma const _diferent_ a qual irá receber um valor booleano de acordo com a verificação da condição: se _r_ for diferente(!==) da _row_ passada no parâmetro da função ou(||) _c_ for diferente da _column_ passada como parâmetro da função o valor vai ser _true_(se pelo menos um dos dois forem direntes significa que não estamos tratando do campo em questão), senão recebe _false_:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  
  rows.forEach(r => {
    columns.forEach(c => {
      const diferent = r !== row || c !== column;
    })
  })
}

export { createMinedBoard };
```

- A outra validação vai ser para sabermos se temos um linha válida. E para isso, vamos criar uma constante chamada _validRow_ a qual irá receber um valor booleano de acordo com a verificação da condição: _r_ maior ou igual a(>=) _0_ e(&&) _r_ ser menor(<) do que o tamanho do tabuleiro/_board.length_:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  
  rows.forEach(r => {
    columns.forEach(c => {
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
    })
  })
}

export { createMinedBoard };
```

- E iremos seguir a mesma lógica para verificar se temos uma coluna/_column_ válida:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  
  rows.forEach(r => {
    columns.forEach(c => {
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length; // pegando o tamanho da primeira linha temos a quantidade de colunas
    })
  })
}

export { createMinedBoard };
```

- Em seguida, vamos verificar se/_if_ se todas as constantes/condicionais são verdadeiras/_true_ significa que podemos adicionar/empurrar/_push_ o campo/_board_ em questão ao array de vizinhos/_neighbors_.
E no final da função vamos retornar esse array de vizinhos/_neighbors_ como resultado:

``` JS
// [...]

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  
  rows.forEach(r => {
    columns.forEach(c => {
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length; 

      if (diferent && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    })
  })
  return neighbors;
}

export { createMinedBoard };
```

- A próxima função que vamos criar é para saber se a vizinhança é segura/_safeNeighborhood_, e essa função irá receber o tabuleiro/_board_, além disso disso, irá receber linha/_row_ e a coluna/_column_ onde está localizado o campo que queremos verificar se a vizinhança é segura:

``` JS
// [...]

const safeNeighborhood = (board, row, column) => {
  
}

export { createMinedBoard };
```

- E uma vez que temos a linha e a coluna, conseguimos encontrar os vizinhos e "em cima" dos vizinhos vamos verificar se eles tem ou não tem mina. E para isso vamos criar uma função que ela vai ser responsável por usar o método _reduce_ para calcular e saber se determinada vizinhanção é segura ou não.
Vamos criar uma função chamada segura/_safes_ e ela vai receber como parâmetro o resultado/_result_ que vai ser um totalizador e o vizinho atual/_neighbor_ que estamos percorrendo dentro do reduce:

``` JS
// [...]

const safeNeighborhood = (board, row, column) => {
  const safes = (result, neighbor) => 
}

export { createMinedBoard };
```

- E essa função vai pegar o resultado e vai fazer a lógica para verificar se o vizinho não está minado/_!neighbor.mined_. Se o vizinho não estiver minado o resultado é _true_ e vai ser feita uma operação de e(&&), vai pegar o resultado atual/_result_ e o resultado se o vizinho não está minado, de tal forma se um dos vizinhos que forem verificados estiver minado todo resultado de _safes_ vai ser _false_, ou seja, não é seguro(tudo isso usando a lógica do reduce, que serve para iterar sobre um array e utilizar o valor de cada item para criar um objeto final com base em alguma regra. Como o próprio nome sugere, ela “reduz” os itens de um vetor a um valor único.):

``` JS
// [...]

const safeNeighborhood = (board, row, column) => {
  const safes = (result, neighbor) => result && !neighbor.mined; 
}

export { createMinedBoard };
```

- E por fim, para sabermos de forma efetiva se a vizinha é segura... 
Na função _safeNeighborhood_ vamos chamar a função de pegar os vizinhos/_getNeighbord_, e vamos passar o tabuleiro/_board_, além de passarmos a linha/_row_ e a coluna/_column_ do campo em questão. Em seguida, vamos chamar a função _reduce_ passando como função callback _safes_ e o valor inicial como _true_. 
Desse modo, o valor retornado nessa função _safeNeighborhood_ vai  dizer se a vizinhança de um determiando nó/campo é segura(_true_) ou não(_false_):

``` JS
// [...]

const safeNeighborhood = (board, row, column) => {
  const safes = (result, neighbor) => result && !neighbor.mined; 
  return getNeighbors(board, row, column).reduce(safes, true);
}

export { createMinedBoard };
```

- Outra função de extrema importância é a função responsável por abrir um campo/_field_ chamada _openField_, e vamos passar como parâmetro para essa função o tabuleiro/_board_, além de passarmos a linha/_row_ e a coluna/_column_ do campo em questão:

``` JS
// [...]

const openField = (board, row, column) => {
  
}

export { createMinedBoard };
```

- Essa função vai ser chamada no momento que o evento de click no campo for registrado, e se a vizinhança for segura os campos vão abrindo de forma recursiva.
Dentro da função vamos criar a const campo/_field_ que irá receber o array tabuleiro/_board_ nos indices de linha/_row_ e coluna/_column_ passados como parâmetro na função, o que vai resultar no campo em questão:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];
}

export { createMinedBoard };
```

- E o primeiro teste que vamos fazer é para saber se o campo/_field_ já está aberto ou não. Vamos verificar, se/_if_ o campo/_field_ não está aberto/_opened_(!field.opened):

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    
  }
}

export { createMinedBoard };
```

- Se passar, significa que vamos abrir esse campo agora. E o atributo aberto/_opened_ do campo/_field_(fild.opened) vai receber verdadeiro/_true_:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;
  }
}

export { createMinedBoard };
```

- E vamos verificar se o campo em questão está minado/_mined_, o que significa que acabou de acontecer uma explosão, então o atributo _exploded_ deve receber verdadeiro/_true_ também:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    }
  }
}

export { createMinedBoard };
```

- Caso contrário(o campo não está minado), vamos fazer o seguinte teste: se/_if_ a vizinhaça for segura, ou seja, a função _safeNeighborhood_ passando o tabuleiro/_board_, e a linha/_row_ e a coluna/_column_ do campo em questão retornar _true_, significa que vamos abrir os vizinhos também:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      
    }
  }
}

export { createMinedBoard };
```

- Para isso, vamos precisar chamar _openField_ de forma recursiva para cada um dos vizinhos. 
Primeiramente, vamos "pegar" os vizinhos com a função _getNeighbors_ passando o tabuleiro/_board_, e a linha/_row_ e a coluna/_column_ do tabuleiro em questão:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column)
    }
  }
}

export { createMinedBoard };
```

- Em seguida, vamos fazer um _forEach_ para cada um dos vizinhos retornados na função _getNeighbors_(que nada mais é que um array de vizinhos) e cada um dos vizinhos vamos chamar de _n_ e vamos chamar de forma recursiva o _openField_ para cada um, passando o tabuleiro/_board_, a linha/_n.row_ e a _n.coluna_ onde esse vizinho tá localizado:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column)
        .forEach(n => openField(board, n.row, n.column))
    }
  }
}

export { createMinedBoard };
```

- Caso estejamos abrindo um campo/_field_ e ele não está minado/_field.mined_ e nem é uma vizinhança segura/_safeNeighborhood_ precisamos calcular quantas minas tem ao redor.
Então vamos ter: senão/_else_ vamos crar uma const chamada vizinhos/_neighbors_ que vai receber o array com os vizinhos que a função _getNeighbors_(passando como parâmetro o _board_, e a _row_ e _column_ do campo que queremos pegar os vizinhos) vai retornar:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column)
        .forEach(n => openField(board, n.row, n.column))
    } else {
      const neighbors = getNeighbors(board, row, column);
    }
  }
}

export { createMinedBoard };
```

- E para calcular quantos vizinhos estão minados/_mined_, primeiramente vamos pegar o atributo número de minas/ _nearMines_ do campo/_field_ em questão e vamos atribuir o resultado do _filter_ sobre os vizinhos/_neighbords_, onde ele vai percorrer cada vizinho/_n_ e vai pegar apenas os vizinhos que tem o atributo minado/_mined_(n.mined) e no final vai calcular o tamanho/_length_ desse array que o _filter_ vai retornar, que vai ser o valor armazenado em _nearMines_ desse campo/_field_:

``` JSX
// [...]

const openField = (board, row, column) => {
  const field = board[row][column];

  if (!field.opened) {
    field.opened = true;

    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column)
        .forEach(n => openField(board, n.row, n.column))
    } else {
      const neighbors = getNeighbors(board, row, column);

      field.nearMines = neighbors.filter(n => n.mined).length;
    }
  }
}

export { createMinedBoard };
```

- Outra função importante é a _fields_, onde vamos percorrer todos os campos como se fosse um array. 
Ela vai receber como parâmetro o tabuleiro/_board_ e essa função vai pegar um array vazio e vai dá um _.concat_ em cima do _board_ com o operador spreed(...) para juntar todos os arrays em um único array com todos os campos de forma linhear(já que o tabuleiro é uma matriz).
Fica mais fácil armazenar os campos dessa forma, como array para que em algumas situações seja feito um _map_, _filter_ ou _reduce_ sem termos que percorrer as linhas e as colunas da matriz _board_:

``` JSX
const fields = (board) => [].concat(...board); 

export { createMinedBoard };
```

- Um exemplo do uso dessa função _fields_ que acabamos de criar é a função para saber se há algum campo/_field_ explodido/_exploded_.
Vamos criar a função _hadExplodision_ ela vai receber como parâmetro o tabuleiro/_board_ e essa função vai chamar a função que contém todos os campos _fields_ passando o _board_ e nela vamos aplicar um _filter_ onde ele vai percorrer cada campo e vai pegar apenas os campos que contém o atributo _exploded_:

``` JSX
const hadExplosion = (board) => {
  return fields(board).filter(field => field.exploded)
}

export { createMinedBoard };
```

- E se o _length_ for maior(>) que 0, significa que o resultado armazenado no _hadExplodision_ vai ser _true_, caso contrário _false_. 
Vamos usar essa função para saber se o jogo terminou ou não:

``` JSX
const hadExplosion = (board) => {
  return fields(board).filter(field => field.exploded).length > 0;
}

export { createMinedBoard };
```

- Existe um outro conceito também, que é o conceito de pendente. O que seria algo pendente? Servirá para saber se o usuário ganhou ou não o jogo... se houver algum campo que está no estado pendente quer dizer que o usuário ainda não descobriu todos os campos seguros(sem mina) e não marcou com flag os campos que tem mina. Então, o usuário só ganha o jogo se não houver nenhum campo pendente(campo pendente é o campo que não tem mina está fechado e está minado e não foi marcado com a flag).
E para descobrirmos se o usuário ganhou ou não o jogo, vamos criar uma nova função chamada pendente/_pendding_ e ela vai receber como parâmetro o campo/_field_ e "em cima" do field vamos verificar se o campo/_field_ está minado/_mined_ e(&&) não está(!) marcado com uma bandeira/_flag_ significa que ele está pendente e isso vai retornar o valor booleano _true_:

``` JSX
// [...]

const pendding = (field) => {
  return (field.mined && !field.flagged)
}

export { createMinedBoard };
```

- Ou(||) se o campo/_field_ não está(!) minado/_mined_ e(&&) não está(!) aberto/_opened_, isso também significa que está pendente e vai retornar o valor booleano _true_:

``` JSX
// [...]

const pendding = (field) => {
  return (field.mined && !field.flagged) || (!field.mined && !field.opened);
}

export { createMinedBoard };
```

- Em seguida, vamos criar uma outra função chamada ganhou o jogo/_wonGame_ e ela vai receber como parâmetro o tabuleiro/_board_ e ela irá passar por cada um dos campos chamando a função que cria um array _fields_ passando para ela o _board_ como parâmetro e com o método _filter_ vamos filtrar apenas os campos que estão pendentes/_pendding_. E no final se o tamanho/_length_ desse array retornado for igual(===) a 0 significa que o usuário ganhou e essa função vai retornar o valor booleano _true_:

``` JSX
const wonGame = (board) => {
  return fields(board).filter(pendding).length === 0;
}

export { createMinedBoard };
```

- E a última função que vamos criar vai ser para mostrar as minas que eventualmente existem no jogo, quando o usuário clica no campo/_field_ e ele está minado/_mined_ e isso gera uma explosão, e logo depois que foi detectado que o usuário perdeu o jogo vai ser chamada a função que irá exibir todas as minas.
E essa função vai se chamar exibir minas/_showMines_ ela irá receber como parâmetro o tabuleiro/_board_ e nela vamos chamar a função que cria um array dos campos _fields_ passando o board como parâmetro e em seguida, vamos aplicar um _filter_ nesse array retornado para pegar cada campo/_field_ minado/_mined_:

``` JSX
const showMines = (board) => {
  fields(board).filter(field => field.mined)
}

export { createMinedBoard };
```

- Pegando todos os campos minados/_field.mined_ significa que agora podemos fazer um _forEach_ "em cima" desse array retornado no _filter_. E vamos pecorrer cada campo/_field_ e vamos passar para o atributo aberto/_opened_ o valor _true_(para abrir todos os campos minados quando essa função for chamada):

``` JSX
const showMines = (board) => {
  fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true);
}

export { createMinedBoard };
```

- Por fim, vamos exportar todas as funções que vamos precisar que fiquem acessíveis fora desse arquivo:

``` JSX
// [...]

const showMines = (board) => {
  fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true);
}

export { 
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines
};
```

## Criando APK

### Gerando uma Chave de Upload

- Vamos precisar gerar uma chave privada utilizando o keytool. Vamos precisa executar o keytool a partir da pasta _android/app_ do nosso app.
Para gerar a chave, vamos executar o seguinte código:

```
keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

- Vamos substituir conforme o projeto:

**my-upload-key:** nome da sua key;
**my-key-alias:** apelido da sua key;
**-validity 10000:** quantidade de dias da validade da key.

- Esse comando pedirá várias informações. Vamos preenche-las de acordo com o contexto de lançamento do aplicativo em questão.

- Feito isso, podemos notar que dentro de _android/app_ foi gerado um arquivo chamado _my-upload-key.keystore_.


### Configurando as Variáveis no Gradle

- Vamos editar o arquivo _~/.gradle/gradle.properties_ ou _android/gradle.properties_ e vamos adicionar as seguintes linhas, substituindo as informações pelas cadastradas no passo anterior:

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

### Adicionando Configurações de Assinatura à Configuração do Gradle do seu APP

- Vamos editar o arquivo _android/app/build.gradle_ e adicionar a configuração de assinatura:

```
...
android {
  ...
  defaultConfig { ... }
  signingConfigs {
+   release {
+      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
+        storeFile file(MYAPP_UPLOAD_STORE_FILE)
+        storePassword MYAPP_UPLOAD_STORE_PASSWORD
+        keyAlias MYAPP_UPLOAD_KEY_ALIAS
+        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
+      }
+   }
  }
  buildTypes {
    release {
      ...
+     signingConfig signingConfigs.release
    }
  }
}
...
```

### Testando a versão de lançamento do aplicativo

- Antes de enviar a versão de lançamento para a Play Store, é bom nos certificarmos de testá-la completamente. Primeiro vamos desistalar qualquer versão anterior do aplicativo que já instalamos. Agora, vamos instalar ele no dispositivo usando o seguinte comando na raiz do projeto:

```
npx react-native run-android --variant=release
```

- Nota-se que _--variant release_ só está disponível se já configuramos a assinatura conforme descrito acima.
Podemos encerrar qualquer instância do bundler em execução, pois todo nosso framework e código JavaScript estão agrupados nos recursos do APK.

### Gerando APK para instalarmos no nosso despositivo e enviarmos para outras pessoas

- Primeiramente, vamos entrar na pasta _android_ e vamos rodar o seguinte comando:

```
./gradlew assembleRelease
```

- Feito isso, ele vai gerar o nosso APK dentro de _android/app/build/outputs/apk/release_ com o nome _app-release.apk_;

- Vamos acessar esse diretório no terminal;

- Em seguida, vamos inserir nosso dispositivo movel via USB e ativar o modo desenvolvedor nele e a depuração USB;

- Depois de conectar ele como emulador com o adb, vamos instalar o app rodando o comando:

```
adb install app-release.apk
            [nome-apk-gerado]
```

- Agora, conseguimos usar a versão mais recente do nosso app no nosso dispositivo móvel.

- Podemos também mandar esse arquivo via wpp ou realizar o upload no drive e compartilhar o link.
