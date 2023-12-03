import React, { useState, useEffect } from "react";
import ListaCompras from "./ListaCompras";

const Formulario = () => {

  const [valores, setValores] = useState({
    id: '',
    nombre: '',
    cantidad: '',
    precio: '',
  });

  const [valorBoton, setValorBoton] = useState('Agregar');

  const [compras, setCompras] = useState([]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setValores((prevValores) => ({
      ...prevValores,
      [name]: value,
    }));
  };

  const agregarCompra = (e) => {
    e.preventDefault();

    if (typeof (Storage) !== undefined) {

      const nuevaCompra = [...compras, valores];
      setCompras(nuevaCompra);

      localStorage.setItem('Compras', JSON.stringify(nuevaCompra));

      setValores({
        id: '',
        nombre: '',
        cantidad: '',
        precio: '',
      });
      setValorBoton('Agregar');
    }
  };

  //Verificar las compras guardas en Storage
  useEffect(() => {
    const comprasLocalStorage = JSON.parse(localStorage.getItem("Compras")) || [];
    setComprasGuardadas(comprasLocalStorage);
  }, []);

  //Calcular total 
  const calcularTotal = (compras) => {
    let total = 0;
    compras.forEach((compra) => {
      total += Number(compra.precio) * Number(compra.cantidad);
    });
    return total;
  };

  return (
    <>
      <form id="formulario" onSubmit={agregarCompra}>
        <label><h2>Ingresa Los datos de tu compra:</h2></label>
        <input type="number" name="id" id="id" placeholder="Ingrese el id del producto"  value={valores.id} onChange={manejarCambio} required />
        <input type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre del producto" value={valores.nombre} onChange={manejarCambio} required />
        <input type="number" name="cantidad" id="cantidad" placeholder="Ingrese la cantidad" value={valores.cantidad} onChange={manejarCambio} required />
        <input type="number" name="precio" id="precio" placeholder="Ingrese el precio del producto" value={valores.precio} onChange={manejarCambio} required />
        <input type="submit" class="boton" id="agregar" value={valorBoton} />
      </form>
      <ListaCompras
      />
    </>
  );
}

export default Formulario;
