# AmApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Skolton App - Juanicortesl

Aplicación web en desarrollo construida con:

- Angular: 12.2.11

Utilizando:

- Angular CLI 12.2.11
- Node 16.13.1
- NPM 8.1.2
- macOS Monterey

## Deploy local

---

Para lanzar el servidor localmente la primera vez instalar dependencias:

```
npm install
```

Iniciar el servidor:

```
ng serve
```

## Estructura del proyecto

---

```
|- src
|   |- app
|   |   |- core                     (1)
|   |   |   |- components
|   |   |   |   |- component
|   |   |   |   |- ...
|   |   |   |- guards
|   |   |   |- http
|   |   |   |- interceptors
|   |   |   |- mocks
|   |   |   |- models
|   |   |   |- services
|   |   |- modules                  (2)
|   |   |   |- module
|   |   |   |   |- components
|   |   |   |   |   |- component
|   |   |   |   |   |- ...
|   |   |   |   |- models
|   |   |   |   |- pages
|   |   |   |   |   |- page
|   |   |   |   |   |- ...
|   |   |   |   |- services
|   |   |   |- ...
|   |   |-shared                    (3)
|   |   |   |- components
|   |   |   |   |- component
|   |   |   |   |- ...
|   |   |   |- direcctives
|   |   |   |- pipes
|   |- assets                       (4)
|   |   |- fonts
|   |   |- i18n
|   |   |- icons
|   |   |- images
|   |- enviroments                  (5)
|   |- styles                       (6)
```

1. **Core:** Componentes, modelos, servicios y mock up data que sean transversales a toda la aplicación, por ejemplo, un footer en caso de los componentes. Además de guards, interceptores y la carpeta http para llamados a API's.
2. **Modules:** Distintos módulos de la aplicación. Cada módulo contiene distintas páginas, modelos, servicios y componentes propios.
3. **Shared:** Componentes, directivas y pipes pensados para reutilizarse a lo largo de la aplicación.
4. **Assets:** Recursos gráficos, fuentes y archivos de idiomas.
5. **Enviroments:** Archivos de ambiente.
6. **Styles:** Estilos SCSS globales.

## Documentación

---

## Links útiles

---

- [Documentación de Angular 12](https://v12.angular.io/docs)

## Comentarios

---

- Usar PascalCase: Clases | Interfaces | Tipos | Enum / Decorados | Tipo de parámetros.
- Usar camelCase: Variables | Parámetros | Funciones | Métodos | Propiedades | Alias de módulos.
- Usar rem para tamaños de fuente.
- Commits pequeños, en inglés con mayúscula inicial.
- Los estilos personalizados empiezan por "sk-" y se encuentran en archivo styles.scss dentro de assets/styles.
