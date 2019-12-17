# Internacionalización (I18N) - Traducciones de idiomas

## Descripción

Este documento proporciona una breve descripción de los cambios necesarios al agregar nuevos idiomas a DataFormsJS. 
Se deben actualizar tres repositorios diferentes para una traducción completa del sitio.

Se recomienda la siguiente configuración para el desarrollo local.

~~~
dataformsjs {directorio raíz}
├── dataformsjs [repositorio]
├── parque infantil [repositorio]
└── sitio web [repositorio]
~~~

Si necesita instalar PHP, consulte los documentos para (Windows, macOS y Linux) desde: https://www.fastsitephp.com/en/getting-started

Actualmente se desean idiomas específicos y se puede pagar el trabajo de traducción. Para más información, consulte: https://www.fastsitephp.com/en/translators-needed

Los archivos se copian del inglés, el Traductor de Google se utiliza para las traducciones iniciales y luego los traductores humanos corrigen los errores del Traductor de Google.

## Generando los archivos

Todos los archivos necesarios se pueden generar utilizando el script php una vez que se descargan los 3 repositorios:

https://github.com/dataformsjs/website/blob/master/scripts/create-i18n-files.php


Simplemente cambie el valor de [const LANG_COPY_TO = '{lang}';] en la línea 18 y ejecútelo.

## Archivos JSON

Los archivos para idiomas específicos terminan con `*. {Lang} .json` y los archivos principales del sitio principal 
son` _. {Lang} .json`.


* `dataformsjs\examples\i18n`
* `website\public\i18n`

https://github.com/dataformsjs/dataformsjs/tree/master/examples/i18n

https://github.com/dataformsjs/website/tree/master/public/i18n


## Archivos HTML relacionados


Vea la línea # 5: `data-i18n-locales =" en, ... "`. Una vez que se hayan creado todos los archivos JSON, copie el texto 
completo del atributo [data-i18n-locales] y luego busquelos / reemplacelos globalmente en todos los archivos con un Editor 
de Código (editor de texto plano). A partir de 12/2019 hay 30 instancias en 12 archivos.

En el archivo principal anterior, busque `i18n-menu` y agregue el nuevo idioma para que aparezca en los menús de navegación.
Hay dos ubicaciones (una para escritorio y otra para móvil). También busque `app.plugins.i18n.currentLocale` y realice los 
cambios necesarios para que el idioma se vincule al archivo Léame traducido de GitHub.

Para archivos React, busque `const SupportLocales =` y luego agregue el idioma al arreglo. A partir de 12/2019 hay 2 archivos 
que deben actualizarse.

El orden de los idiomas para el menú de navegación se basará inicialmente en el uso global de Internet para cada idioma; 
Sin embargo, esto puede cambiar en el futuro:


https://en.wikipedia.org/wiki/Languages_used_on_the_Internet

# Plantilla de Zona de Prueba

Cada idioma tiene su propio directorio / carpeta de plantillas. Una vez que se crea un directorio para un idioma, 
se puede usar para crear sitios. El contenido del texto y los comentarios del código se actualizan al idioma traducido.

`playground \ app_data \ template \ {lang}`


https://github.com/dataformsjs/playground/tree/master/app_data/template


## Léame de la Página Principal

Parte de este contenido se duplica desde la página de inicio principal, por lo que parte del contenido simplemente se 
copia después de traducir los archivos JSON. La sección 'Se necesitan traductores pagados' debe eliminarse manualmente 
en el archivo copiado.

`dataformsjs\docs\i18n-readme\README.{lang}.md`

https://github.com/dataformsjs/dataformsjs/tree/master/docs/i18n-readme

## Código de Referencia Rápida


`website\app_data\example-code\quick-reference-{lang}.htm`

https://github.com/dataformsjs/website/tree/master/app_data/example-code

Los comentarios de código se actualizan al idioma traducido.
