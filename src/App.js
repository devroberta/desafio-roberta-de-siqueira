import { useEffect } from 'react';
import ListaCardapio from './components/ListaCardapio.js'
import Header from './components/Header.js'
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