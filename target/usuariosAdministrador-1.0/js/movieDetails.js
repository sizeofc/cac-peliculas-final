
//funcion que se conecta a la api de themoviedb.org y trae las tendencias
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjZkMTNhMmVlNWRkZWQ3NTIzYjJjZTQ5OGIxMjE2ZCIsInN1YiI6IjY2NDczZGQzZjYwZmZlZWVmMjkyMWZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7I8qiPCyFQRewe70yOrotvSIPsajFq7ZK_w1pQTgUE'
    }
};


// Obtiene los parámetros de la URL
const params = new URLSearchParams(window.location.search);
// Obtiene el valor del parámetro 'id'
const id = params.get('id');


const movie_id=id;
async function fetchDetails() {
    try {

        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=es-ES`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const results  = data;

        const movieDetails = `
            <div class="movie_container">
                        <img src="http://image.tmdb.org/t/p/w600_and_h900_bestv2/${results.backdrop_path}" alt="${results.title}" loading="lazy">
                        <div class="movie_details">
                            <h1>${results.title}
                            <p>${results.overview}<p>
                        </div>

                </div>

                
            `

        document.getElementById('detalle').innerHTML = movieDetails;
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.getElementById('detalle').innerHTML = '<p>Failed to load movies. Please try again later.</p>';
    }
}

fetchDetails();


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