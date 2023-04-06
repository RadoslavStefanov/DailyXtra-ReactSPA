export function getNewGuid()
{
    let guid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    
    return guid();
}

export function toggleLoading()
{
    let btn = document.querySelector("#loadMoreBtn");
    btn.innerText = "Loading..."
}

export function disableLoading()
{
    let btn = document.querySelector("#loadMoreBtn");
    btn.innerText = "LOAD MORE..."
}

export function calcTimeAgo(utcDate)
{
    const timestampDate = new Date(utcDate);

    const now = Date.now();
    const difference = now - timestampDate;

    if (difference < 1000) {
    return 'just now';
    } else if (difference < 60 * 1000) {
    const seconds = Math.floor(difference / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (difference < 60 * 60 * 1000) {
    const minutes = Math.floor(difference / (60 * 1000));
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (difference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(difference / (60 * 60 * 1000));
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
    const days = Math.floor(difference / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
}

export function urlHasImage(url){
    var img = new Image();
    img.src = url;
    return (img.complete && img.naturalWidth !== 0);
}