async function covidNews(countryIsoCode) {
  try {
    const restponse = await fetch(`https://coronavirus-smartable.p.rapidapi.com/news/v1/${countryIsoCode}/`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
        "x-rapidapi-key": "366885d6aamsh4e6d68f53039a18p10cb87jsn6a24721668ba",
      },
    });
    const data = await restponse.json();

    document.querySelectorAll("p")[3].innerHTML= `Country: ${data?.location.countryOrRegion}`;
    document.querySelectorAll("p")[4].innerHTML= `Country Code: ${data?.location.isoCode}`;
    document.querySelectorAll("p")[5].innerHTML= 
    `<strong>Note*</strong> If this country: <strong>${data?.location.countryOrRegion}</strong> is appearing without news below, it means our api has no info on it. `;

    const healthNews = document.getElementById("health-news");
    healthNews.innerHTML = '';
    const defaultImage = './images/default-image.png';

    const newsInfo = data?.news;
    newsInfo?.forEach(news => {
      // healthNews.style = `
      //   color: white;
      //   padding: 2em;
      //   border-radius: 30px;
      //   max-width: 50%;
      //   margin: 1em;
      // `
      const image = document.createElement("img");

      if (!news.images || news.images.length === 0) {
        image.src = defaultImage;
        healthNews.appendChild(image);
      } else {
        news.images.forEach(imageData => {
          image.src = imageData.url;
          healthNews.appendChild(image);
        });
      }

      
      const title = document.createElement("h2");
      title.innerHTML = "News Title: " + news.title;
      healthNews.appendChild(title);
      const excerpt = document.createElement("h4");
      excerpt.innerHTML =`Excerpted from <strong>${news.provider.name}</strong>: <a href='${news.originalUrl}' target='_blank'>${news.originalUrl}</a> <br /> ${news.excerpt}`;
      healthNews.appendChild(excerpt);
    });
  } catch (error) {
    console.error(error);
  }
};

function searchCovidNews() {
  const searchInput = document.querySelector(".search-bar").value.toUpperCase();
  covidNews(searchInput);
}

  document.querySelector(".search-bar").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      searchCovidNews();
    }
  }) 

  document.querySelector(".search button").addEventListener("click", function () {
    searchCovidNews();
});
