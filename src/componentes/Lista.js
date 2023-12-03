import React from "react"; 
 
const ListaCompras = ({ compras, eliminarCompra, calcularTotal, editarCompra }) => { 
  return ( 
    <> 
      {compras.length > 0 ? ( 
        <div id="lista"> 
          <h2>Lista de Compras</h2> 
          <table> 
            <thead> 
              <tr> 
                <th>ID</th> 
                <th>Nombre</th> 
                <th>Cantidad</th> 
                <th>Precio</th> 
              </tr> 
            </thead> 
            <tbody> 
              { 
              //Registros encontrados en localStorage 
              compras.map((compra) => { 
                const { id, nombre, cantidad, precio } = compra; 
                return ( 
                  <tr key={id}> 
                    <td>{id}</td> 
                    <td>{nombre}</td> 
                    <td>{cantidad}</td> 
                    <td>{precio}</td> 
                    <td> 
                      <button className="boton boton-lista" onClick={() => editarCompra(compra)}>Editar</button> 
                    </td> 
                    <td> 
                      <button className="boton boton-lista" onClick={() => eliminarCompra(id)}>Eliminar</button> 
                    </td> 
                  </tr> 
                ); 
              })} 
            </tbody> 
          </table> 
          <p>El monto a pagar de la compra es: {calcularTotal(compras)}$</p> 
        </div> 
      ) : ( 
        console.log("No hay registros") 
      )} 
    </> 
  ); 
}; 
 
export default ListaCompras;
