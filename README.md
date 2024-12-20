# Instructivo de uso de la simulacion

## Requisitos previos 
 - NodeJS ^12.22.0
 - Npm ^8.5.1

## Pasos a seguir para la ejecucion
1. Ingresar en la carpeta del proyecto con la consola y ejecutar los comandos:

- Para instalar las librerias del proyecto:
```sh
npm install
```

- Para correr el server en donde se ejecutara la simulacion:
```sh
npm run start
```

2. Dirigirse en el navegador a la direccion http://localhost:3000
3. Una vez dentro del dashboard de la simulacion, setear el valor deseado de cantidad inicial de agua
como parametro de contexto del sistema.
4. Luego setear el valor de concentracion que se quiere que el sistema mantenga. 
5. Una vez seteados todos los valores, oprimir el boton verde "Simular" para iniciar el programa. Esto hara que se vaya 
graficando la concentracion y cantidad de agua en el grafico de la derecha. A su vez se pueden ver los datos usados para graficar
en la consola del navegador.
6. Con la simulacion corriendo y con la ayuda del panel de perturbaciones, setear los valores deseados para simular
las perturbaciones. Luego presionar el boton rojo "Simular perturbacion", lo cual inyectara los datos en la ejecucion del
programa. 
7. Al llegar al valor estable de concentracion, se visualizara una alerta de color verde indicando esto y se veran reflejados
los valores finales en las casillas ubicadas debajo del grafico.
8. Para detener y reiniciar la simulacion, oprimir el boton rojo "Detener simulacion".