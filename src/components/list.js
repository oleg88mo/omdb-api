import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

// components
import SelectedMovie from './selectedMovie'
import ItemList from './itemList'

import {Row, Col, Pagination} from 'antd';

function SearchComponent(p) {
    const prevLocalStorage = JSON.parse(window.localStorage.getItem('searchParam'));
    const prevLocalStorageCurrentPagination = prevLocalStorage ? prevLocalStorage.pagination.pageNumber : null;

    return (
        <div className="list">
            <Router>
                <div className="movie__list">
                    <Row type="flex">
                        <Col span={12} className="movie_column_left">
                            {p.movies && p.movies.Search && p.movies.Search.sort((a, b) => a.Title.localeCompare(b.Title))
                                .map((movie, i) => (
                                    <div key={movie.imdbID}>
                                        <ItemList
                                            movie={movie}
                                            i={i + 1}
                                            moviesPagination={p.moviesPagination}
                                        />
                                    </div>
                                ))
                            }
                        </Col>
                        <Col span={12} className="movie_column_right">
                            <Switch>
                                <Route path="/movie">
                                    <Movie getMoviesAgain={p.getMoviesAgain}/>
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </div>
                {p.movies && p.movies.Search && (
                    <div className="movie__pagination">
                        <Row type="flex" justify="end">
                            <Pagination
                                // hideOnSinglePage
                                showTotal={p.showTotal}
                                onChange={p.onChangePagination}
                                defaultCurrent={1}
                                className="pagination"
                                total={p.movies && Number(p.movies.totalResults)}
                                current={prevLocalStorageCurrentPagination ? prevLocalStorageCurrentPagination : p.moviesPagination.pagination.pageNumber}
                                pageSizeOptions={['5', '10', '15']}
                            />
                        </Row>
                    </div>)}
            </Router>
        </div>
    );
}

function Movie(p) {
    window.localStorage.removeItem('movieId');
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:movieId`}>
                <SelectedMovie
                    movieId={`${match.path}/:movieId`}
                    getMoviesAgain={p.getMoviesAgain}
                />
            </Route>
        </Switch>
    );
}

export default SearchComponent;
