/*const token = "your-session-token";
window.sessionStorage.setItem("token", token);

const token = window.sessionStorage.getItem("token");

window.sessionStorage.removeItem("token");*/


export async function setSessionToken(input)
{
    //set session token logic
}

export async function getSessionToken()
{
    //get session token logic
    return null;
}

export async function clearSessionToken()
{
    //cler session token logic
    return null;
}

export function isUserLogged()
{
    //isUserLogged logic
    return false;
}

export function preventNotLogged(tab, hook)
{
    if(tab==="foryou" || tab==="filter" && !isUserLogged())
        hook('/login');
        
}