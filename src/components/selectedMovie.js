import React, {useState, useEffect} from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import axios from 'axios';

import {Row, Col, Icon, Button, Empty} from 'antd';

function SelectedMovie(p) {
    const [thisMovie, setThisMovie] = useState(null);
    const [thisMovieUrl, setThisMovieUrl] = useState(null);
    const {movieId} = useParams();

    useEffect(() => {
        let mounted = true;

        const loadMovieData = async () => {
            if (mounted) {
                try {
                    const response = await axios.get(`http://www.omdbapi.com/?apikey=c1f398bc&i=${thisMovieUrl}`);

                    if (response.data) {
                        setThisMovie(response.data);
                        p.getMoviesAgain()
                    }
                } catch (e) {
                    console.log('error:', e);
                }
            }
        };

        if (thisMovieUrl !== '') {
            loadMovieData();
        }

        return () => {
            mounted = false;
        }

    }, [thisMovieUrl]);

    if (movieId !== null) {
        const isMovieId = window.localStorage.getItem('movieId');

        if (!isMovieId) {
            window.localStorage.setItem('movieId', movieId);
            setThisMovieUrl(isMovieId)
        } else {
            try {
                setThisMovieUrl(isMovieId)
            } catch (e) {
                console.log('error:', e)
            }
        }
    }

    const goBack = () => {
        window.localStorage.removeItem('movieId');
    };

    return (
        <>
            {thisMovie ? (
                <div className="selected_movie">
                    <Row>
                        <Col span={8}>
                            <div className="img">
                                {thisMovie.Poster !== 'N/A'
                                    ? <img src={thisMovie.Poster} alt={thisMovie.Title}/>
                                    : <Icon type="warning"/>
                                }
                            </div>
                        </Col>
                        <Col span={16} className="detail">
                            {thisMovie.Title && <h1>{thisMovie.Title}</h1>}
                            <Link to='/' onClick={goBack}>
                                <Icon type="close-circle" className="back"/>
                            </Link>
                            <div className="information">
                                {thisMovie.Genre !== 'N/A' && <p><b>Genre:</b> {thisMovie.Genre}</p>}
                                {thisMovie.Released !== 'N/A' && <p><b>Released:</b> {thisMovie.Released}</p>}
                                {thisMovie.Country !== 'N/A' && <p><b>Country:</b> {thisMovie.Country}</p>}
                                {thisMovie.Language !== 'N/A' && <p><b>Language:</b> {thisMovie.Language}</p>}
                                {thisMovie.BoxOffice !== 'N/A' && <p><b>BoxOffice: </b>{thisMovie.BoxOffice}</p>}
                                {thisMovie.Rated !== 'N/A' && <p><b>Rated: </b>{thisMovie.Rated}</p>}
                                {thisMovie.Actors !== 'N/A' && <p><b>Actors:</b> {thisMovie.Actors}</p>}
                                {thisMovie.Director !== 'N/A' && <p><b>Director:</b> {thisMovie.Director}</p>}
                                {thisMovie.imdbRating !== 'N/A' && <p><b>IMDB Rating:</b> {thisMovie.imdbRating}</p>}
                            </div>
                        </Col>
                        <Col span={24} style={{marginTop: '20px'}}>
                            {thisMovie.Plot !== 'N/A' && <>
                                <h2>Plot</h2>
                                <h4>{thisMovie.Plot}</h4>
                            </>}

                            <a href={`http://imdb.com/title/${thisMovie.imdbID}`} className="ant-btn ant-btn-default" target="_blank">View on IMDB</a>{' '}
                            <Button type="primary" onClick={goBack}>
                                <Link to='/'>Close Selected Movie</Link>
                            </Button>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div className="selected_movie">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                </div>
            )}
        </>
    )
}

export default SelectedMovie;
