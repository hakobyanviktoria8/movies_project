import React from "react";
import "./Home.css";
import CarouselComp from "./Carusel";
import {Container, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";
import loader from "./../images/Spinner-1.gif";

function Home({loading, pageMoviesArr, activePage, movies}) {
    return (
        loading ?
            <div className={"loading"}>
                <img src={loader} alt=""/>
            </div>
            :
            <div>
                <CarouselComp movies={movies}/>
                <Container className={"Home"}>
                    <Row>
                        {
                            pageMoviesArr && pageMoviesArr.length > 0 &&
                            pageMoviesArr[activePage - 1].map(movie =>
                                <Col key={movie.id}>
                                    <img src={movie.medium_cover_image} alt=""/>
                                    <button>
                                        <Link to={"/movie/" + movie.slug}>See movie</Link>
                                    </button>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </div>
    )
}

export default Home