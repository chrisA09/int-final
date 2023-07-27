# Proyecto final UTN

- Tema libre: notes-app.
- minimo 5 secciones navegables
  - login
  - signup
  - formulario de contacto
  - inicio
  - mail de confirmacion
- front-end react
- back-end node/express
- DB mongo o SQL

---

<div class='center'>
Make it work,  
Make it right,  
Make it fast.
</div>

---

### Repasar

- promises(async await)
- es6 modules
- classes
- dependencie array
- useEffect

## Resumen

<div class='center'>
vite | mongo | express | react | node
</div>

> usar dos terminales, una para el cliente y otra para el server.

- carpeta para client y otra para server.
  - i vite- react--->client
  - i express ---> server

## BACK-END

### configuracion de back-end API

- crear back-end api con express.
- git ignore de node_modules,
- configuracion de express que esta en la documentacion. [express](https://expressjs.com/es/starter/hello-world.html)
- Para poder correr el backend hace falta nodemon para reiniciar el server [nodemon](https://www.npmjs.com/package/nodemon)
  - se tiene que agregar en package.json el path de entrada de express

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "nodemon src/index.js"  <-----
  },
```

- instalacion y configuracion de mongoose para concectar con mongoDB. [mongoose](https://mongoosejs.com/)

### Configuracion de DB

- setup de mongo atlas
- instalacion y configuracion de mongoose para poder conectar con mongodb---> fijarse que los datos de la db van en un archivo .env
- conectar el cluster de mongodb desde la api

```jsx
const db = await mongoose.connect(
  'mongodb+srv://int-utn:<password>@cluster0.fb9h5ut.mongodb.net/?retryWrites=true&w=majority'
);
```

mongoose funciona con schemas y los llama model (libreria para conectar con mongoDB)

crea una carpeta models y agrega ahi el 'schema' de boilerplate que va a usar para sus tarjetas(decks)

> el schema funciona de manera que sirve como plano para los datos que se van mandar a la DB a traves del protocolo http

- creacion del model--> este va con la data que voy a necesitar para ese modelo especifico
- en los docs. hay mas info sobre como funciona el schema y acceso al modelo docs-mongoose

```jsx
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const NoteSchema = new Schema({
  title: String,
});

const NoteModel = mongoose.model('Note', NoteSchema); // accesing a model

export default NoteModel;
```

- refactorizacion de index para que conencte la DB antes de que la api empiece a mandarle o pedirle cosas (de no ser asi, se romperia la app)

### RESTfull API

Resource route/endpoint, en esa ruta de recurso es donde se van a hacer las CRUD opertations que es basicamente crear borrar y actualizar ese recurso.

cuando se necesita hacer una operacion POST de algun recurso, en la api tengo que crear un nuevo model y hacer que eso se guarde/persista en la DB

> importante el uso del middleware express.json() que permite ver lo que se esta enviando en la post request en formato json

```js
app.post("/notes", async (req, res) => {
  // se crea una nueva instancia del objeto definido del mongoose model en Note.js
  const newNote = new Note({
    title: "nota 1",
  });
  //almacena la respuesta en una variable / persite en el cluster
  const createdNote = await newNote.save();
  //convierte la respuesta a json / envia devuelta al user
  res.json(createdNote);
});
```

> nota: hace falta probar que la api se este comunicando con  la db, para eso se puede usar post man o thunder client
>
>>nota: a express hace falta agregarle una funcion de middleware para que puede interpretar json y asi enviar json a la db como payload. ----> payload es la data que transporta cada request, independientemente del metodo que sea.

```js
// middleware para interpretar json en express
//siempre va arriba de los endpoints
app.use(express.json());
```

esto va a permitir enviar json post request

```js
/*================== express midllewawre function ================*/
app.use(express.json());
/*================== API endpoints ================*/
app.get('/', (req, res) => {
 res.send('Hello World!');
});
app.post('/notes', async (req, res) => {
 //se crea una nueva instancia del objeto definido en el modelo Note.js
 const newNote = new Note({
  title: req.body.title,   // <--- puedo hacer esto para persistir dinamicamente la data personalizada
 });
 //almacena la respuesta en una variable y la guarda en la db
 const createdNote = await newNote.save();
 //devuelve la nota creada pero en formato json
 res.json(createdNote);
});
/*================== API endpoints ================*/
```

para .env descargue la libreria "dotenv" de npm [dotenv](https://www.npmjs.com/package/dotenv)

---

## FRONT-END

### Primer paso es hacer un primer envio de datos del front al back o a la db

- Formulario de un solo label e input:

> Muy importante!, el uso de "useState" hook, para obtener la data que se inserta en el input y asi poder manipularla.
>
>> Cada vez que quiera que react, re-renderize algo tengo que usar "useState".

- Uso combinado del event listener "onChange" y "useState" hook.
  
 Funcionamiento:

- El evento se dispara al cambio, cuando el user typea algo, y guarda lo typeado en el estado asociado a ese input.

  - Para llevar a cabo esto, se pasa una funcion anonima al evento, con el objeto de evento(e) como parametro, navegando dentro del mismo a <e.target.value>  se  obtiene el valor ingrasado por el user en es input.

```jsx
<input 
    value = {title} // input que tiene como value al estado "title". que este mismo tiene como valor incial un string vacio('').
    onChange = {(e) => setTitle(e.target.value) }
/>
```

### Comunicación con el la API

Envio de datos del formulario a la API

> nota: por default en html los botones que se encuentran dentro de 'form' automaticamente van a "submit" --> entregar el fromulario, asi que no hace falta agregarle ningun click listener al boton.

Funcionamiento:

Le pasa una funcion al evento "onSubmit" que va a manajer de manera customizada el envio de ese formulario, porque necesitamos prevenir el comportamiento por default. "every time the user submits the form, the browser updates the page and looses all the data".  
Ademas de hacer un fetch, indicandole  el motodo post, y  pasandole el cuerpo de la request y en forma de cadena de texto json (a.k.a JSON.stringify), indicando lo que se quiere pasar del cuerpo.

```jsx
function handleCreateDeck (e) {
    e.preventDefault();
    fetch("url de api endpoint necesario",{
        method: "POST",
        body: JSON.stringify({
            title,  // el cuerpo del post request va a ser title pasado a cadena de texto json
        }),
    })
}
```

### CORS-error

cors: cros origin resouce sharing.  
 Bloquea caulquier request que provenga de otra direccion/origen, el navegador no permite el acceso a otras url's que no tengan el mismo hostname.

 >Solucion:
  se instala la libreria cors-npm y se agrega a la API express como middleware. Previamente hace falta importarlo.

```jsx
npm i --save cors
```

para que no tire problemas se le debe debe especificar un argumento. se puede usar (*) o ser mas especifico pasando un objeto?--> verificar con la pagina de cors en npm

>nota: cuando se pasa a produccion en el origen de cors, va el dominio donde esta alojado el front-end. Cosa de que nuestra pagina sea la unica que pueda hacerle request a la api.

### Headers

es un bloque de informacion que se envia cuando se hace una request a la api, esta informacion va desde cookies, la data que se esta enviando a la api, cors, cache, etc..  
El problema actual es que la api esta recibiendo headers por defecto, del fetch, post request de persistir lo que se guarda en el estado, que en este caso seria el titulo.  

Solución:

```js
// dentro del objeto del segundo parametro del fetch junto con method
// agrego headers Content-type: aplication/json

function handleCreateDeck (e) {
    e.preventDefault();
    fetch("url de api endpoint necesario",{
        method: "POST",
        body: JSON.stringify({
            title,  // el cuerpo del post request va a ser title pasado a cadena de texto json
        }),
        headers: {
            "Content-Type": "aplication/json"
        }
    })  
}
```

#### BUG - NO REFRESCA CONTENIDO DE INPUT UNA VEZ ENVIADO

 como se uso prevent default en la funcion para manejar el submit del titulo, cuando se envia la  data dentro de input al back-end y luego a la DB, persiste es decir no se vacia el contenido del input.
 Para solucionar esto hace falta refrescar el estado de input devuelta a sus estado por defecto una vez que se concreto la POST request.

 Solución a este pequeño detalle:

   Fetch devuelve una promise, por lo tanto se puede usar asyn-await para manejarla.
  Lo que permite el siguente menejo de la misma.

  ```jsx
  async function handleCreateDeck (e) {     
    e.preventDefault();
    await fetch("url de api endpoint necesario",{ 
        method: "POST",
        body: JSON.stringify({
            title,  // el cuerpo del post request va a ser title pasado a cadena de texto json
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    setTitle(''); // cuando termina de cumplir con la request, refresca el estado de input
}
  ```

## Fetch all notes and send back to the user

- crear un endpoint que permita a la UI hacer un fetch de todas las notas existentes

> convention use with REST, get data --> fetch request, push data --> post request

*express va a tartar de manera distinta a dos URLs iguales pero con distintos metodos

### how to fetch notes from mongo

Trae todas las notas que estan guardadas en la coleccion decks con el metodo *.find()*, y lo loguea en consola

```js
app.get('/', (req, res) => {
 const decks = await Deck.find();
 console.log(decks);
});
```

#### *.find()* que es?

Este *.find()* es un metodo que pertenece a [mongo-retrieve data](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/retrieve/#:~:text=You%20can%20use%20read%20operations,()%20or%20findOne()%20methods.). Es parte de lo que se llama *"read operation"*.

>'You can use read operations to retrieve data from your MongoDB database. There are multiple types of read operations that access the data in different ways. If you want to request results based on a set of criteria from the existing set of data, you can use a find operation such as the find() or findOne() methods'

Con este metodo puedo hacer que traiga solo las notas que estan relacionadas a un *user id*.

---

Si bien loguea en consola la data, si pruebo con un cliente consumir esa data, *por ej*. "thunder client" va a fallar ya que no puede interpretar la respuesta.
Para poder interpretar la respuesta y mandar data utilizable a la *UI*, hay que convertir la respuesta a *JSON*.

```js
app.get('/', (req, res) => {
 const decks = await Deck.find();
 res.json(decks);
});
```

Ahora si veo la respuesta en el cliente, se va a consumir sin ningun problema y se va a ver el cuerpo de la respuesta en formato json.

### how to fetch this data from the front-end

Se logra usando *useEffect()* en el front-end. Que basicamente hace que cuando carga *app (component)* haga un fetch de todo las notas que haya en dicha coleccion.

> investigar el uso de cleanup function en *useEffect()*, parece que se usa para que no se produzca el fecthing si *app component* no estan en display/uso.

#### Demo de *useEffect()* con *cleanup func*

```js
useEffect(() => {
  console.log("we are here");

  return () => {
    console.log("cleanup");
  };
  }, []);
```