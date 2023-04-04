import { Button, Col } from "react-bootstrap";
import style from './Profile.module.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { getUserInfo } from "../../../services/usersService";
import EditUserModal from './editUserModal';

function Profile() {

    document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));

    const { isUserLogged, dxaUser, logOut } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => 
    {   
        getUserInfo(dxaUser)
        .then(res => 
            {
                if(res)
                    setUserDetails(res);
            })
    },[isUserLogged])
  
    return (
      <Col md={6} style={{minHeight:"720px"}}>
      {
        <>
            {isUserLogged() ? 
                <>
                    <img className={style.headImg} src="/images/page-banner.png" alt='page banner'/>
                    <div className={style.profileHeader}>
                        <h1>{userDetails.username}</h1>
                    </div>
                    <img src={`${userDetails.profile_picture}`} className={style.profileImage} />
                    <div className={style.userInfo}>
                        <div>
                            <p><strong>📧 Email: </strong>{dxaUser.email}</p>
                            <p><strong>📛 Username: </strong>{userDetails.username}</p>
                            <EditUserModal 
                                userDetails = {userDetails}
                                dxaUser = {{dxaUser}}
                            />
                                  
                        </div>
                </div>
                </>
                :
                <h4>You need to be logged in to view this page!</h4>
                
            }
        </>
      }                        
      </Col>
    );
  }
  
  export default Profile;