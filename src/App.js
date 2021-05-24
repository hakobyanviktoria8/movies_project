import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import {Navbar} from "reactstrap";
import Home from "./Components/Home/Home";
import Movie from "./Components/Movie/Movie";

// require("bootstrap/less/bootstrap.less");

function App() {
    const url = "https://yts.mx/api/v2/list_movies.json";

    //loading state
    const [loading, setLoading] = useState(false);

    //pagination
    const [activePage, setActivePage] = useState(1);

    //all movies
    const [movies, setMovies] = useState([]);

    //single page movies array
    const [pageMoviesArr, setPageMoviesArr] = useState([]);

    const handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    };

    const printCarts = (movies) => {
        let newArr = [];
        let size = 4;
        for (let i = 0; i < movies.length; i += size) {
            newArr.push(movies.slice(i, i + size));
        }
        setPageMoviesArr(newArr);

    };

    useEffect(() => {
        //loading
        setLoading(true);

        const fetchData = async () => {
            try {
                await fetch(url)
                    .then(response => response.json())
                    .then(responseData => {
                            //loading
                            setLoading(false);

                            //all movies
                            setMovies(responseData.data.movies);

                            //print carts number
                            printCarts(responseData.data.movies);
                        }
                    )
            } catch (err) {
                alert(err.message)
            }
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <Router>
                <Navbar>
                    <Link to="/">Home</Link>
                </Navbar>

                <Switch>
                    <Route exact path="/">
                        <Home
                            movies={movies}
                            loading={loading}
                            pageMoviesArr={pageMoviesArr}
                            activePage={activePage}
                        />
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={activePage}
                            itemsCountPerPage={4}
                            totalItemsCount={movies.length}
                            pageRangeDisplayed={Math.ceil(pageMoviesArr.length)}
                            onChange={handlePageChange}
                        />
                    </Route>
                    <Route exact path="/movie/:name">
                        <Movie movies={movies}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
