import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
//Crear el context
export const CategoriasContext = createContext();

//Creando el provider (Donde se encuentran las funciones yt state)
const CategoriasProvider = (props) => {
  //Crear el state del context
  const [categorias, setCategorias] = useState([]);

  // Llamado a la api
  useEffect(()=>{
    const getApiCategorias = async () =>{
        const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
        const result = await axios.get(url);
        setCategorias(result.data.drinks)
    }
    getApiCategorias()
  },[])

  // en el value va todo lo que se quiere pasar a los componentes, por ejemplo los states
  return (
    <CategoriasContext.Provider value={{ categorias}}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
