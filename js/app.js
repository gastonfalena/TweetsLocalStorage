//Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []
//EVEN LISTENERS
eventListeners()
function eventListeners() {
  formulario.addEventListener('submit', agregarTweet)
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || []
  })
}
//FUNCIONES
function agregarTweet(e) {
  e.preventDefault()
  const tweet = document.querySelector('#tweet').value
  if (tweet === '') {
    mostrarError('mensaje vacio')
    return //evita que el codigo se siga ejecutando.
  }
  const tweetObj = {
    id: Date.now(), //improvisando un id unico
    tweet, // la llave se llama como el valor tweet:tweet
  }
  tweets = [...tweets, tweetObj]
  createHTML()
  formulario.reset()
}

function mostrarError(error) {
  const mensajeError = document.createElement('p')
  mensajeError.textContent = error
  mensajeError.classList.add('error')
  const contenido = document.querySelector('#contenido')
  contenido.appendChild(mensajeError)
  setTimeout(() => {
    mensajeError.remove()
  }, 3000)
}
function createHTML() {
  limpiarHTML()
  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      const btnEliminar = document.createElement('a')
      btnEliminar.classList.add('borrar-tweet')
      btnEliminar.innerText = 'X'
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id)
      }
      const li = document.createElement('li')
      li.innerText = tweet.tweet
      li.appendChild(btnEliminar)
      listaTweets.appendChild(li)
    })
  }
}
function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id) //reescribe el nuevo arreglo sin el id seleccionado
  createHTML()
}
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild)
  }
  sincronizarStorage()
}
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets))
}
