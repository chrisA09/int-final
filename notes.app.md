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
- typeScript(avisa cualquier error, excelente para beginners)
- react Router

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
Cuandio quiero acceder a la coleccion de mongoDB, hay que hacerlo de la misma manera que lo hace model, mas alla de que la coleccion se llama notes, accedo como *Note.find()*

```js
app.get('/decks', (req, res) => {
 const decks = await Deck.find();
 console.log(decks);
});
```

##### *.find()* que es?

Este *.find()* es un metodo que pertenece a [mongo-retrieve data](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/retrieve/#:~:text=You%20can%20use%20read%20operations,()%20or%20findOne()%20methods.). Es parte de lo que se llama *"read operation"*.

>'You can use read operations to retrieve data from your MongoDB database. There are multiple types of read operations that access the data in different ways. If you want to request results based on a set of criteria from the existing set of data, you can use a find operation such as the find() or findOne() methods'

Con este metodo puedo hacer que traiga solo las notas que estan relacionadas a un *user id*.

---

Si bien loguea en consola la data, si pruebo con un cliente consumir esa data, *por ej*. "thunder client" va a fallar ya que no puede interpretar la respuesta.
Para poder interpretar la respuesta y mandar data utilizable a la *UI*, hay que convertir la respuesta a *JSON*.

```js
app.get('/decks', (req, res) => {
 const decks = await Deck.find();
 res.json(decks);
});
```

Ahora si veo la respuesta en el cliente, se va a consumir sin ningun problema y se va a ver el cuerpo de la respuesta en formato json.

### how to fetch this data from the front-end

Se logra usando *useEffect()* en el front-end. Que basicamente hace que cuando carga *app (component)* haga un fetch de todo las notas que haya en dicha coleccion.

> investigar el uso de cleanup function en *useEffect()*, parece que se usa para que no se produzca el fecthing si *app component* no estan en display/uso.

##### Demo de *useEffect()* con *cleanup func*

```js
useEffect(() => {
  console.log("we are here");

  return () => {
    console.log("cleanup");
  };
  }, []);
```

> si se usa un *dependency array vacio* solo va a fucionar cuando se monta el componente y cuando se desmonta. Como react esta en *strict mode*, este proceso va a generar dos request, pero eso es solo meintras se esta en desarrollo cuando la app se encuentra en produccion esto ya no pasa. Esta funcion pertenece a React 18.

##### no se puede usar *async await* dentro de *useEffect()*

La solucion a esto es hacer una funcion dentro de *useEffect()* y usar *async await* en esa funcion
*ej.*:

```jsx
useEffect(() => {
  async function fetchDecks () {
    await fetch('http://localhost:3000/notes');
  }
  fetchDecks();
  }, []);
```

o hacer una "self executing anonymous function"
*ej.*:

```jsx
useEffect( () => {
  async () => {
    await fetch('http://localhost:3000/notes');
  }();
}, [] )
```

#### Store fetched data

Cuando consumo todas las notas en el 'front' van a venir en forma de un array de objetos, este array de objetos lo tengo que almacenar en la ui para poder hacer display de esa data.

Esta data se va almacenar en un estado, usando hooks. *useSate()*

*ej.*:

```jsx
const [decks, setDecks] = useState([]);
useEffect( () => {
  async function fetchDecks() => {
    const response = await fetch('http://localhost:3000/notes');
    const newDeacks = await response.json();
    setDecks(newDecks);
  }
  fetchDecks();
}, [] )
```

##### displaying stored data

La forma de hacerlo es un usando *.map()*, haciendo un mapeo del array de objetos que esta almacenado en *newDecks*. Tener en cuenta el uso de *keys* cuando quiero mostrar el contenido mapeado. [keys-react docs](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

> 'JSX elements directly inside a map() call always need keys!'

```jsx
<li key={person._id}>...</li> //_id pertenece al id de mongoDB
```

## Delete notes

### API

Para el endpoint que va a eliminar notas hace falta agregar el *id* de la nota a eliminar.

URL delete endpoint

```js
app.delete("/notes/:noteId")
```

- se guarda el id de la nota en una variable.

```js
const noteId = req.params.noteId
```

- Borro ese id en mongo

> mongo tiene un metodo para borrar una entrada de la coleccion por ID.

```js
const note = Note.findByIdAndDelete(noteId);
```

- devuelvo la nota borrada como json a modo de prueba

```js
res.json(note);
```

### UI

Para hacer que la nota se elminine en la ui hay que pasarle una funcion que se ejecute con el evento *onClick* en un boton de 'X' eliminar.

La funcion va a ser un fetch de con metodo *DELETE* y la URL va a tener un variable que va a corresponder al id de la nota que quiero borrar

El *ID* de la nota a borrar tiene que ser dinamico, se tiene que tener en cuanta en todas las url que manejen id.

```jsx
async function handleDeleteNote (noteId){
    await fetch(`http://localhost:3000/notes/${noteId}`,{
      method:'DELETE',
      });
  }
  // y en la vista...
  onClick={()=>handleDeleteNote(note._id)} // 
```

#### Mostrar cambios de UI cuando se elimina una nota

La UI tiene que reaccionar a los cambios producidos a raiz de la eliminacion de una nota. Para esto existe una forma de hacerlo que se llama *optimistic updates*

> optimistic updates: 'In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience.'

[optimistic updates](https://medium.com/@kyledeguzmanx/what-are-optimistic-updates-483662c3e171)

```jsx
async function handleDeleteNote (noteId){
    await fetch(`http://localhost:3000/notes/${noteId}`,{
      method:'DELETE',
      });
      setNotes(notes.filter(note=> note._id !== noteId ));
  }
