import { Link } from "react-router-dom"
import Logo from "../../assets/images/logo.png"
import BackIcon from "../../assets/images/arrow_back.png"
import LeftIcon from "../../assets/images/left-arrow.png"
import PlayIcon from "../../assets/images/play_arrow.png"
import SaveIcon from "../../assets/images/save.png"

import "./shared.css"

const Header = () => {
    return (
        <header className="header d-flex f-justify-between">
            <div className="logo-header">
                <button className="btn btn-navigate-back" >
                    <img src={LeftIcon} alt="Back" />
                </button>
                <Link to="/" className="logo-icon-header">
                    <img src={Logo} alt="Logo"/>
                </Link>
            </div>
            <button className="btn button-navigate-header">
                <img src={BackIcon} alt="Back" />
            </button>

            <div className="title-header mr-a">
                <h4>Market analysis</h4>
            </div>

            <div className="options-header-right d-inline-flex">
                <div className="active-module">
                    <label className="custom-checkbox">
                        <input type="checkbox" name="check-active" />
                        <span className="checkbox-content">
                            <span className="checkbox-style"></span>
                            <span className="checkbox-text"></span>
                        </span>
                    </label>
                </div>
                <button className="btn play-automation">
                    <span className="img-item">
                        <img src={PlayIcon} alt="Play" />
                    </span>
                </button>
                <button className="btn save-automation">
                    <span className="img-item">
                        <img src={SaveIcon} alt="Save" />
                    </span>
                    <span>Save</span>
                </button>
            </div>
        </header>
    );
}
 
export default Header;