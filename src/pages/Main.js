import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Builder from "../components/builder/Builder";
import Header from "../components/shared/Header";
import LeftMenu from "../components/shared/Leftmenu";

import "./css/main.css"

const Main = () => {
    return (
        <Router>
            <main className="main-body d-flex f-column vh-100">
                <Header />
                <div className="d-flex container-parent-block">
                    <LeftMenu />
                    <Routes>
                        <Route path="/builder" element={<Builder />} />
                        <Route path="*" element={<Navigate to="/builder" />} />
                    </Routes>          
                </div>
            </main>
        </Router>
    );
}
 
export default Main;