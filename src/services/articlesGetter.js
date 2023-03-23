import { getNewsKey } from "../sysInfo/secrets";

//Defaults
let searchConfig =
{
    _baseUrl: "https://api.newscatcherapi.com/v2/",
    _pageNumber: 1,
    _tabKey: "",
    _keyWord: ["everything"],
}



export const getArticles = async ({pageNumber, tabKey}) => {  

    if(tabKey==="global")
        searchConfig._keyWord = ["global"];
    else if(tabKey==="hot")
        searchConfig._keyWord = ["hot"];
    
    console.log("tabKey= "+ tabKey)
    //debugger;
    //let key = getNewsKey();
    let criterias = stringifyCriterias();
    let fetchUrl = `${searchConfig._baseUrl}search?q=${criterias}&page_size=10&page=${pageNumber}`; 

    console.log(fetchUrl)

    let responce = 
    await fetch(fetchUrl, 
    {
        headers: 
        {
          'x-api-key': getNewsKey()
        }
    })
    
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