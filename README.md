
# Github Repo Searcher
Aplicação para fazer buscas por repositórios do github.  
**Principais libs utilizadas:** Electron, Electron Packager, Webpack, React, Redux, Redux Saga, Material Ui e Axios.  
Para ver a lista completa consulte o arquivo package.json.


![Github Repo Searcher](https://github.com/dantewebmaster/github-repo-searcher/blob/master/screenshot.png?raw=true "Github Repo Searcher")

## Iniciando o projeto em modo dev
Clone o repositório e instale as dependências com yarn ou npm.  
`yarn/npm install`  

Para rodar em modo dev use o comando:  
`yarn start` ou `npm start`

## Preparando o App para uso no desktop
Siga estes passos para criar a aplicação desktop. 

Tanto no Windows quanto no Mac, é necessário criar os arquivos compactados antes de gerar o arquivo de aplicativo desktop. 

Rode o comando `yarn build` ou `npm build` para criar os arquivos em modo prod.
Depois de rodar esse comando, será gerada uma pasta chamada **dist** contendo os arquivos compactados em modo prod.  
Depois disso siga os passos abaixo para gerar o aplicativo para o OS específico.

**No Mac**

Rode o comando `yarn package-mac` ou `npm run package-mac`. Ao fazer isso será gerado uma pasta **builds** com o App pronto para ser usado.

**No Windows**

Rode o comando `yarn package-win` ou `npm run package-win`. Pronto! a pasta **builds** irá conter o arquivo de aplicativo para Windows.

## Criando o instalador Mac e Windows
Para criar o instalador da aplicação é bem simples.  

**No Mac:**  
Basta rodar o comando `yarn create-installer-mac` ou `npm run create-installer-mac`.   
O arquivo instalador será criado dentro da pasta installers.

**No Windows:**  
Rode o comando `yarn create-installer-win` ou `npm run create-installer-win`.  
O executavel será criado dentro da pasra installers.
