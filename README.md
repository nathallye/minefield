# Projeto Campo Minado(minefild)

Construindo um aplicativo do jogo campo minado utilizando React Native.

![image](https://user-images.githubusercontent.com/86172286/174512763-41d33bda-6f7e-43d2-999e-746e889a8a98.jpg)

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
