import { isUserLogged } from "../../../services/usersService";

export default function UserPanel()
{
    return(
        <>
            {isUserLogged() ? 

                    <div className="py-3 floaterRight">
                        
                        <div className="dxa-underlined">
                            <strong>Radoslav99</strong>
                            <div className="userImgSmall" style={{background:"url(https://www.youredm.com/wp-content/uploads/2021/01/Flux-Pavilion-Press-Shot-1-2020-Fiona-Garden-1-750x500.jpg) center no-repeat"}}></div>
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