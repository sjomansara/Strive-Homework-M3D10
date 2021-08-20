const params = new URLSearchParams(location.search)
console.log(params)
const movieId = params.get("id")
console.log("movieId is: ", movieId)
const movieCategory = params.get("catgory")
console.log("movieCategory is: ", movieCategory)
let results = []

const getMovie = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2Mjk0NTIxNTQsImV4cCI6MTYzMDY2MTc1NH0.S8Gl9mtXGAYHdVRvPHYUzL4mfMV5WCSJ6ss_4hIbm3o",
            }
        })

        const allMovies = await response.json()
        return allMovies

    } catch(error){
        console.log(error)
    }
}

const handleSubmit = async function(event) {
    event.preventDefault()

    const url = movieId ? "https://striveschool-api.herokuapp.com/api/movies/" + movieId : "https://striveschool-api.herokuapp.com/api/movies/"

    const newMovie = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("image").value,
    }

    console.log(newMovie)

    const method = movieId ? "PUT" : "POST"

    try {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(newMovie),
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2Mjk0NTIxNTQsImV4cCI6MTYzMDY2MTc1NH0.S8Gl9mtXGAYHdVRvPHYUzL4mfMV5WCSJ6ss_4hIbm3o",
                "Content-Type": "application/json",
            }
        })

        if(response.ok){
            const movieResponse = await response.json()
            return movieResponse
        }

    } catch (error){
        console.log(error)
    }finally{
        console.log("Movie submitted")
    }
}

window.onload = async () => {
    console.log("movieCategory is: ", movieCategory)
    const submitButton = document.getElementById("submitButton")

    let editPage = document.getElementById("editPage")
    let span = submitButton.querySelector("span")

    if (movieId) {
        editPage.innerText = "Edit Movie"
        span.innerText = "Save"
    }

    let endpointString = "https://striveschool-api.herokuapp.com/api/movies/"
    if (movieId) {
        endpointString += movieId
    }

    const response = await fetch(endpointString, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGNkODJkNTI2MjAwMTViNmRkMTEiLCJpYXQiOjE2Mjk0NTIxNTQsImV4cCI6MTYzMDY2MTc1NH0.S8Gl9mtXGAYHdVRvPHYUzL4mfMV5WCSJ6ss_4hIbm3o",
        }
    })

    const movieDetails = await response.json()
    console.log("movie details is: ", movieDetails)
    
    if (movieId) {
        document.getElementById("name").value = movieDetails.name
        document.getElementById("description").value = movieDetails.description
        document.getElementById("category").value = category.category
        document.getElementById("image").value = movieDetails.imageUrl
    }
}

