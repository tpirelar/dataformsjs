
<p align="center">
	<img src="https://github.com/dataformsjs/static-files/raw/master/img/logo/favicon-144.png">
</p>

# :star2: ¡Bienvenido a DataFormsJS!

**¡Gracias por su visita!**

_Si estás viendo este mensaje, ¡eres uno de los primeros visitantes!_ 🌠👍

DataFormsJS es un nuevo framework de JavaScript y componentes independientes de react y web. DataFormsJS es muy ligero ya que es muy compacto, fácil de aprender, diseñado para un desarrollo rápido y para ofrecer una gran experiencia tanto para desarrolladores como para usuarios finales. Aunque es relativamente nuevo (publicado por primera vez en noviembre de 2019) DataFormsJS fue escrito y ha sido utilizado durante muchos años. Es extremadamente estable y contiene una gran cantidad de pruebas unitarias.

Este repositorio contiene el Framework de DataFormsJS, Páginas de Ejemplo y Pruebas Unitarias. El sitio web principal existe en otro repositorio.

## :dizzy: ¿Por qué usar DataFormsJS?

|<img src="https://www.dataformsjs.com/img/icons/fast.svg" alt="Desarrollo mas rapido" width="60">|<img src="https://www.dataformsjs.com/img/icons/small-size.svg" alt="Compacto" width="60">|<img src="https://www.dataformsjs.com/img/icons/light-switch.svg" alt="Fácil de aprender" width="60">|
|---|---|---|
|**Desarrollo mas rapido** Visualice datos de los servicios web y GraphQL usando solo HTML Markup y defina las características de la aplicación y del sitio usando los atributos HTML.|**Compacto** Todos los archivos son pequeños y se descargan solo cuando se usan, lo que permite un mayor rendimiento y un sitio más ligero.|**Fácil de aprender** DataFormsJS está construido en torno a HTML, CSS, JavaScript, Templating y tiene una API mínima de JavaScript y HTML para que pueda comenzar de inmediato.|

|<img src="https://www.dataformsjs.com/img/icons/column.svg" alt="Estabilidad" width="60">|<img src="https://www.dataformsjs.com/img/icons/water.svg" alt="Flexibilidad" width="60">|<img src="https://www.dataformsjs.com/img/icons/star.svg" alt="Mejores sitios" width="60">|
|---|---|---|
|**Estabilidad** Está diseñado para un uso a largo plazo; un sitio desarrollado con DataFormsJS hoy funcionará muy bien y será fácil de mantener en décadas.|**Flexibilidad** Funciona bien con otro código y la API está diseñada para ofrecer flexibilidad y características personalizadas. Si puede imaginarlo, podrá construirlo con DataFormsJS.|**Mejores sitios** DataFormsJS está diseñado para ser una gran experiencia tanto para desarrolladores como para usuarios finales, permitiéndole crear mejores sitios.|

|¡Funciona con|<img src="https://www.dataformsjs.com/img/logos/handlebars.png" alt="Handlebars" width="64"><div>Handlebars</div>|<img src="https://www.dataformsjs.com/img/logos/vue.svg" alt="Vue" width="64"><div>Vue</div>|<img src="https://www.dataformsjs.com/img/logos/react.svg" alt="React" width="64"><div>React</div>|<img src="https://www.dataformsjs.com/img/logos/graphql.svg" alt="GraphQL" width="64"><div>GraphQL</div>|y más!|
|---|---|---|---|---|---|

|¡Aprende algo nuevo!|<div><img src="https://www.dataformsjs.com/img/icons/web-components.svg" alt="Web Components" width="64"></div><div>Componentes Web</div>|
|---|---|

## :rocket: Empezando

**Comenzar con DataFormsJS es extremadamente fácil.**

Instale desde **npm**, esta opción funciona muy bien si está utilizando create-react-app o desea una copia de todos los archivos localmente:
```
npm install dataformsjs
```

