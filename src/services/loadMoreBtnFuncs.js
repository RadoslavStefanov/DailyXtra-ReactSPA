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