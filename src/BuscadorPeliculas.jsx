import React, { useState } from 'react';

export default function BuscadorPeliculas() {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const APIKEY = '38ba91e1d82d322f1cfb337b1ff8d2d7'

    const [busqueda,setBusqueada] = useState('');
    const [peliculas,setPeliculas] = useState([])

    const handleInputChange = (event) =>{
        setBusqueada(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        fetchPeliculas();
    }

    const fetchPeliculas = async () =>{
        try{
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${APIKEY}`)
            const data = await response.json();
            
            setPeliculas(data.results)
        }catch(error){
            console.log('Se encontro un error:',error)
        }
    }

  return (
    <div className='container'>
        <h1 className='title'>Buscador de Peliculas</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder='Escribí una película'
            value={busqueda}
            onChange={handleInputChange}
            />
            <button type='submit' className='search-button'>Buscar</button>
        </form>

        <div className='movie-list'>
            {
                peliculas.map((pelicula)=>{
                    return(
                        <div key={pelicula.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
                            <h2>{pelicula.title}</h2>
                            <p>{pelicula.overview}</p>

                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