**Descargue este repositorio**. Es muy ligero para descargar porque este repositorio no tiene dependencias locales y carga Handlebars, Vue y React desde un CDN. Para ejecutar todos los archivos de ejemplo, debe instalarse Node y luego puede ejecutar uno de los siguientes servidores:

```
dataformsjs
├── examples
│   └── server.js
└── test
    └── server.js
```

Los archivos JavaScript para Framework y React y los Componentes Web independientes existen en el directorio [js].

```
dataformsjs
└── js
    ├── DataFormsJS.js
    ├── react\*.js
    ├── web-components\*.js
    └── *
```

**Desarrolle en línea** utilizando el código de juegos: https://www.dataformsjs.com/#/es/playground

<p align="center">
<img src="https://raw.githubusercontent.com/dataformsjs/static-files/master/img/screenshots/Playground.png" alt="Code Playground" width="800">
</p>

**Descargar un archivo de plantilla** Descargue un archivo de plantilla usando scripts de un CDN: https://www.dataformsjs.com/#/es/getting-started

<p align="center">
<img src="https://raw.githubusercontent.com/dataformsjs/static-files/master/img/screenshots/Getting-Started-Templates.png" alt="Plantillas de inicio" width="800">
</p>

## :page_facing_up: Example Code

Este ejemplo usa Vue para crear plantillas. Si lo guarda con un editor de texto, puede verlo localmente en su navegador. Además, el sitio principal contiene muchas plantillas y ejemplos.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Ejemplo de DataFormsJS usando Vue</title>
    </head>
    <body>
        <header>
            <nav>
                <a href="#/">Inicio</a>
                <a href="#/data">Ejemplo de Datos</a>
            </nav>
        </header>

        <main id="view"></main>

        <template data-route="/">
            <h1>Hola Mundo!</h1>
        </template>
        
        <script
            type="text/x-template"
            data-engine="vue"
            data-route="/data"
            data-page="jsonData"
            data-url="https://www.dataformsjs.com/data/geonames/countries"
            data-load-only-once="true"
            data-lazy-load="jsonData, flags"
            data-countries>

            <h3 v-if="isLoading" v-cloak class="loading">Cargando...</h3>
            <h3 v-if="hasError" v-cloak class="error">{{ errorMessage }}</h3>
            <div v-if="isLoaded" v-cloak>
                <h1>Países</h1>
                <ul>
                    <li v-for="country in countries">
                        <i v-bind:class="country.iso.toLowerCase() + ' flag'"></i>
                        <span>{{ country.country }}<span>
                    </li>
                </ul>
            </div>
        </script>

        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <script src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/DataFormsJS.min.js"></script>
        <script>
            app.lazyLoad = {
                jsonData: 'https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/pages/jsonData.min.js',
                flags: 'https://cdn.jsdelivr.net/npm/semantic-ui-flag@2.4.0/flag.min.css',
            };
        </script>
    </body>
