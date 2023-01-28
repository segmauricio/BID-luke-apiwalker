import React, { useEffect, useState } from 'react';
import axios from "axios"

const Principal = () => {
    const [opciones, setOpciones] = useState([]);
    const [selected, setSelected] = useState("");
    const [id, setId] = useState("1");
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("https://swapi.dev/api/")
            .then(response => response.data)
            .then(result => {
                let resList = []
                for (const [key, value] of Object.entries(result)) {
                    resList.push({ label: key, url: value })
                }
                console.log(resList);
                setOpciones(resList);
                setSelected(resList[0].url);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    useEffect( () => {
        console.log(selected);
    }, [selected])

    const handleSearch = (e) => {
        e.preventDefault();
        let url = selected + id;
        axios.get(url)
            .then(response => response.data)
            .then(result => {
                setError(false);
                console.log(result);
                if (selected.includes("people")) {
                    console.log(result.homeworld);
                    axios.get(result.homeworld)
                        .then(resp => resp.data)
                        .then(res => {
                            console.log(res);
                            result.planet = res;
                            console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }

    return (
        <>
            <h1>Ruta principal</h1>
            <form onSubmit={handleSearch}>
                <label className='search-label'>Search for: </label>
                <select className='categories' selected={selected} onChange={(e) => setSelected(e.target.value)} >
                    {
                        opciones.map((item, index) =>
                            <option key={item.label + index} value={item.url}>&#128104; {item.label}</option>)
                        
                    }
                </select>
                <label>Id</label>
                <input className='id-selector' type="number" value={id} onChange={(e) => setId(e.target.value)} />
                <button type="submit" className='search-btn'>Search</button>
            </form>
            {
                error ?
                    <div>
                        <p>Estos no son los droides que está buscando</p>
                        <img height="145px" width="145px" src='https://lumiere-a.akamaihd.net/v1/images/databank_jedimindtrick_01_169_a491266d.jpeg?region=425%2C0%2C878%2C878'></img>
                    </div>
                    :
                    <div>
                        <h1>{}</h1>
                        "Si la solicitud es exitosa, envíe al menos cuatro atributos que fueron devueltos por la API."
                    </div>
                    
            }
        </>
    )
}
export default Principal;