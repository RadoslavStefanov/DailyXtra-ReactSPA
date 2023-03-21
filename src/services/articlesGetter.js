import { getNewsKey } from "../sysInfo/secrets";

//Defaults
let searchConfig =
{
    _baseUrl: "https://newsapi.org/v2/",
    _pageNumber: 1,
    _tabKey: "",
    _endPoint: "everything",
    _keyWord: ["everything"],
}

export const getArticles = async ({pageNumber, tabKey}) => {  

    if(tabKey==="global")
        searchConfig._endPoint = "everything";
    else if(tabKey==="hot")
    searchConfig._endPoint = "top-headlines";
    
    console.log("tabKey= "+ tabKey)
    debugger;
    let key = getNewsKey();
    let criterias = stringifyCriterias();
    let fetchUrl = `${searchConfig._baseUrl}${searchConfig._endPoint}?q=${criterias}&pageSize=10&page=${pageNumber}&apiKey=${key}`; 

    console.log(fetchUrl)

    let responce = await fetch(fetchUrl)
    let result = await responce.json();
    return result.articles;
}

function stringifyCriterias()
{
    
    let str = "";

    if (searchConfig._keyWord.length === 0) {
    str = '"everything"';
    } else if (searchConfig._keyWord.length === 1) {
    str = searchConfig._keyWord[0];
    } else {
    const firstTenEntries = searchConfig._keyWord.slice(0, 10);
    str = firstTenEntries.join(", ");
    }

    return str;
}