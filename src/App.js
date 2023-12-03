import logo from './images/logo.png'; 
import './App.css'; 
import Formulario from './componentes/Formulario.js'; 
 
function App() { 
  return ( 
    <div id='contenedor'> 
      <header> 
        <img src={logo} alt="Logo" width="50" /> 
        <h1>Caja Pizzería</h1> 
      </header> 
      <main> 
        <Formulario /> 
      </main> 
    </div> 
  ); 
} 
 
export default App;