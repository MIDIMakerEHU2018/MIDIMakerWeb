# MIDIMaker-Web
Este repositorio incluye el código de Node.js para la página web del proyecto MIDIMaker. Esta web permite a los clientes subir un fichero de audio (formatos .wav, .m4a, .mp3 permitidos) y descargar el correspondiente fichero MIDI.

## Antes de empezar
Esta página web incluye una llamada a una librería de Python propia para la conversión de audio a MIDI. Esta librería es indispensable para que la página funcione, por lo que antes de utilizarlo es necesario instalar la librería en el dispositivo que funcionará como servidor web e incluir el fichero principal *midimaker.py* en el directorio *scripts* de este proyecto.
La librería MIDIMaker para Python se puede encontrar en: https://github.com/MIDIMakerEHU2018/midimaker.py

## Instalación
Para que la página web funcione es necesario tener Node.js instalado en el dispositivo. Para más información sobre como instalar y utilizar Node.js haz click [aquí](https://nodejs.org/en/).
También es recomendable instalar NPM (Node.js Package Manager) para facilitar la instalación de dependencias. Para más información sobre NPM haz click [aquí](https://www.npmjs.com/).

Una vez que Node.js y NPM están instalados en el dispositivo, es necesario instalar las dependencias del proyecto. Todas las dependencias están listadas en el fichero *package.json*, por lo que la manera más sencilla para instalar todas al mismo tiempo es utilizar NPM mediante el comando `npm install` en el directorio principal del proyecto.

Después de instalar las dependencias, solo hace falta arrancar Node.js. Para ello podemos utilizar dos comandos en el directorio principal: `npm start` o `node app.js`. La funcionalidad de ambas es la misma, ambos arrancan un servidor web en el puerto 3000 (el puerto se puede cambiar fácilmente en el código, al final del fichero *app.js*), donde se pueden conectar los clientes para usar la aplicación de MIDIMaker.
