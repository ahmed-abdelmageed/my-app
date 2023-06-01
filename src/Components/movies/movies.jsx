import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'

export default function Movies() {

  let [movie, setMovie] = useState([])
  let pageList = new Array(10).fill().map((item, index) => index + 1);


  async function getMovie(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cb9d54251bfb16d22a9165b924cf3c91&page=${pageNumber}`)
    setMovie(data.results)
    console.log(data.results);
  }

  useEffect(() => {
    getMovie(1)
  }, [])

  function onpagination(page) {
    console.log(page)
    getMovie(page)

  }

  async function searchMovie(e) {
    if (e.target.value) {

      let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=cb9d54251bfb16d22a9165b924cf3c91&page=1&query=${e.target.value}`)
      setMovie(data.results)
      console.log(data);
    }
    else {
      getMovie();
    }

  }

  return (
    <div className='container py-5'>
      <div className="row">
      <input type='text' onChange={searchMovie} className=' form-control bg-light  text-white mb-5 ' placeholder='search' />
        {movie.map((item, index) => (
          <MediaItem key={index} item={item} media_type="movie" />))}

      </div>
       <nav aria-label="Page navigation example" className=" d-flex">
        <ul className="pagination  d-flex mx-auto">
          {pageList.map((item) =>
            <li className="page-item" onClick={()=> onpagination(item)} key={item}>
              <a className="page-link" >{item}</a>
            </li>

          )}

        </ul>
      </nav>
    </div>
  )
}
