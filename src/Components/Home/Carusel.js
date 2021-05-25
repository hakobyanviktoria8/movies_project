import React from 'react';
import "./Carusel.css";
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core';
import {Link} from "react-router-dom";

function CarouselComp({movies}) {
    // console.log(movies);

    return (
        <Carousel style={{height: "96vh"}}>
            {
                movies.map((movie) =>
                    <Paper key={movie.id} className={"homeTop"}>
                        <img src={movie.background_image_original} alt=""/>
                        <h2>{movie.title}</h2>
                        <p>{movie.summary.length > 100 ? movie.summary.slice(0, 100) + "..." : movie.summary}</p>
                        <button className="seeMore"><Link to={"/movie/" + movie.slug}>See movie</Link></button>
                        <button className={"seeSource"}><a href={movie.url}>See source</a></button>
                    </Paper>
                )
            }
        </Carousel>
    )
}

export default CarouselComp
