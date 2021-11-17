import Tutorial from './Tutorial'
import React,{useState, useEffect} from 'react'
import AltaTutorial from './AltaTutorial'
//Tutoriales es la generacion de tareas 
const Tutoriales = () =>{
    //se renderisa automaticamente ,variable de estado,hook 
    const[tutoriales,setTutoriales]=useState([])
    //cada vez que hay cambio realiza setcambio
    const[hayCambio, setHayCambio]=useState(false)


    useEffect( ()=>{
        //primer parametro
        fetch('http://localhost:5000/tutoriales')
        .then(res=>res.json())//tengo una respuesta,convierto el json
        .then(datos => setTutoriales(datos))//la salvo en datos en settuto
        //segundo parametro
    },[hayCambio])

    const agregarTutorial =(nombre,url,tipo)=>{
        const opciones={
            //llamo a la api con el metodo post 
            method: 'POST',
            headers: {'Content-Type':'application/json'},//tipo de dato que enviamos
            //parate que enviamos en el body cuando lo realizamos en postman 
            body:  JSON.stringify({nombreTutorial:nombre,
                                     tipoTutorial:tipo,
                                        url:url})
        }
        //llamo a la url, con el objeto 
        fetch('http://localhost:5000/tutoriales',opciones)
        .then(res=>res.json())
        .then(datos=>setHayCambio(!hayCambio))//cambiar la variable cambio hace que se refreque la pagina 
      //al cambiarla lo relee de nuevo 
    }
   
        const activarTutorial=(index)=>{
            const opciones={
                method:'PUT'
            }
            fetch(`http://localhost:5000/tutoriales/${index}/activar`,opciones)
            .then(res=>res.json())
            .then(datos=>setHayCambio(!hayCambio))
           
        }
         const borrarTutorial=(index)=>{
             //como segundo parametro 
            fetch(`http://localhost:5000/tutoriales/${index}`,{method:'DELETE'})
            .then(res=>res.json())
            //produce el efecto de leer los datos de nuevo,renderizacion  
            .then(datos=>setHayCambio(!hayCambio))
        
        }
    return(
        <div>
            <div className="tutoriales">
                {tutoriales.map(
                    (el, idx)=>{return (<Tutorial key={idx} indice={el.id} tutorial={el} desactivarTutorial={activarTutorial} borrarTutorial={borrarTutorial}/> )}
                )}
            </div>
            <br/>
            <AltaTutorial agregarTutorial={agregarTutorial }/>
        </div>
    )
}
export default Tutoriales