import React, { useEffect, useState } from 'react';
import axios from "axios"

const Principal = () => {
  const [opciones, setOpciones] = useState([]);
  const [selected, setSelected] = useState("");
  const [id, setId] = useState("1");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios.get("https://swapi.dev/api/")
      .then(response => response.data)
      .then(result => {
        let resList = []
        for (const [key, value] of Object.entries(result)) {
          resList.push({ label: key, url: value })
        }
        setOpciones(resList);
        setSelected(resList[0].url);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const createInfoObject = (selected, result) => {
    if (selected.includes("people")) {
      axios.get(result.homeworld)
        .then(resp => resp.data)
        .then(res => {
          setInfo({
            title: result.name,
            "Height": result?.height,
            "Hair color": result?.hair_color,
            "Birth year": result?.birth_year,
            "Homeworld": res?.name,
          })
        })
        .catch(err => {
          console.log(err);
        })
    } else if (selected.includes("planets")) {
        setInfo({
            title: result.name,
            "Population": result?.population,
            "Terrain": result?.terrain,
            "Climate": result?.climate,
            "Diameter": result?.diameter,
          })
    } else if (selected.includes("films")) {
        setInfo({
            title: result.title,
            "Release order": result?.episode_id,
            "Director": result?.director,
            "Opening crawl": result?.opening_crawl,
            "Release date": result?.release_date,
          })
    } else if (selected.includes("species")) {
        setInfo({
            title: result.name,
            "Classification": result?.classification,
            "Designation": result?.designation,
            "Language": result?.language,
            "Average lifespan": result?.average_lifespan,
          })
    } else if (selected.includes("vehicles") || selected.includes("starships")) {
      setInfo({
        title: result.name,
        "Model": result?.model,
        "Manufacturer": result?.manufacturer,
        "Crew": result?.crew,
        "Cargo capacity": result?.cargo_capacity,
      })
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let url = selected + id;
    axios.get(url)
      .then(response => response.data)
      .then(result => {
        setError(false);
        createInfoObject(selected, result);
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
            {
              Object.keys(info).map((key) => {
                return key === "title" 
                  ? <h2 key={key}>{info[key]}</h2> 
                  : <p key={key}>{key}: {info[key]}</p>
              })
            }
          </div>

      }
    </>
  )
}
export default Principal;