</html>
```

## :handshake: Contribuyendo

**Todas las contribuciones son bienvenidas.** Para cambios importantes, incluidos los cambios de última hora en el código existente o la actualización de gráficos y archivos existentes, abra primero una instancia para analizar qué le gustaría cambiar. Algunos ejemplos donde puede contribuir:

* Errores tipográficos y gramaticales: si ve alguno, corríjalo y envíelo.
* Documentación y Tutoriales. Actualmente, la mayoría de la documentación se encuentra en la sección de referencia rápida y en los comentarios de código, por lo que se necesitará mucha documentación y se escribirá con el tiempo.
* Se desarrollarán muchos más ejemplos en el futuro. Si tiene ideas, envíelas.
* Pruebas de unidad y métodos de prueba adicionales: los archivos y las características de Core Framework se prueban por unidad; sin embargo, cada línea de código debe probarse por unidad en todos los archivos. Actualmente no hay pruebas unitarias para Vue, React ni Componentes Web.
* Scripts adicionales, componentes de React, Componentes Web y características.
* Nuevas ideas: si tiene ideas sobre cómo mejorar, abra un tema para discutirlo.

El archivo [docs/to-do-list.txt](https://github.com/dataformsjs/dataformsjs/blob/master/docs/to-do-list.txt) contiene la lista completa de elementos que están actualmente pendientes y es un buen lugar para comenzar.

## :question: Preguntas más frecuentes

**¿Por qué se creó DataFormsJS?**

El desarrollo inicial y el uso de DataFormsJS ocurrieron en privado en 2013 para permitir el desarrollo rápido de aplicaciones de una sola página (SPA) de alta calidad y libres de errores. DataFormsJS fue diseñado para ser muy ligero, tener un gran rendimiento y que fuese mucho más rápido para el desarrollo en comparación con otros Frameworks. Algunas de las razones para un desarrollo rápido incluyen mostrar servicios JSON usando solo marcado y plantilla ((Handlebars, Underscore, etc.) y definir características de aplicaciones y sitios usando atributos HTML y pequeños complementos de JavaScript.

Las primeras versiones de DataFormsJS se utilizaron en varias compañías en diferentes tipos de aplicaciones.

Ahora que tanto React como Vue se han vuelto muy populares, se han desarrollado componentes React separados para ayudar con React Development y el framework ha sido ampliado para admitir Vue. Además, se han desarrollado Componentes Web separados para permitir una funcionalidad similar en los navegadores modernos sin utilizar un framework de JavaScript.

**¿Por qué tardó tanto en salir?**

El autor de DataFormsJS tenía varios trabajos que lo ocupaban en ese momento y al mismo tiempo estaba trabajando en otro gran proyecto  [FastSitePHP](https://www.fastsitephp.com/es/).

**Qué tan grande es DataFormsJS?**

_Todos los tamaños se basan en scripts minificados y compresión gzip del servidor web._

* **DataFormsJS Framework – 9.4kb** (120 kb sin comprimir y versión completa)
* Los archivos adicionales (controladores, complementos, etc.) suelen tener solo 1-3 kb cada uno.
* En general, cuando use el Framework, espere aproximadamente 15 kb para la carga inicial de la página, y luego varios kb para páginas adicionales que carguen complementos, páginas, controladores, etc.
* React (todos los componentes en JavaScript) - 6.1 kb
* Los componentes de reacción individuales tienen entre 3 y 12 KB cuando no están comprimidos e incluyen comentarios.
* Los componentes web generalmente tienen entre 1 y 3 KB cada uno, por lo general, utilizará una serie de componentes, por lo que en las aplicaciones de ejemplo, esto suma aproximadamente 15 kb para cada aplicación.

Si bien el marco DataFormsJS es pequeño, generalmente se utilizará con un motor de visualización o plantilla más grande:

* Handlebars: ~ 22 kb
* Vue: ~ 33 kb
* Underscore: ~ 6 kb
* Nunjucks - ~ 25 kb

Además, en un sitio complejo o grande, se espera que el código de terceros represente la mayor cantidad de JavaScript. Por ejemplo, CodeMirror Text Editor usado en el sitio de Zona de Prueba tiene alrededor de 250 kb, sin embargo DataFormsJS tiene la capacidad de descargar solo código de terceros cuando sea necesario.

**¿Cuáles son los planes futuros para DataFormsJS?**

DataFormsJS está aquí a largo plazo y se desarrollará indefinidamente con nuevas características, componentes, ejemplos, documentos, etc. Si bien DataFormsJS es un Framework, también incluye Componentes Web independientes que se pueden usar sin éste. Con el tiempo, se desarrollarán muchos complementos y componentes web adicionales.

DataFormsJS continuará desarrollándose de una manera que permita el desarrollo basado en la web (por ejemplo: la Zona de Prueba) y se mantendrá reducido en tamaño cargando scripts sólo cuando sea necesario.

## :memo: Licencia

Este proyecto está licenciado bajo la **MIT License** - vea el archivo [LICENSE](LICENSE) para más detalles.
