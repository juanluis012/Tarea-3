# Nasa

Descripción breve de tu proyecto.
Este proyecto se baso en crear un pagina web que tuviera html,css,javacript,.net.sql server
## Instrucciones para ejecutar la aplicación React

1. Navega a la carpeta del cliente:
la carpeta servidore esta vacia por lo cual utilizaremos cliente 
   cd ruta-del-cliente
Instala las dependencias:

npm install
Ejecuta la aplicación React:

npm run dev
o utiliza el comando específico que tengas para ejecutar la aplicación.

Instrucciones para ejecutar la API en .NET Core
Solo utiliza la carpeta api. Puedes ignorar las demás, ya que eran para pruebas.

Asegúrate de revisar el archivo appsettings.json en la carpeta api para configurar la conexión con tu base de datos SQL Server. Verifica el ConnectionStrings y ajusta el usuario y la contraseña según tu configuración.

Ejecuta la API.

Configuración de la Base de Datos SQL Server
Descarga el archivo SQL proporcionado en el repositorio.

Ejecuta el script SQL en tu servidor SQL para crear la base de datos y las tablas necesarias.

Problemas Comunes
Si no estás recibiendo datos, asegúrate de revisar el método fetch en los archivos relacionados con astronautas y misiones en la aplicación React. Verifica que la API esté ejecutándose en el localhost y que la ruta de la solicitud sea correcta.

Si la API no está ejecutándose, copia y pega la URL en los métodos fetch en tu aplicación React.