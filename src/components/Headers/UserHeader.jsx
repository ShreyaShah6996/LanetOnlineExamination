import React from "react";
import './userHeader.css';
import lanetlogo from '../../assets/img/brand/logo_lanetteam.png';

class UserHeader extends React.Component {
    render() {
        return (
            <>
            <div className="header bg-gradient-lanetteam">
                <img src={lanetlogo} alt="lanet logo" /><br />
            </div>
            </>
        );
    }
}

export default UserHeader;