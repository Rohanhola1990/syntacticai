import { NavLink } from "react-router-dom";

import Server from "../../assets/images/server.png"
import Builder from "../../assets/images/flow.png"
import Piechart from "../../assets/images/pie-chart.png"
import Note from "../../assets/images/writing.png"
import Notification from "../../assets/images/notifications.png"

const LeftMenu = () => {
    return (
        <div className="nav-menu-left d-flex f-column">
            <nav>
                <NavLink 
                    to="/dashboard" 
                >
                    D
                </NavLink>
                <NavLink 
                    to="/server" 
                    >
                        <img src={Server} alt="Builder" />
                    </NavLink>
                <NavLink 
                    to="/builder" 
                    >
                        <img src={Builder} alt="Builder" />
                    </NavLink>
                <NavLink 
                    to="/stats" 
                    >
                        <img src={Piechart} alt="Builder" />
                    </NavLink>
            </nav>

            <nav className="mt-a">
                <NavLink
                    to="/note"
                    >
                        <img src={Note} alt="Builder" />
                    </NavLink>
                <NavLink
                    to="/notifications"
                    >
                        <img src={Notification} alt="Builder" />
                    </NavLink>
            </nav>
            
            <button className="btn user-options-nav"></button>
        </div>
    );
}
 
export default LeftMenu;