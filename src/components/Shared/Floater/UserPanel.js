import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

export default function UserPanel()
{
    const { isUserLogged, dxaUser, logOut } = useContext(AuthContext);
    return(
        <>
            {isUserLogged() ? 

                    <div className="py-3 floaterRight">
                        
                        <div className="dxa-underlined">
                            <strong>{dxaUser.displayName}</strong>
                            <div className="userImgSmall" style={{background:`url(${dxaUser.photoURL}) center no-repeat`}}></div>
                        </div>
                        <ul className="list-unstyled">
                            <li><Link to="profile">Profile 👤</Link></li>
                            <li>Saved news 📜</li>
                            <li>Prefences 🎭</li>
                            <li onClick={logOut}>Logout 🔐</li>
                        </ul>
                    </div>                                   
                :
                <>
                    <div className="py-3 floaterRight">
                        
                        <div className="dxa-underlined">
                            <strong>Guest</strong>
                            <div className="userImgSmall" style={{background:"url(https://www.pngfind.com/pngs/m/188-1886054_confused-person-png-surprise-guest-transparent-png.png) center no-repeat"}}></div>
                        </div>
                        <ul className="list-unstyled">
                            <li><Link to="/login">Login 🔐</Link></li>
                            <li><Link to="/register">Register 🙆🏽‍♂️</Link></li>  
                        </ul>
                    </div>  
                </>
            }
        </>       
    );
}