import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { toast } from "react-toastify";

let errorMessages = {
    452: "{452} Please fill all required fields!",
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
    464: "{464} There is no change to the username!",
    465: "{465} There is no change to the image URL!",
    466: "{466} You need to have at least one filter to set preferences!",
    512: "{512} Server error occurred! Please try again later!"
}

let notificationMessages = {
    104: "{104} You logged out successfully!",
    105: "{105} Register has been successful!",
    106: "{106} Informations update successful!",
    107: "{107} Aticle added to favorites!",
    108: "{108} You are logged in automatically!",
    109: "{109} Successfully logged in!",
    110: "{110} Successfully applied changed!"
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

export function logInUser(data,navHook)
{
    if(!data.email || !data.password)    
    {
        
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        toast.success(notificationMessages[109]);
        navHook('/')
    })
    .catch((error) => {
        toast.error(error.message);
        return false;
    });
}

export async function editUser(data,dxaUser,handleClose)
{
    
    //MARK! Need to make the checks a method!
    if(data.username === dxaUser.displayName){
        toast.error(errorMessages[464]);
        return;
    }

    if(data.username.length < 6){
        toast.error(errorMessages[455]);
        return;
    }

    if(data.username.length > 20){
        toast.error(errorMessages[456]);
        return;
    }

    const isUsernameUnique = await usernameExists(data.username)
    if(!isUsernameUnique){
        toast.error(errorMessages[457]);
        return;
    }

    if(data.profile_picture === dxaUser.photoURL){
        toast.error(errorMessages[465]);
        return;
    }

    if(data.profile_picture.length<=0)
        data.profile_picture = "https://www.pngfind.com/pngs/m/188-1886054_confused-person-png-surprise-guest-transparent-png.png"
    else
    {
        let isImage = await isImageUrl(data.profile_picture)
        if(!isImage) 
        {
            toast.error(errorMessages[458]);
            return;
        }
    }   



    applyUserChanges(data);
    handleClose();
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

        if(values["username"].length < 6)
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

        createUser(values, navHook);
    }
    catch(e)
    {        
        toast.error(errorMessages[e.message]);
        return false;
    }
}

export async function setUserPreferences(filterData)
{
    try
    {
        if(!filterData.keywords && !filterData.language && filterData.sortOrder==='')
            throw new Error(466)

        let Preferences = 
        {
            keywords: extractLabels(filterData.keywords),
            language: extractLabels(filterData.language),   
            sortOrder: filterData.sortOrder.length > 0? filterData.sortOrder : null
        }

        const auth = getAuth();
        const db = getDatabase();
        ref(db, 'usersDetails/' + auth.currentUser.uid);
        set(ref(db, 'usersDetails/' + auth.currentUser.uid), {    
            Preferences
        });                
    }
    catch(e)
    {
        toast.error(errorMessages[e.message]);
        return false;
    }
}

export const getUserPreferences = async () => {  
    const auth = getAuth();
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `usersDetails/${auth.currentUser.uid}`)).then((snapshot) => 
    {
        if (snapshot.exists()) 
        {
            let resultObj = snapshot.val().Preferences;
            let normalizedPreferencesObj = {}
            
            Object.keys(resultObj).forEach(p => 
            {
                if(Array.isArray(resultObj[p]))
                    normalizedPreferencesObj[p] = resultObj[p].join(',');
                else
                    normalizedPreferencesObj[p] = resultObj[p];
            })

            return normalizedPreferencesObj;            
        } 
        else 
        {return null;}
    })
    .catch((error) => {
        toast.error(error.message);
        return false;
    });
}

async function createUser(values, navHook)
{
    const auth = getAuth();
    const db = getDatabase();
    createUserWithEmailAndPassword(auth, values["email"], values["password"])
    .then((userCredential) => {
        const userRef = ref(db, 'usersDetails/' + userCredential.user.uid);
        set(ref(db, 'usersDetails/' + userCredential.user.uid), {            
        });

        fillUserInfo(values)

        toast.success(notificationMessages[105]);
        toast.success(notificationMessages[108]);
        navHook('/')
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

function fillUserInfo(values){
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: values["username"] , photoURL: values["pictureURL"]
    })
    .catch((error) => {
        toast.error(error.message);
        return false;
    });
}

function applyUserChanges(data){
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: data.username , photoURL: data.profile_picture
    }).then(() => 
    {
        toast.success(notificationMessages[110]);
    })
    .catch((error) => {
        toast.error(error.message);
        return false;
    });
}

function extractLabels(obj) 
{
    if(!obj || obj.length < 1)
        return null;

    const labels = [];
    for (let i = 0; i < obj.length; i++) {
        labels.push(obj[i].label);
    }
    return labels;
}