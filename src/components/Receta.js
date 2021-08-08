import React,{useContext,useState} from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // configuracion del modal de UI 
    const [modalStyle] = useState(getModalStyle);
    const [open,setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    const {bebidareceta,setIdReceta,setReceta} = useContext(ModalContext);

    console.log(bebidareceta)
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>
                <div className="card-body">
                    <button 
                        type="button" 
                        className="btn btn-block btn-primary"
                        onClick={()=>{
                            setIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                        >
                            
                        Ver Receta
                    </button>
                    <Modal
                            open={open} 
                            onClose={() => {
                                setIdReceta(null);
                                setReceta({})
                                handleClose();
                        }}
                        >
                        <div style={modalStyle} className={classes.paper}>
                           <h2>{bebidareceta.strDrink}</h2>
                           <h3 className="mt-4">Instrucciones</h3>
                           <p>{bebidareceta.strInstructions}</p>
                           <img className="img-fluid my-4" src={bebidareceta.strDrinkThumb} alt={`Imagen de ${bebidareceta.strDrink}`}/>

                        </div>
                    </Modal>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Receta;