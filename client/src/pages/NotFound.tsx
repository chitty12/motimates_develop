import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/scss/pages/notFound.scss';

export default function NotFound() {
    return (
        <div className="section err-section">
            <div className="errMsg-div">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <div className="errImg-div">
                <img
                    src="/asset/images/errRabbit.png"
                    alt="errRabbit"
                    id="errRabbit-img"
                />
            </div>
            <div className="errBtn-div">
                <Link to="/">
                    <button id="err-btn">RETURN</button>
                </Link>
            </div>
        </div>
    );
}
