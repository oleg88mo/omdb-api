import React, {useState, useEffect} from 'react';

import 'antd/dist/antd.css';
import './index.css';

// components
import SearchComponent from './components/search';
import List from './components/list';
import IsLoading from './components/isLoading';

function App() {
    const searchParam = JSON.parse(window.localStorage.getItem('searchParam'));

    let mark = false;

    const [searchUrlAgain, setSearchUrlAgain] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [moviesPagination, setMoviesPagination] = useState({
        pagination: {
            pageNumber: 1,
            pageSize: 10,
        },
    });

    if (searchParam) {
        mark = true;
    }

    useEffect(() => {
        if (mark) {
            setMoviesPagination({
                pagination: {
                    pageNumber: searchParam.pagination.pageNumber,
                    pageSize: searchParam.pagination.pageSize,
                }
            });
            setSearchUrlAgain(searchParam.name);
            mark = false;
        }
    }, []);

    const renderMovies = arrayOfMovies => setMovies(arrayOfMovies);

    const setLoading = load => setIsLoading(load);

    const onChangePagination = pageNumber => {
        const searchParam = JSON.parse(window.localStorage.getItem('searchParam'));

        setMoviesPagination({
            pagination: {
                pageNumber,
                pageSize: moviesPagination.pagination.pageSize,
            }
        });

        if (searchParam) {
            localStorage.setItem('searchParam', JSON.stringify({
                pagination: {
                    pageNumber,
                    pageSize: moviesPagination.pagination.pageSize,
                }, name: searchParam.name
            }));
        }
    };

    const showTotal = (total, range) => (<div className="showing__pagination">
        showing
        <b>{' '}
            {range[0]}-{range[1]}
        </b>{' '}
        of{' '}
        <b>{total}</b>
    </div>);

    const getMoviesAgain = () => {
        const searchParam = JSON.parse(window.localStorage.getItem('searchParam'));

        setSearchUrlAgain(searchParam.name)
    };

    return (
        <div className="app">
            <SearchComponent
                renderMovies={renderMovies}
                moviesPagination={moviesPagination}
                setLoading={setLoading}
                searchUrlAgain={searchUrlAgain}
            />
            {isLoading ? <IsLoading/> : <List
                movies={movies}
                onChangePagination={onChangePagination}
                showTotal={showTotal}
                moviesPagination={moviesPagination}
                getMoviesAgain={getMoviesAgain}
            />}
        </div>
    );
}

export default App;
