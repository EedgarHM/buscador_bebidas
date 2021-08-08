import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
   
    //state del provider
    const [idreceta,setIdReceta] = useState(null);
    const [bebidareceta,setReceta] = useState({});
    
    // Llamar a la api cuando ya se tiene una receta
    useEffect(()=>{
        const obtenerReceta = async () =>{
            if(!idreceta) return;
            
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const results = await axios.get(url);
            setReceta(results.data.drinks)
        }   
        obtenerReceta();
    },[idreceta])
    return(
        <ModalContext.Provider
        value={{bebidareceta,setIdReceta,setReceta}}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;