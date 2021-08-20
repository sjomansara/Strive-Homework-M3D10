const getAllCategories = async () => {
    const url = "https://striveschool-api.herokuapp.com/api/movies/"
    try {
        const response = await fetch (url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2Mjk0NTIxNTQsImV4cCI6MTYzMDY2MTc1NH0.S8Gl9mtXGAYHdVRvPHYUzL4mfMV5WCSJ6ss_4hIbm3o",
            }
        })
        const allCategories = await response.json()
        // console.log("allCategories is: ", allCategories)

        return allCategories
    } catch (error) {
        console.log(error)
    } finally {
        console.log("Movies uploaded successfully")
    }
}

const getAllMovies = async () => {
    const categories = await getAllCategories()
    let movieList = []
    console.log("genres is: ", categories[0])
    for (let i = 0; i < categories.length; i++) {
        const url = "https://striveschool-api.herokuapp.com/api/movies/" + categories[i]
        try {
            const response = await fetch (url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2Mjk0NTIxNTQsImV4cCI6MTYzMDY2MTc1NH0.S8Gl9mtXGAYHdVRvPHYUzL4mfMV5WCSJ6ss_4hIbm3o",
                }
            })
            const allMoviesInCategory = await response.json()
            console.log("allMoviesInCategory is: ", allMoviesInCategory)
            let container = document.getElementById("fluidContainer")
            let heading = document.createElement("h4")
            heading.className = "text-white mb-2 mt-4"
            heading.innerText = categories[i]
            let division = document.createElement("div")
            division.className = "row no-gutters text-center"

            for (let j = 0; j < allMoviesInCategory.length; j++) {
                let template = `<div class="card m-3 text-light ml-2 movieCard" id="${allMoviesInCategory[j]._id}">
                <a href="/details.html?id=${allMoviesInCategory[j]._id}"><img id="cardImg" class="card" src="${allMoviesInCategory[j].imageUrl}" alt=""></img></a>
                  <div class="card-body">
                    <h5 class="card-title">${allMoviesInCategory[j].name}</h5>
                            <p class="card-text">Description: ${allMoviesInCategory[j].description}</p>
                            <button type="button" class="btn btn-danger" id="deleteButton" onclick="deleteMovie('${allMoviesInCategory[j]._id}')">Delete</button>
                            <a href="/backoffice.html?id=${allMoviesInCategory[j]._id}&category=${allMoviesInCategory[j].category}" class="btn btn-dark btn-outline-light" id="editButton">Edit</a>
                  </div>
                  </div>`
                division.innerHTML = template
            }
            container.appendChild(heading)
            container.appendChild(division)
            console.log(heading)
            console.log(division)
        } catch (error) {
            console.log(error)
        } finally {
            console.log("Movies uploaded successfully")
        }
    }
    return movieList
}

window.onload = async () => {
    const allMovies = await getAllMovies()
    console.log("allMovies is: ", allMovies)
    // console.log("allMovies is: ", allMovies)
    displayMovie(allMovies)

    // let allGenres = await 
    // console.log("get all movies function ", await getAllMovies())
}

const displayMovie = (movies) => {
    let displayMovies = document.querySelector("#movieRow")
    console.log("displayMovies: ", displayMovies)
    console.log("movies is: ", movies)
    movies.forEach(movie => {
        console.log(movie._id)
        // console.log(deleteMovie(movie._id))
        displayMovies.innerHTML += 
        `<div class="card m-3 movieCard" id="${movie._id}">
        <a href="/details.html?id=${movie._id}"><img id="cardImg" class="card m-4" src="${movie.imageUrl}" alt=""></img></a>
          <div class="card-body">
            <h5 class="card-title">${movie.name}</h5>
                    <p class="card-text">Category: ${movie.category}</p>
                    <p class="card-text">Description: ${movie.description}</p>
                    <a href="/backoffice.html?id=${movie._id}&category=${movie.category}" class="btn btn-dark btn-outline-light" id="editButton">Edit</a>
                    <button type="button" class="btn btn-danger" id="deleteButton" onclick="deleteMovie('${movie._id}')">Delete</button>
          </div>
          </div>`
        
})
}

const deleteMovie = async function(id) {
    console.log(id)
    const url = "https://striveschool-api.herokuapp.com/api/movies/" + id
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2Mjk0NTIxNTQsImV4cCI6MTYzMDY2MTc1NH0.S8Gl9mtXGAYHdVRvPHYUzL4mfMV5WCSJ6ss_4hIbm3o",
          "Content-Type": "application/json",
        }
      })
      if (response.ok) {
        const deletedObj = await response.json()
        let movie = document.getElementById(id)
        movie.remove()
        // showAlert("success", "Event with id: " + deletedObj._id + " deleted successfully") // shows the custom alert
        // setTimeout(() => { window.location.assign("/") }, 3500) // pushes the user to the homepage after 3,5 seconds
      }
      // const deletedMovie = await response.json()
    } catch (err) {
        console.error(err)
    }

}




