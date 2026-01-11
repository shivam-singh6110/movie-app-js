let movies = [];


async function loadMovies() {
  try {
    const response = await fetch('netflix_titles_100.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    movies = await response.json();
    console.log("Movies loaded:", movies.length);
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

loadMovies();


// DISPLAY MOVIES
function renderMovies(list) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <h3>${movie.title}</h3>
      <p><b>Type:</b> ${movie.type}</p>
      <p><b>Genre:</b> ${movie.listed_in || "N/A"}</p>
      <p><b>Year:</b> ${movie.release_year}</p>
      <p><b>Rating:</b>${movie.rating}</p>
      <p><b>Duration:</b>${movie.duration}</p>
      <p><b>Release year:</b>${movie.release_year}</p>
    `;

    container.appendChild(card);
  });
}


function showRecommended() {
  const recommended = movies.filter(movie =>
    movie.type === "Movie" &&
    movie.listed_in &&
    movie.rating>=9.0
  );

  renderMovies(recommended);
}


function showAll() {
  renderMovies(movies);
}

