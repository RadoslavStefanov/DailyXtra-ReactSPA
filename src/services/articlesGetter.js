import { getMockData, getNewsKey } from "../sysInfo/secrets";
import urlHasImage from "./urlHasImage";

//Defaults
let searchConfig =
{
    _baseUrl: "https://eventregistry.org/api/v1/article/getArticles",
    _pageNumber: 1,
    _tabKey: "",
    _keyWord: ["everything"],
}



export const getArticles = async ({pageNumber, tabKey}) => {  

    if(tabKey==="global")
        searchConfig._keyWord = ["global"];
    else if(tabKey==="hot")
        searchConfig._keyWord = ["hot"];

    let criterias = stringifyCriterias();
    let fetchUrl = `${searchConfig._baseUrl}?keyword=${criterias}&articlesCount=10&articlesPage=${pageNumber}&apiKey=${getNewsKey()}`; 

    let responce = await fetch(fetchUrl);
    
    let result = await responce.json();

    return result.articles.results;
    /*let string = getMockData();
    return JSON.parse(string).articles;*/
}

export const getFilteredArticles = async ({pageNumber}, filterObj, isForYou) => {
    debugger
    let pathSuffix = generatePathFromFilter({filterObj} ,pageNumber, isForYou)    
    let fetchUrl = `${searchConfig._baseUrl}${pathSuffix}&apiKey=${getNewsKey()}`; 

    let responce = await fetch(fetchUrl)    
    let result = await responce.json();

    return result.articles.results;
}

export const getArticleById = async (articleId) => {  
    let fetchUrl = `${searchConfig._baseUrl}?articleUri=${articleId}&apiKey=${getNewsKey()}`; 

    let responce = await fetch(fetchUrl)    
    let result = await responce.json();

    let article = result.articles.results[0]
    if(!urlHasImage(article.image))
    {article.image = "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26402161.jpg"}

    return result.articles.results[0];
}

function generatePathFromFilter({filterObj}, pageNumber, isForYou)
{
    let searchObj = {
        keyword: "anything",
        lang: null,
        articlesSortBy: null,
        articlesPage: 1,
        articlesCount: 10
    }

    if(!isForYou)
    {
        if(filterObj.keywords && filterObj.keywords.length > 0)
        {searchObj.keyword = filterObj.keywords.slice(0, 5).map(obj => obj.value).join(',');}

        if(filterObj.language && filterObj.language.length > 0)
        {searchObj.lang = filterObj.language.slice(0, 5).map(obj => obj.value).join(',');}
    }
    else
    {
        if(filterObj.keywords && filterObj.keywords.length > 0)
        {searchObj.keyword = filterObj.keywords}

        if(filterObj.language && filterObj.language.length > 0)
        {
            searchObj.lang = filterObj.language
            .split(', ')
            .map(l => l === "English" ? "eng": "bul")
            .slice(0, 5)
            .map(obj => obj)
            .join(',');
        }
    }
    
    
    if(filterObj.sortOrder)
        searchObj.articlesSortBy = filterObj.sortOrder;

    if(pageNumber && pageNumber > 1 && !pageNumber < 1 && Number(pageNumber))
        searchObj.articlesPage = Number(pageNumber);

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

    if(isForYou)
        filterObj.sortOrder = fixSortOrderLabel(filterObj.sortOrder);

    return(urlSuffix);
}

function stringifyCriterias()
{
    
    let str = "";

    if (searchConfig._keyWord.length === 0) {
    str = "everything";
    } else if (searchConfig._keyWord.length === 1) {
    str = searchConfig._keyWord[0];
    } else {
    const firstTenEntries = searchConfig._keyWord.slice(0, 10);
    str = firstTenEntries.join(", ");
    }

    return str;
}

export function fixSortOrderLabel(input)
{
    let labelMap = {
        "rel": "Relevancy",
        "date": "Date",
        "socialScore": "Rank"
    }

    return labelMap[input]
}