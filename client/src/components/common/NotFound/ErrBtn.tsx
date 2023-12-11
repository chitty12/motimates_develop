import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrBtn() {
    return (
        <div>
            <Link to="/">
                <button id="err-btn">RETURN</button>
            </Link>
        </div>
    );
}
