import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'

export default function Tv() {

  let [tv, setTv] = useState([])
  let pageList = new Array(10).fill().map((item, index) => index + 1);

  async function getTv(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=cb9d54251bfb16d22a9165b924cf3c91&page=${pageNumber}`)
    setTv(data.results)
    console.log(data);
  }
  async function searchTv(e) {
    if (e.target.value) {

      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=cb9d54251bfb16d22a9165b924cf3c91&page=1&query=${e.target.value}`)
      setTv(data.results)
      console.log(data);
    }
    else {
      getTv();
    }

  }

  useEffect(() => {
    getTv(1)
  }, [])

  function onpagination(page) {
    console.log(page)
    getTv(page)


  }

  return (
    <div className='container py-5'>
      <div className="row">
        <input type='text' onChange={searchTv} className=' form-control bg-light text-white mb-5 ' placeholder='search' />
        {tv.map((item, index) => (
          <MediaItem key={index} item={item} type='tv'/>))}

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
