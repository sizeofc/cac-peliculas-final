let page = 1;
//obtengo los botones de paginacion
const btnSiguiente = document.getElementById('btn-siguiente');
const btnAtras = document.getElementById('btn-atras');

//asigno eventos click para llamar a las funciones para obtener peliculas
//  boton siguiente
btnSiguiente.addEventListener('click', e => {
    nextPage();
    fetchMovies(page);
});
//boton atras
btnAtras.addEventListener('click', e => {
    if (page == 1);
    else {
        backPage();
        fetchMovies(page);
    }
})

//funciones para cambiar el numero de pagina
function nextPage() {
    page++;
}


function backPage() {
    if (page == 1);
    else page--;
}

//funcion que se conecta a la api de themoviedb.org y trae las tendencias
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjZkMTNhMmVlNWRkZWQ3NTIzYjJjZTQ5OGIxMjE2ZCIsInN1YiI6IjY2NDczZGQzZjYwZmZlZWVmMjkyMWZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7I8qiPCyFQRewe70yOrotvSIPsajFq7ZK_w1pQTgUE'
    }
};

async function fetchMovies(page = 1) {
    console.log('page en fetchmovie:' + page);
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { results } = data;

        const listMovies = results.map(movie => {
            return `
                <div class="card-tendencia">
                    <a href="detalle.html?id=${movie.id}">
                        <img src="http://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}" alt="${movie.title}" loading="lazy">
                        <p>${movie.title}</p>
                    </a>
                </div>
            `;
        }).join(''); // Unir los elementos del array en un solo string

        document.getElementById('tendencias').innerHTML = listMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.getElementById('tendencias').innerHTML = '<p>Failed to load movies. Please try again later.</p>';
    }
}

fetchMovies();


//funcion que trae lo mas aclamado de la api


async function fetchMoreRated() {
    const resp = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1', options)
    const data = await resp.json();
    const { results } = data;

    const listRated = results.map(movie => {
        return `
        <a href="detalle.html?id=${movie.id}">
            <img src="http://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path}" alt="${movie.title}" loading="lazy">
        </a>
        `
    }).join('');
    document.getElementById('carrucel').innerHTML = listRated;

}

fetchMoreRated();

 // Obtener el nombre de usuario desde localStorage
        var nombreUsuario = localStorage.getItem('usuario');

        // Mostrar el nombre de usuario en la página
        if (nombreUsuario) {
            document.getElementById('nombreUsuario').textContent = nombreUsuario;
            document.getElementById('message').style.display = 'block';
        } else {
            document.getElementById('nombreUsuario').style.display = 'none';
            document.getElementById('boton_login').style.display = 'block';
        }
        
        document.addEventListener('DOMContentLoaded',(event)=>{
             function getParameterByName(name) {
                            const urlParams = new URLSearchParams(window.location.search);
                            return urlParams.get(name);
                        }

                        // Obtener el parámetro 'exito'
                        const usuario = getParameterByName('usuario');
                       

                        // Si 'exito' es 'true', muestra el mensaje de éxito
                        if (usuario) {
                            document.getElementById('nombreUsuario').style.display = 'block';
                            document.getElementById('boton_login').style.display="none";
                        }
        })