```

#### Mostrar cambios de UI cuando se agrega una nota

Mismo problema que con la eliminacion de las notas. El problema esta en tener que hacer un fetch luego de cada cambio que realizo y esto hace mas lenta la ux. por eso tengo hacer cambio en la ui teniendo en cuenta/"siendo optimistic" de que va a cambiar en la DB.

Se crea un nuevo array de setNotes, usando *spread operator* agrego todo lo que se encontraba en el array, y agrego la nueva entrada.

Lo que pasa de fondo con esto es que cada vez que se agrega una nueva nota, automaticamente, se guarda la respuesta del fetch, con motodo post de *handleCreateNote*, al array de estado. En resumen muestra la nueva entrada en la db en la *ui* como un nuevo deck. En vez de tener que hacer un fetch deck para mostrar todas las notas. *adelantarse a lo que va a pasar*
Mismo concepto utilizado para borrar instantaneamente las notas.

```jsx
 async function handleCreateNote (e){
    e.preventDefault();
    const response = await fetch('http://localhost:3000/notes',{
      method:'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const note = await response.json()
    setNotes([...notes, note])
    setTitle('');
  }
```

## React router

Primer paso es instalar react router dom

```bash
npm i react-router-dom
```

Para usar router:

```jsx
// main.jsx
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
)
```

## Refactorizacion de codigo

### UI

Hasta ahora todos los metodos y los fetch se encuentran todos en mismo componente, el objetivo es que cada metodo tenga su componente *por ej.* : "getNotes", "createNote", "deleteNote". El objetivo es abtraer la logica de funcionanmiento y solamente tener que importar la funcion necesaria en cada caso y pasarle, los props que correspondan.

#### config file

Como cada metodo tiene una URL hardcodeada, es mejor que ahi vaya una variable en caso de tener que cambiar el puerto del back end.
En la carpeta API, se crea un archivo de config y se lo exporta como API_URL.
Se lo consume como variable en la URL de cada fetch.

```jsx
export const API_URL = "http://localhost:3000"
```

### API

Mismo que con la UI, para que no aumente la complejidad con la cantidad de codigo.
Se quita la logica de cada endpoint y se lo pone en otro archivo que se va a llamar controlador.Se lo importa y exporta usando ES& modules.

*ej.*:

```js
//api
app.get("/notes", getNotesController)
```

```js
//controller
import Note from '..models/Note.js';

export async function getNotesController(req, res) {
 const notes = await Note.find(); //accedo a la coleccion de la mmisma manera que model(por mas que la coleccion se llame notes)
 res.json(notes);
}
```

en el ejemplo de arriba se importa Note.js del model de mongoose.

Ese mismo concepto se aplica a cada endpoint

> si no le pongo la extencion al import del model me tira error nodemon. Probablemente se solucione desde la declaracion de package.json.

## Create cards

### BACK-END/API

Dentro de cada nota va a existir la opcion de crear tarjetas, *cards*. Estas son los apuntes que corresponden a la nota principal.

Este es el controlador para el endpoint, 'notes/:nodeId/cards'. La url se encuentra anidada ya que *cards* va a estar alojado dentro de cada nota.

```js
//controller
import Note from '../models/Note.js';

export async function createCardDeckController(req, res) {
 const noteId = req.params.noteId; //necesario para encontrar la nota donde se va a crear card
 const note = await Note.findById(noteId); // nota sobre la cual se va a insertar card
 const card = req.body.cardContent; // esta es la data que voy a estar persistiendo en dicha nota.
 note.cards.push(card); // inserta el contenido de card dentro del array "cards" definido en ./models/note.js
 await note.save();
 res.json(note);
}
```

```js
//model
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const NoteSchema = new Schema({
 title: String,
 cards: [String], // array "cards" donde voy a estar empujando el contenido de "card"
});

const NoteModel = mongoose.model('Note', NoteSchema); //esto me permite acceder al modelo mas info en la doc.

export default NoteModel;
```

> tener encuenta que para decirle a la DB que voy a estar almacenando un array, el modelo lleva esa notacion [String].

### UI

Como en la api se definio que cards va a estar anidado en las notas, entonces en la ui como *app* maneja toda la logica de "*notes*", el componente *Note* va a manejar toda la logica de "*cards*".

El concepto es el mismo la logica de *Note* va a ser muy similar a la de *App*, ya que va a menjar las mismas operaciones *CRUD* para "*cards*".

La particularidad en este caso esta en *`Note`*, que va a usar el id de la URL gracias al hook *useParams* de react router, y se la va a pasar a `createCard()` como argumento.

> The `useParams` hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the `<Route path>`. Child routes inherit all params from their parent routes.
>
> The `useParams()` hook allows you to access the parameters from the current URL. For example, if your URL looks like "/users/:userId", where ":userId" is a parameter, the `useParams()` hook will allow you to extract the value of `userId` from the URL.

```jsx
// Note
const [cardContent, setCardContent] = useState('')
  let { noteId } = useParams();

  async function handleCreateCard (e){
    e.preventDefault();
    const card = await createCard(noteId,cardContent);
    setCardContent('');
  }
```

```jsx
// createCard
import { API_URL } from "./config";

export default async function createCard( noteId,cardContent ) {
    const response = await fetch(`${API_URL}/notes/${noteId}/cards`,{
        method:'POST',
        body: JSON.stringify({
          cardContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}

```
