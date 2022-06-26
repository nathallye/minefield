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
