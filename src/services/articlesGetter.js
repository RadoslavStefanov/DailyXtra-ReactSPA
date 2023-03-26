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

export const getFilteredArticles = async ({pageNumber, tabKey}, filterObj) => {  

    let pathSuffix = generatePathFromFilter({filterObj},pageNumber)    
    let fetchUrl = `${searchConfig._baseUrl}search${pathSuffix}`; 

    //console.log(fetchUrl)

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

function generatePathFromFilter({filterObj},pageNumber)
{
    let searchObj = {
        q: "anything",
        countries: null,
        lang: null,
        sort_by: null,
        page: 1,
        page_size: 10
    }

    if(filterObj.keywords && filterObj.keywords.length > 0)
    {searchObj.q = filterObj.keywords.slice(0, 5).map(obj => obj.value).join(',');}

    if(filterObj.language && filterObj.language.length > 0)
    {searchObj.lang = filterObj.language.slice(0, 5).map(obj => obj.value).join(',');}
    
    if(filterObj.country && filterObj.country!=="global")
        searchObj.countries = filterObj.country;
    
    if(filterObj.sortOrder)
        searchObj.sort_by = filterObj.sortOrder;

    if(pageNumber && pageNumber > 1 && !pageNumber < 1 && Number(pageNumber))
        searchObj.page = Number(pageNumber);

    let hasProps = false;
    let urlSuffix = "";

    Object.keys(searchObj).forEach(k => 
        {
            if(searchObj[k])
            {
                if(!hasProps)
                {
                    hasProps = true;
                    urlSuffix += `?${k}=${searchObj[k]}`;
                }
                else
                {
                    urlSuffix += `&${k}=${searchObj[k]}`;
                }
            }
        });
    console.log(urlSuffix)
    return(urlSuffix);
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