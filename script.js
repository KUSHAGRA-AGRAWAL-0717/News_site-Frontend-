const apikey = "6d54174e47f1457180f7381e8a950628";
const blockcontainer = document.getElementById("block-container");
const searchfield = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");
async function fetchrandomnews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`; //we create this url dynamic that's why we use the `
    //after the & symbol we use the parameter to give only the ten information out of the mmany information
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;

    //tis await function is used because some time there is website become slow and that's why
  } catch (error) {
    console.error("error fetching random news ", error);
    return [];
  }
}
searchbutton.addEventListener("click", async () => {
  const query = searchfield.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayblocks(articles);
    } catch (error) {
      console.log("Error fetching news by query ", error);
    }
  }
});
async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`; //we create this url dynamic that's why we use the `
    //after the & symbol we use the parameter to give only the ten information out of the mmany information
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;

    //tis await function is used because some time there is website become slow and that's why
  } catch (error) {
    console.error("error fetching random news ", error);
    return [];
  }
}
function displayblocks(articles) {
  blockcontainer.innerHTML = "";
  articles.forEach((article) => {
    const blockcard = document.createElement("div");
    blockcard.classList.add("block-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    //  title.textContent=article.title
    const truncatedTitle =
      article.title.length > 0
        ? article.title.slice(0, 30) + "...."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncateddes =
      article.description.length > 120
        ? article.description.slice(0, 120) + "...."
        : article.description;
    description.textContent = truncateddes;
    blockcard.appendChild(img);
    blockcard.appendChild(title);
    blockcard.appendChild(description);
    blockcard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blockcontainer.appendChild(blockcard);
  });
}

(async () => {
  try {
    const articles = await fetchrandomnews();
    console.log(articles);
    displayblocks(articles);
  } catch (error) {
    console.error("error fetching random news ", error);
  }
})();
