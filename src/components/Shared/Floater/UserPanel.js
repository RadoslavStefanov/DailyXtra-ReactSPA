import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { getUserInfo } from "../../../services/usersService";

export default function UserPanel()
{
    const { isUserLogged, dxaUser } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => 
    {   
        getUserInfo(dxaUser)
        .then(res => 
            {
                if(res)
                {
                    console.log(res);
                    setUserDetails(res);
                }
            })
    },[isUserLogged])

    return(
        <>
            {isUserLogged() ? 

                    <div className="py-3 floaterRight">
                        
                        <div className="dxa-underlined">
                            <strong>{userDetails.username}</strong>
                            <div className="userImgSmall" style={{background:`url(${userDetails.profile_picture}) center no-repeat`}}></div>
                        </div>
                        <ul className="list-unstyled">
                            <li>Profile 👤</li>
                            <li>Settings ⚙️</li>
                            <li>Prefences 🎭</li>
                            <li>Logout 🔐</li>
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
                            <li>Login 🔐</li>
                        </ul>
                    </div>  
                </>
            }
        </>       
    );
}