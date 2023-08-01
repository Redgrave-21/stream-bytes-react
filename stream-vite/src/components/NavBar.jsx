import { useMemo } from "react";
import useAuthStore from "./Context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate()
    const [loggedIn, UID, setLoggedOut] = useAuthStore(
        useMemo(() => (state) => [state.loggedIn, state.UID, state.setLoggedIn], [])
    );

    const logout = async () => {
        console.log("logout clicked");
        await setLoggedOut();
        localStorage.removeItem("access_token");
        localStorage.removeItem("token");
        alert("you are logged out");
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
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link ">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link" href="/register">Register</a> */}
                                <NavLink to="/register" className="nav-link ">Register</NavLink>
                            </li>
                            {loggedIn ?
                                <li className="nav-item">
                                    <NavLink to="/account" className="nav-link"> Account</NavLink>
                                </li>

                                : null}
                            {loggedIn ?
                                <li className="nav-item">
                                    <a className="nav-link" onClick={logout}>Logout</a>
                                </li>
                                : null}
                            {console.log(loggedIn)}
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    account
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/login">Login</a></li>
                                    <li><a className="dropdown-item" href="/register">Register</a></li>
                                    {loggedIn ?
                                        <>
                                            <li><hr className="dropdown-divider">
                                            </hr>
                                            </li>
                                            <li><a className="dropdown-item" onClick={logout}>logout</a></li>
                                        </> : null}
                                </ul>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li> */}
                        </ul>
                        <form className="d-flex" role="search">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"> </input> */}
                            <input className="form-control me-2" type='search' placeholder="search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;