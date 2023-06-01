import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import Carousel from 'react-bootstrap/Carousel';

import Style from './Home.module.css';

export default function Home() {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPeople, setTrendingPeople] = useState([])

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=cb9d54251bfb16d22a9165b924cf3c91`)
    callback(data.results)
    console.log(data.results);
  }

  useEffect(() => {
    getTrending('movie', setTrendingMovies);
    getTrending('tv', setTrendingTv);
    getTrending('person', setTrendingPeople);


  }, [])


  return (
    <>
      <Carousel className='w-100'>
        <Carousel.Item interval={1000}>
          <img
            className=" w-100"
            src="https://cdn.wallpapersafari.com/85/8/sr2kC0.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>New Movies</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className=" w-100"
            src="https://i.pinimg.com/originals/ee/5a/85/ee5a852271f85682793cc7ec3927dd8b.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>New Movies</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            src="https://i.kinja-img.com/gawker-media/image/upload/s--X3K3SC_e--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/ofhsfygojiy6xsqpkrms.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>New Movies</h3>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container px-5 ">


        <div className="row py-5">
          <div className="col md-4 d-flex align-items-center ">
            <div>
              <div className="brdr bg-danger w-25 mb-3"></div>
              <h2 className='h5'>Trending Movies <br /> To Watch Right Now</h2>
              <p>Most Watched Movies </p>
              <div className="brdr bg-danger w-100 mt-3"></div>
            </div>


          </div>
          {trendingMovies.slice(0, 11).map((item, index) => <MediaItem key={index} item={item} />)}
        </div>


        <div className="row py-5">
          <div className="col md-4 d-flex align-items-center ">
            <div>
              <div className="brdr bg-danger w-25 mb-3"></div>
              <h2 className='h5'>Trending TV <br /> To Watch Right Now</h2>
              <p>Most Watched TV Series </p>
              <div className="brdr bg-danger w-100 mt-3"></div>
            </div>

          </div>
          {trendingTv.slice(0, 11).map((item, index) => <MediaItem key={index} item={item} />)}
        </div>


        <div className="row">
          <div className="col md-4 d-flex align-items-center ">
            <div>
              <div className="brdr bg-danger w-25 mb-3"></div>
              <h2 className='h5 '>Trending People <br /> To Watch Right Now</h2>
              <p >Most People Trending This Week </p>
              <div className="brdr bg-danger w-100 mt-3"></div>
            </div>

          </div>
          {trendingPeople.filter((person) => person.profile_path !== null).slice(0, 11).map((item, index) => <MediaItem key={index} item={item} />)}
        </div>
      </div>
    </>
  )
}
