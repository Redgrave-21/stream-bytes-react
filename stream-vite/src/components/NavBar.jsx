import { useMemo } from "react";
import useAuthStore from "./Context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = () => {
    const navigate = useNavigate()
    const [loggedIn, setLoggedOut] = useAuthStore(
        (state) => [state.loggedIn, state.setLoggedOut]
    );

    const logout = async () => {
        console.log("logout clicked");
        await setLoggedOut()
        localStorage.removeItem('access_token')
        // localStorage.removeItem("token");
        navigate("/")
    }
    return (
        <div>

            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="/">Stream-Bytes</a> */}
                    <NavLink className="navbar-brand" to="/">Stream-Bytes</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex" role="search" style={{'width':'800px'}}>
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"> </input> */}
                        <input className="form-control ms-2 me-2" type='search' placeholder="Search here"></input>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active">Home</NavLink>
                            </li>
                            {loggedIn ?
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/account" className="nav-link"> Account</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="account/upload" className="nav-link"> upload</NavLink>
                                    </li>
                                </>
                                : null}
                            {loggedIn ?
                                <li className="nav-item">
                                    <a className="nav-link" onClick={logout}>Logout</a>
                                </li>
                                : <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link ">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin-login" className="nav-link ">Admin Login</NavLink>
                                    </li>
                                </>
                            }
                            {console.log(loggedIn)}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;