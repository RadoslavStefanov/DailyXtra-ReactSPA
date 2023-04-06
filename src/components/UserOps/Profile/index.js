import { Button, Col } from "react-bootstrap";
import style from './Profile.module.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import EditUserModal from './editUserModal';
import { getUserPreferences, needLoginMsg } from "../../../services/usersService";
import { fixSortOrderLabel } from "../../../services/articlesGetter";
import { getNewGuid } from "../../../services/Helper";
import { useNavigate } from "react-router-dom";


function Profile() {

    document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));
    const navigate = useNavigate();


    const { isUserLogged, dxaUser } = useContext(AuthContext);
    const [preferences, setPreferences] = useState();

    useEffect(() => 
    {   
        if( !isUserLogged() )
        {
            needLoginMsg();
            navigate("/");
        }

        if(preferences)
        {
            getUserPreferences()
            .then( res => 
            {   
                if(!res)
                    setPreferences([]);                
                else if(Object.keys(res).length > 0)
                {
                    if(Object.keys(res).includes("sortOrder") && res.sortOrder)
                        res.sortOrder = fixSortOrderLabel(res.sortOrder);

                    setPreferences(res);  
                    console.log(res)
                }
                
            })  
        }          
    },[preferences])

  
    return (
      <Col md={6} style={{minHeight:"720px"}}>
      {
        <>
            {isUserLogged() ? 
                <>
                    <img className={style.headImg} src="/images/page-banner.png" alt='page banner'/>
                    <div className={style.profileHeader}>
                        <h1>{dxaUser.displayName}</h1>
                    </div>
                    <img src={`${dxaUser.photoURL}`} className={style.profileImage} />
                    <div className={style.userInfo}>
                        <div>
                            <p><strong>📧 Email: </strong>{dxaUser.email}</p>
                            <p><strong>📛 Username: </strong>{dxaUser.displayName}</p>
                            <EditUserModal 
                                dxaUser = {dxaUser}
                            />                                  
                        </div>
                </div>
                </>
                :
                <h4>You need to be logged in to view this page!</h4>
                
            }
            {preferences&&
                <div className={style.profilePreferences}>
                    <h5>🎭 Preferences:</h5>
                    <p>*You can change these preferences by applying a new filter in "Search" and saving it!</p>
                    {preferences && Object.keys(preferences).map(k =>
                    ( 
                        <div key={getNewGuid()} style={{display:"inline"}}>
                            {(preferences[k] && 
                                <Button variant='success' style={{margin:"0 1rem 2rem 0",backgroundColor:"white", color:"#45a419", fontWeight:"700"}} >{`${k} = ${preferences[k]}`}</Button>
                            )}
                        </div>                       
                    )
                    )}
                </div>
            }
        </>
      }                        
      </Col>
    );
  }
  
  export default Profile;