import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Personas = (props) => {
    const [persona, setPersona] = useState({});

    useEffect(() => {
        axios.get("https://swapi.dev/api/people/"+props.match.params.id)
        .then(response=>response.data)
        .then(result => {
            console.log(result);
            setPersona(result);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return(
        <>
            <h1>Ruta Personas {props.match.params.id} </h1>
        </>
    )
}
export default Personas;