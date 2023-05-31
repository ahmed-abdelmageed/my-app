import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'

export default function People() {

  let [people, setPeople] = useState([])
  let pageList = new Array(10).fill().map((item, index) => index + 1);

  async function getPeople(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=cb9d54251bfb16d22a9165b924cf3c91&page=${pageNumber}`)
    setPeople(data.results)
    console.log(data);
  }
  async function searchPeople(e) {
    if (e.target.value) {

      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=cb9d54251bfb16d22a9165b924cf3c91&page=1&query=${e.target.value}`)
      setPeople(data.results)
      console.log(data);
    }
    else {
      getPeople();
    }

  }

  useEffect(() => {
    getPeople(1)
  }, [])

  function onpagination(page) {
    console.log(page)
    getPeople(page)


  }

  return (
    <div className='container py-5'>
      <div className="row">
        <input type='text' onChange={searchPeople} className=' form-control bg-dark text-white mb-5 ' placeholder='search' />
        {people.map((item, index) => (
          <MediaItem key={index} item={item} type='people' />))}

      </div>
      <nav aria-label="Page navigation example" className=" d-flex">
        <ul className="pagination  d-flex mx-auto">
          {pageList.map((item) =>
            <li className="page-item" onClick={() => onpagination(item)} key={item}>
              <a className="page-link" >{item}</a>
            </li>

          )}

        </ul>
      </nav>
    </div>
  )
}
