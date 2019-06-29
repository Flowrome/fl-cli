# FLOWROME STENCIL CLI

This project is a CLI to create your own web-components library project using [Web-Components](https://www.webcomponents.org/) [Stencil](https://stenciljs.com/), [SCSS](https://sass-lang.com/), [Typescript](https://www.typescriptlang.org/) and [JSX](https://it.reactjs.org/docs/introducing-jsx.html).

Flowrome Stencil CLI is used to create a scaffold that contains the structure to build your own web-components library using Stencil

## INSTALLATION
```node
git clone https://Flowrome@bitbucket.org/Flowrome/fl-stencil-cli.git
npm i -g /path/to/fl-stencil-cli/
```

## USAGE
* **TO CREATE PROJECT SCAFFOLD**:
    - ```node
        flcli project [PROJECT_NAME]
        ```
* **TO CREATE A PAGE (you need to be inside a fl-project)**:
    - ```node
        flcli page [PAGE_NAME]
        ```
* **TO CREATE A MOLECULE (you need to be inside a fl-project)**:
    - ```node
        flcli molecule [MOLECULE_NAME]
        ```

## SCAFFOLD STRUCTURE
```bash
|-- test-project
    |-- .editorconfig
    |-- LICENSE
    |-- fl-stencil-config.json
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
        |-- components
        |   |-- app
        |   |   |-- app.e2e.ts
        |   |   |-- app.scss
        |   |   |-- app.tsx
        |   |-- molecules
        |   |   |-- fl-test.molecule
        |   |       |-- fl-test.molecule.e2e.ts
        |   |       |-- fl-test.molecule.scss
        |   |       |-- fl-test.molecule.tsx
        |   |-- page
        |       |-- test.page
        |           |-- test.page.e2e.ts
        |           |-- test.page.scss
        |           |-- test.page.tsx
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