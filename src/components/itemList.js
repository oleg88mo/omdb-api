import React from 'react';
import {
    Link
} from "react-router-dom";

import {Icon, Tag} from 'antd';

function ItemList(p) {
    const number = p.moviesPagination.pagination.pageNumber * p.moviesPagination.pagination.pageSize + p.i - p.moviesPagination.pagination.pageSize;

    return (
        <div className='movie'>
            <span className="number" title={number}>{number}</span>
            <div className="img">
                {p.movie.Poster !== 'N/A'
                    ? <img src={p.movie.Poster} alt={p.movie.Title}/>
                    : <Icon type="warning"/>
                }
            </div>
            <div className="info">
                {p.movie.Title && (<p className="title">
                    <Link to={`/movie/${p.movie.imdbID}`}>{p.movie.Title}</Link>
                </p>)}
                <p>
                    {p.movie.Year && (<span className="year">
                        <Tag color="magenta">{p.movie.Year}</Tag>
                    </span>)}
                    {p.movie.Type && (<span className="type">
                        <Tag color={`${p.movie.Type === 'movie' ? '#f50' : '#108ee9'}`}>{p.movie.Type}</Tag>
                    </span>)}
                </p>
            </div>
        </div>
    );
}

export default ItemList;
