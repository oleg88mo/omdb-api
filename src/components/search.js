import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Input, notification} from 'antd';

const {Search} = Input;

function SearchComponent(p) {
    const searchUrlAgain = p.searchUrlAgain;

    const [movies, setMovies] = useState([]);
    const [searchUrl, setSearchUrl] = useState('');
    const inputSearch = useRef();

    const prevLocalStorage = JSON.parse(window.localStorage.getItem('searchParam'));
    const prevLocalStorageName = prevLocalStorage ? prevLocalStorage.name : null;

    useEffect(() => {
        let mounted = true;

        //set focus into InputSearch
        inputSearch.current.focus();

        const loadData = async () => {
            if (mounted) {
                try {
                    const response = await axios.get(`http://www.omdbapi.com/?apikey=c1f398bc&s=${searchUrl}&page=${p.moviesPagination.pagination.pageNumber}`);

                    if (response.data.Response === 'False') {
                        openNotificationWithIcon('error', response.data.Error);
                        p.setLoading(false);
                    } else {
                        p.setLoading(false);
                        setMovies(response.data);
                        p.renderMovies(response.data);
                    }
                } catch (e) {
                    console.log('error:', e);
                    openNotificationWithIcon('error', e.message, `Something went wrong. In request 'http://www.omdbapi.com/' response not valid`);
                }
            }
        };

        if (searchUrl !== '') {
            loadData();
        }

        return () => {
            mounted = false;
        }
    }, [searchUrl, p.moviesPagination]);

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const onSearch = value => {
        const searchParam = JSON.parse(window.localStorage.getItem('searchParam'));

        if (value !== '' && searchUrl !== value) {
            p.setLoading(true);
            setSearchUrl(value);

            if (!searchParam) {
                localStorage.setItem('searchParam', JSON.stringify({...p.moviesPagination, name: value}));
            } else {
                localStorage.setItem('searchParam', JSON.stringify({...p.moviesPagination, name: value}));
            }
        }
    };

    if (searchUrlAgain !== '') {
        const searchParam = JSON.parse(window.localStorage.getItem('searchParam'));

        if (!searchParam) {
            onSearch(searchUrlAgain)
        } else {
            onSearch(searchParam.name)
        }
    }

    return (
        <div className="search">
            <Search
                placeholder="input movie name"
                enterButton="Search"
                size="large"
                ref={inputSearch}
                defaultValue={prevLocalStorageName ? prevLocalStorageName : null}
                onSearch={value => onSearch(value)}
            />
        </div>
    );
}

export default SearchComponent;