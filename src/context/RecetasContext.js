import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';


export const RecetasContext=createContext();

const RecetasProvider = (props) =>{
    const[recetas,setRecetas]=useState([]);
    const [busqueda,buscarRecetas] = useState({nombre:'',categoria:''});
    const [consultar,setConsultar]=useState(false);

    const {nombre,categoria} = busqueda;
    useEffect(()=>{
        if(consultar){
            const getApi =async ()=>{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const results = await axios.get(url)
                setRecetas(results.data.drinks)
            }
            getApi()
        }
        
    },[busqueda,categoria,consultar,nombre])
    return(
        <RecetasContext.Provider
        value={{recetas,buscarRecetas,setConsultar}}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;