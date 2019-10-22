import React from 'react';

import {Row, Col, Icon} from 'antd';

function IsLoading() {
    return (
        <div className="list">
            <div className="movie__list">
                <Row type="flex">
                    <Col span={12} className="movie_column_left">
                        {[1, 2, 3, 4, 5]
                            .map(i => (
                                <Col key={i} span={24}>
                                    <div className='movie'>
                                        <Icon type="loading" className="loading"/>
                                        <div className="img"/>
                                        <span className="title">...</span>
                                    </div>
                                </Col>
                            ))
                        }
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default IsLoading;
