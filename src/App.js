import React from 'react';
import ListaCardapio from './components/main/ListaCardapio.js'
import Header from './components/header/Header.js'
import './App.css'

function App() {
    return (
      <div className='App'>
        <header><Header /></header>
        <main><ListaCardapio /></main>
      </div>
    );
  }
  
  export default App;