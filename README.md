# FLOWROME STENCIL CLI 

<a href="https://github.com/Flowrome"><img src="./images/logo-bw-little.png" align="left" hspace="" vspace="" style="margin-right: 10px"></a> This project is a CLI to create your own **web-components library / website** project using [Web-Components](https://www.webcomponents.org/), [Stencil](https://stenciljs.com/), [Stencil/router](https://github.com/ionic-team/stencil-router) , [SCSS](https://sass-lang.com/), [Typescript](https://www.typescriptlang.org/) and [JSX](https://it.reactjs.org/docs/introducing-jsx.html).<br><br><br><br>




## INSTALLATION
```
git clone https://Flowrome@bitbucket.org/Flowrome/fl-stencil-cli.git
npm i -g /path/to/fl-stencil-cli/
```

## USAGE
* **TO CREATE PROJECT SCAFFOLD**:
    - ```
        flcli project [PROJECT_NAME]
        ```
* **TO CREATE A PAGE (you need to be inside a fl-project)**:
    - ```
        flcli page [PAGE_NAME]
        ```
* **TO CREATE A MOLECULE (you need to be inside a fl-project)**:
    - ```
        flcli molecule [MOLECULE_NAME]
        ```

## SCAFFOLD STRUCTURE
```bash
|-- project-name
    |-- .editorconfig
    |-- .gitignore
    |-- LICENSE
    |-- fl-stencil-config.json
    |-- fl-stencil-env-chooser.js
    |-- fl-stencil-md-reader.js
    |-- package-lock.json
    |-- package.json
    |-- readme.md
    |-- stencil.config.ts
    |-- tsconfig.json
    |-- src
        |-- components.d.ts
        |-- index.html
        |-- index.ts
        |-- assets
        |   |-- fonts
        |   |   |-- raleway_thin-webfont.eot
        |   |   |-- raleway_thin-webfont.ttf
        |   |   |-- raleway_thin-webfont.woff
        |   |-- images
        |   |-- mocks
        |       |-- readmes.json
        |-- components
        |   |-- app
        |   |   |-- app.e2e.ts
        |   |   |-- app.scss
        |   |   |-- app.spec.ts
        |   |   |-- app.tsx
        |   |-- markdown-reader
        |       |-- markdown-reader.e2e.ts
        |       |-- markdown-reader.scss
        |       |-- markdown-reader.spec.ts
        |       |-- markdown-reader.tsx
        |-- envs
        |   |-- env.dev.ts
        |   |-- env.prod.ts
        |-- styles
        |   |-- _common.scss
        |   |-- _fonts.scss
        |   |-- _functions.scss
        |   |-- _layout.scss
        |   |-- _local-styles.scss
        |   |-- _mixins.scss
        |   |-- _reset.scss
        |   |-- _styles.scss
        |   |-- _themes.scss
        |   |-- _variables.scss
        |-- utils
```

## COMPONENTS
Initial components generated by the cli are:
* **APP**: App starter component, it contains the Routing structure of your application and it's the component you need to include inside the **index.html** file.
* **MARKDOWN-READER**: This component is needed to visualize the readme of the molecule/page, its route is 
```
../md-reader?id=[FILE_NAME_OF_COMPONENT]
```
You can also create those components type:
* **PAGES**: Pages are the main components of the application, they contain the semantically correct structure you should have in the HTML for a page: **body -> header, body -> main -> section**. Those components can be generated using
```node
    flcli page page-name
```
* **MOLECULES**: Those are the standalone components that will accept **@Props and @Events**, they shouldn't have the main logic but they should output someething readable by the father. They have this nomenclature [PREFIX_YOU_CHOOSED_AT_START]-[NAME]-molecule. Those components can be generated using
```node
    flcli molecule molecule-name
```

## SCRIPTS
Those are the scripts available inside the project:
* **``` npm start ```**: this script start the app in his localhost (starting at **localhost:3333**) and it could be used with this modifier: **env=envName** to choose inside the envs folder which env is used while starting the app.
You can use those evolution: 
```node 
    npm run start-dev /* equivalent of npm start env=dev */
    npm run start-prod /* equivalent of npm start env=prod */
```
* **``` npm run build ```**: this script build your components in the distribution folder (**./dist**), it could be used with this modifier: **env=envName** to choose inside the envs folder which env is used while starting the app.
You can use those evolution: 
```node 
    npm run build-dev /* equivalent of npm run start-dev compile */
    npm run build-prod /* equivalent of npm run start-prod compile */
```
* **``` npm run readme ```**: This script compile the auto-readme of your components keeping the precedent one you already wrote. to recompile the default readme just delete the current one and run this script

## ENVIRONMENTS
You can use every environm ent you want, just create an env file inside **./src/envs** folder with this nomenclature ```env.**[ENV_NAME]**.ts```. You can access to the file importing:
``` js
import { Environment } from '@env';
```
after that remember to launch the start or build script with:
```node 
npm run start/build env=[ENV_NAME]
```

## DISTRIBUTION (aka dist)
Inside **```dist```** folder you have your minified components for your ui-library (ready to publish on npm), build with ```npm run build/build-[ENV]```.

## PARALLEL BUILDS (aka builds/[BUILD-NAME])
Inside **```builds/[BUILD-NAME]```** folder you will find the parallel builds you defined inside the ```fl-stencil-config.json``` to have the builds (ready to be published inside npm) you should run ```npm run build-prod-dupes```, you can configure the builds you want inside the configuration JSON, these builds let you create differents package of your application removing components/folder or modifying files in your current project. Use the templates folder to re/write a file for your different builds.

## PUBLISHING (aka www)
Inside **```www```** folder you have your minified website ready for production, build with ```npm run build/build-[ENV]```.

## TESTING 
You can use the **Unit** or **e2e** as [Stencil](https://stenciljs.com/docs/testing-overview) allows. the **.spec** and **.e2e** files are automatically generated by the flcli scripts, obviusly you can edit them as you want, at the start of the project you can choose which one to include.

## THANKS TO
* [Web-Components](https://www.webcomponents.org/)
* [Stencil](https://stenciljs.com/)
* [Stencil/router](https://github.com/ionic-team/stencil-router)
* [SCSS](https://sass-lang.com/)
* [Typescript](https://www.typescriptlang.org/)
* [JSX](https://it.reactjs.org/docs/introducing-jsx.html).


## CONTACT ME
If you have any question about the project please contact me at:
* [email](mailto:romeonupieri@gmail.com): Please include in the subject [FLCLI]
* [telegram](https://t.me/Flowrome)


## FOLLOW ME
Discover latest updates through my Telegram channel:
* [FLCLI](https://t.me/flstencilcli)
