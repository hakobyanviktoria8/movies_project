import React, {Fragment} from "react";
import "./Movie.css";
import {useParams} from "react-router-dom";
import {Container, Row, Col} from 'reactstrap';
import CommentList from "./Comment";
import Rating from "./Rating";

function Movie({movies}) {
    let {name} = useParams();
    let movie = movies.filter(x => x.slug === name);

    return (
        <Container className={"Movie"}>
            {movie && movie.map(item =>
                <Fragment key={item.id}>
                    <Row>
                        <Col>
                            <img src={item.medium_cover_image} alt=""/>
                        </Col>
                        <Col>
                            <h2>{item.title}</h2>
                            <h5 className={"mt-4"}>{item.genres.join("/")}</h5>
                            <div className={"rating"}>
                                <h4>{item.rating}</h4>
                                <Rating rating={item.rating}/>
                            </div>
                            <p>Year: {item.year}</p>
                            <button><a href={item.url}>See source</a></button>
                        </Col>
                        <Col>
                            <p className={"mt-5"}>Size: {item.torrents.size}</p>
                            <p>Time: {item.runtime}</p>
                            <p>Lang: {item.language}</p>
                            <p>Date: {item.date_uploaded}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr/>
                            <p>{item.description_full || item.synopsis || item.summary}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CommentList id={item.id}/>
                        </Col>
                    </Row>
                </Fragment>
            )}
        </Container>
    )
}

export default Movie