# Backend Node.js para Prueba Técnica

Este proyecto es el backend desarrollado como parte de una prueba técnica. Está construido utilizando Node.js y se conecta a una base de datos MongoDB.

## Configuración del Entorno

Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno necesarias. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

- `PORT`: Puerto en el que se ejecutará el servidor.
- `MONGODBURL`: URL de tu instancia de MongoDB.
- `JWT_SECRET`: Secreto para la firma de tokens JWT.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la terminal:

`npm install`



## Servidor de Desarrollo

Para ejecutar el proyecto en modo de desarrollo, utiliza:


El servidor se iniciará y estará disponible en `http://localhost:[PORT]/`, donde `[PORT]` es el puerto configurado en tus variables de entorno.

## Construcción para Producción

Para construir el proyecto para producción, utiliza:


Esto iniciará el servidor en el modo de producción.

## Documentación de la API

El servidor expone varios endpoints relacionados con la gestión de usuarios, autenticación y manejo de mensajes. Los detalles específicos de cada endpoint se pueden encontrar en la documentación adjunta de la API.



## Licencia

Este proyecto está bajo la Licencia MIT. Esto significa que puedes usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software bajo los términos de esta licencia.

Para más información, consulta el archivo [LICENSE](LICENSE) o visita [MIT License](https://opensource.org/licenses/MIT).