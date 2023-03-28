export default function urlHasImage(url){
    debugger;
    var img = new Image();
    img.src = url;
    return (img.complete && img.naturalWidth !== 0);
}