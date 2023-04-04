/*const token = "your-session-token";
window.sessionStorage.setItem("token", token);

const token = window.sessionStorage.getItem("token");

window.sessionStorage.removeItem("token");*/

import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { toast } from "react-toastify";

let errorMessages = {
    452: "{452} Please fill all required fields before registering!",
    453: "{453} The password must be at least 8 characters long!",
    454: "{454} The passwords don't match!",
    455: "{455} Username is too short!",
    456: "{456} Username can't be longer than 20 characters!",
    457: "{457} Username already exists!",
    458: "{458} Picture URL doesn't resolve an image!",
    459: "{459} Picture URL is too long!",
    460: "{460} Email address already in use!",
    461: "{461} Email is not valid!",
    462: "{462} User info update failed! Try again!",
    463: "{463} This articles is already in you favorites!",
    512: "{512} Server error occurred! Please try again later!"
}

let notificationMessages = {
    104: "{104} You logged out successfully!",
    105: "{105} Register has been successful!",
    106: "{106} Informations update successful!",
    107: "{107} Aticle added to favorites!",
    108: "{108} You are logged in automatically!"
}

let registerRequiredField = [
    `email`,
    `username`,
    `password`,
    `passwordConfirm`
]


export const getUserInfo = async () => 
{   
    const auth = getAuth();
    const user = auth.currentUser;
    if(user)
    {
        const dbRef = ref(getDatabase());
        return get(child(dbRef, `users/${user.uid}`)).then((snapshot) => 
        {
            if (snapshot.exists()) 
            {
                console.log(snapshot.val());
                return snapshot.val()
            } else 
            {
                toast.error("No data available");
                return false;
            }
        })
        .catch((error) => 
        {
            toast.error(error.message);
            return false;
        });
    }    
}

export function logOutUser(navHook)
{
    const auth = getAuth();
    signOut(auth).then(() => {
        toast.success(notificationMessages[104]);
        navHook('/');
        return true;
    })
    .catch((e) => 
    {
        toast.error(errorMessages[e.message]);
        return false;
    });
}

export function logInUser()
{
    //isUserLogged logic
    return false;
}

export function preventNotLogged(tab, navHook)
{
    //MARK! Check what to do with this function
    if((tab==="foryou" || tab==="filter") && false)
    {
        navHook('/login');
        toast.error("You need to be logged in to open this page!")
    }      
}

export async function registerUser(values, navHook)
{
    try
    {
        registerRequiredField.forEach(f =>
        {
            if(!values[f] || values[f].trim() === "") 
                throw new Error(452)
        })

        const isUsernameUnique = await usernameExists(values.username);
        if (!isUsernameUnique) throw new Error(457);

        if(values["username"].length < 8)
            throw new Error(455)

        if(values["username"].length > 20)
            throw new Error(456)
        
        if(values["password"].length < 8)
            throw new Error(453)

        if(values["password"] !== values["passwordConfirm"])
            throw new Error(454)
        
        if(values["pictureURL"].length<=0)
            values["pictureURL"] = "https://www.pngfind.com/pngs/m/188-1886054_confused-person-png-surprise-guest-transparent-png.png"
        else
        {
            let isImage = await isImageUrl(values["pictureURL"])
            if(!isImage) 
            {throw new Error(458);}
        }   

        createUser(values);
        toast.success(notificationMessages[105]);
        toast.success(notificationMessages[108]);
        navHook('/')
    }
    catch(e)
    {        
        toast.error(errorMessages[e.message]);
        return false;
    }
}

async function createUser(values)
{
    const auth = getAuth();
    const db = getDatabase();
    createUserWithEmailAndPassword(auth, values["email"], values["password"])
    .then((userCredential) => {
        const userRef = ref(db, 'users/' + userCredential.user.uid);
        console.log(userRef);
        set(ref(db, 'users/' + userCredential.user.uid), {
            username: values["username"],
            email: values["email"],
            profile_picture : values["pictureURL"]
        });
        // ...
    })
    .catch((error) => {
        toast.error(error.message);
        return false;
    });
}

function usernameExists(username) {
    return new Promise((resolve) => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let users = snapshot.val();
            Object.keys(users).forEach((u) => {
              if (users[u].username === username) {
                resolve(false); // username already exists
              }
            });
          }
          resolve(true); // username is unique
        })
        .catch((e) => {
            toast.error(errorMessages[e.message]);
            resolve(true);
        });
    });
}

function isImageUrl(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function() {
        resolve(true);
      };
      img.onerror = function() {
        resolve(false);
      };
      img.src = url;
    });
}