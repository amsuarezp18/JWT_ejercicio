# JWT_ejercicio
A continuación se describe el reto y se adjuntan imágenes de la solución.

## RETO
* Modificar el servidor / backend para conectarse con una base de datos (tipo SQL o MongoDB) la cual contiene los usuarios y contraseñas de la aplicación. Implemente un mecanismo adicional para no tener que almacenar las contraseñas como texto plano ya que es considerada una mala práctica en el diseño de sistemas de autenticación.
* Cree un total de 3 roles en la aplicación dentro de un esquema de autorización adecuado para el acceso de diferentes niveles de información. Al menos 1 de los roles debe estar en la capacidad de modificar información y persistirla para el consumo por parte de los demás roles.

## SOLUCIÓN

* Modificar el backend para conectarse con una base de datos : A continuación se muestra la conexión exitosa a la base de datos MongDB. En la imagen 1 se puede ver la creación de un producto haciendo un request al backend. En la imagen 2, se observa como quedo almacenada la información en la base de datos. 

![](https://github.com/amsuarezp18/JWT_ejercicio/blob/main/images/createProductDatabase.png)

***
![](https://github.com/amsuarezp18/JWT_ejercicio/blob/main/images/createProduct.png)

***

* Implemente un mecanismo para encriptar las contraseñas : En la imagen 3, se muestra la creación de un usuario con sus credenciales. En la imagen 4 se observa como la constraseña no se guarda en text plano en la base de datos gracias al uso de bcrypt. ( Los roles se crean en la segunda parte del reto)

![](https://github.com/amsuarezp18/JWT_ejercicio/blob/main/images/createUser.png)

***
![](https://github.com/amsuarezp18/JWT_ejercicio/blob/main/images/claveEncriptada.png)

***

* Evidencia de funcionamiento de la función login y la autenticación para acceder al API con el fin de retornar los productos existentes. Se utiliza JWT.


## SOLUCIÓN ROLES

*Cree un total de 3 roles en la aplicación dentro de un esquema de autorización. Al menos 1 de los roles debe estar en la capacidad de modificar información y persistirla para el consumo por parte de los demás roles: A continuación se muestra el esquema definido para la creación de roles.
( Básico puede consultar información, Supervisado puede editar información y consultar, Admin puede crear elementos, editar información y consultar)

En las siguientes imágenes se crean tres usuarios distintos con roles diferentes, el primero como administrador, el segundo como supervisor y el último como básico.

En las siguientes imágenes se realiza el login de cada usuario y se procede a realizar request al backend donde se verifican los permisos de acuerdo a los roles.

# Básico


# Supervisado

# Admin


