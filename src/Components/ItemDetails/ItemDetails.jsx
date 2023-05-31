import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ItemDetails() {
    const [video, setVideo] = useState();
    let { id, media_type } = useParams();
    const [itemDetails, setItemDetails] = useState({})


    async function getItemDetails(id, media_type) {
        try {
            let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=cb9d54251bfb16d22a9165b924cf3c91`)
            setItemDetails(data);
        } catch (error) {
            console.error(error)
        }
    }

    async function getItemVideo(id, media_type) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=cb9d54251bfb16d22a9165b924cf3c91&language=en-US`);
        setVideo(data.results[0]?.key);
    }


    useEffect(() => {
        getItemDetails(id, media_type);
        getItemVideo(id, media_type);
    }, [])

    return (

        <>
            <div class=" container py-5  d-flex justify-content-center align-items-center">
                <div class="col-md-3 justify-content-center align-items-center">

                    <img src={'https://image.tmdb.org/t/p/w500' + itemDetails.poster_path} className='w-100' alt='' />
                </div>
                {/* <div className='col-9 col-xl-6'> */}

                {/* <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}

                {/* </div> */}


                <div class="mt-2 offset-1 col-md-7">
                    <h2>{itemDetails.title} {itemDetails.name}</h2>
                    <h5>{itemDetails?.tagline}</h5>
                    <ul className='list-unstyled d-flex'>
                        {itemDetails.genres?.map(genre => <div className='bg-info p-3 mx-2 rounded-2 '>{genre.name}</div>)}

                    </ul>
                    <p className='py-2 text-muted' >{itemDetails.overview}</p>
                    <h6 className='py-2 d-flex'>
                        Vote : {itemDetails.vote_average?.toFixed(1)}
                    </h6>
                    <h6 className='py-2 d-flex'>
                        Vote Count : {itemDetails.vote_count}
                    </h6>
                    <h6 className='py-2 d-flex'>
                        Release Date : {itemDetails?.release_date}
                    </h6>
                </div>
            </div>
        </>
    )
}
