import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({ item }) {
    item.media_type = item.media_type?item.media_type:"tv"
    return <>

        <div className="col-md-2 cursor-pointer ">
            <Link to={`/itemdetails/${item.id}/${item.media_type}`}>
                <div className="movie position-relative rounded-3 bg-light shadow p-2">
                    {item.poster_path ?
                        <img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt='' /> :
                        <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100' alt='' />

                    }
                    <h3 className='h6 my-2 text-center'>{item.title} {item.name}</h3>
                    {item.vote_average && <div className="vote p-2 text-white position-absolute top-0 end-0 ">{item.vote_average?.toFixed(1)}</div>}

                </div>
            </Link>
        </div>
    </>
}
