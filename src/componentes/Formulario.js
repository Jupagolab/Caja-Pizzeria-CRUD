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
  const [editarCompras, setEditarCompras] = useState(null);

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

      if (comprasGuardadas !== null){
        //comprobamos si el id del producto de la compra que queremos agregar, exista ya en el arreglo de localStorage
        const comprobarCompra = comprasGuardadas.filter(compra => compra.id == valores.id);
        if (comprobarCompra.length > 0){
          if (valores.id === (comprobarCompra.find(compra => compra.id == valores.id)).id) {
            switch (valorBoton){
              case "Agregar":
                //si existe, que devuelva una alerta
                return alert(`Ya existe un producto con el id: ${valores.id} en la lista de compra.`);
              case "Editar":
                const i = comprasGuardadas.findIndex(compra => compra.id == valores.id);
                comprasGuardadas[i].nombre = valores.nombre;
                comprasGuardadas[i].cantidad = valores.cantidad;
                comprasGuardadas[i].precio = valores.precio;
                
                localStorage.setItem("Compras", JSON.stringify(comprasGuardadas));
                setValorBoton("Agregar");
                setValores({
                  id: '',
                  nombre: '',
                  cantidad: '',
                  precio: '',
                });
                return alert("Compra modificada exitosamente");              
            }
          }
        }
      }

      //Si no detecta registros con el mismo id, registrar la compra normalmente
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

  const [comprasGuardadas, setComprasGuardadas] = useState([]);

  //Verificar las compras guardas en Storage
  useEffect(() => {
    const comprasLocalStorage = JSON.parse(localStorage.getItem("Compras")) || [];
    setComprasGuardadas(comprasLocalStorage);
  }, []);

  //Funcion para eliminar compra
  const eliminarCompra = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar el elemento?")) {
      const nuevasCompras = comprasGuardadas.filter(compra => compra.id !== id);
      localStorage.setItem("Compras", JSON.stringify(nuevasCompras));
      setComprasGuardadas(nuevasCompras);
      alert("Compra eliminada exitosamente");
    }
  };

  //Al hacer click en el boton de editar en el componente de la lista, cambiar los estados de los valores 
  useEffect(() => {
    if (editarCompras !== null) {
      setValorBoton('Editar');
      setValores(editarCompras);
    }
  }, [editarCompras])

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
        compras={comprasGuardadas}
        eliminarCompra={eliminarCompra}
        calcularTotal={calcularTotal}
        editarCompra={setEditarCompras}
      />
    </>
  );
}

export default Formulario;
