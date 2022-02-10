async function covidNews(countryIsoCode) {
    await fetch("https://coronavirus-smartable.p.rapidapi.com/news/v1/" + countryIsoCode +"/", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
        "x-rapidapi-key": "366885d6aamsh4e6d68f53039a18p10cb87jsn6a24721668ba",
      },
    })
    .then((response) => response.json())
      .then((response) => {
        document.querySelectorAll("p")[3].innerHTML= "Country: " + response.location.countryOrRegion;
        document.querySelectorAll("p")[4].innerHTML= "Country Code: " + response.location.isoCode;
        document.querySelectorAll("p")[5].innerHTML= 
        "<strong>Note*</strong> If this country: <strong>"+response.location.countryOrRegion+"</strong> is appearing without news below, it means our api has no info on it. ";
        const newsInfo = ({ title, excerpt, provider} = response.news);
        newsInfo.forEach(news => {

          const image = document.createElement("img");
          image.src = news.images[0].url;
          document.getElementById("covid-news").appendChild(image);
          
          const title = document.createElement("h2");
          title.innerHTML = "News Title: " + news.title;
          document.getElementById("covid-news").appendChild(title);

          const excerpt = document.createElement("h4");
          excerpt.innerHTML ="Excerpted from <strong>"+ news.provider.name +"</strong>: " + "<a href='"+news.originalUrl+"' target='_blank'>"+news.originalUrl+"</a> <br />"+  news.excerpt;
          document.getElementById("covid-news").appendChild(excerpt);
              
        });
        
      })
      .catch((err) => {
        console.error(err);
      });
};

function searchCovidNews() {
  covidNews(document.querySelector(".search-bar").value).catch((err) => {
    console.error(err);
  });
}

  document.querySelector(".search-bar").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      searchCovidNews();
    }
  }) 

  document.querySelector(".search button").addEventListener("click", function () {
    searchCovidNews();
});



async function covidStats(iso_Code) {
  await fetch("https://coronavirus-smartable.p.rapidapi.com/stats/v1/"+iso_Code+"/", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
      "x-rapidapi-key": "366885d6aamsh4e6d68f53039a18p10cb87jsn6a24721668ba",
    },
  }).then((response) => response.json())
    .then((response) => {
      const { countryOrRegion, isoCode } = response.location;

      const country = document.createElement("h1");
      country.innerHTML = "Country: " + countryOrRegion;
      document.getElementById("covid-stats").appendChild(country);

      const iso = document.createElement("h2");
      iso.innerHTML = "Country Code: " + isoCode;
      document.getElementById("covid-stats").appendChild(iso);
      // console.log(response);
  
     
      const breakDown = ({
        location,
        newDeaths,
        newlyConfirmedCases,
        newlyRecoveredCases,
        totalConfirmedCases,
        totalDeaths,
        totalRecoveredCases,
      } = response.stats.breakdowns);

      breakDown.forEach(breakDown => {
        const breakDownLocation = document.createElement("p");
        breakDownLocation.innerHTML = "Province Or State: " + breakDown.location.provinceOrState;
        document.getElementById("covid-stats").appendChild(breakDownLocation);

        const breakDownNewDeaths = document.createElement("p");
        breakDownNewDeaths.innerHTML = "New Deaths: " + breakDown.newDeaths;
        document.getElementById("covid-stats").appendChild(breakDownNewDeaths);

        const breakDownnNewlyConfirmedC = document.createElement("p");
        breakDownnNewlyConfirmedC.innerHTML = "Newly Confirmed Cases: " + breakDown.newlyConfirmedCases;
        document.getElementById("covid-stats").appendChild(breakDownnNewlyConfirmedC);

        const breakDownNewlyRecoveredC = document.createElement("p");
        breakDownNewlyRecoveredC.innerHTML = "Newly Recovered Cases: " + breakDown.newlyRecoveredCases;
        document.getElementById("covid-stats").appendChild(breakDownNewlyRecoveredC);

        const breakDownTotalConfirmedC = document.createElement("p");
        breakDownTotalConfirmedC.innerHTML = "Total Confirm Cases: " + breakDown.totalConfirmedCases;
        document.getElementById("covid-stats").appendChild(breakDownTotalConfirmedC);

        const breakDownTotalD = document.createElement("p");
        breakDownTotalD.innerHTML = "Total Deaths: " + breakDown.totalDeaths;
        document.getElementById("covid-stats").appendChild(breakDownTotalD);

        const breakDownTotalRecoveredC = document.createElement("p");
        breakDownTotalRecoveredC.innerHTML = "Total Recovered Cases: " + breakDown.totalRecoveredCases;
        document.getElementById("covid-stats").appendChild(breakDownTotalRecoveredC);
      })

      // const {
      //   newDeaths,
      //   newlyConfirmedCases,
      //   newlyRecoveredCases,
      //   totalConfirmedCases,
      //   totalDeaths,
      //   totalRecoveredCases,
      // } = response.stats;

      // const newD = document.createElement("p");
      // newD.innerHTML = "New Deaths: " + newDeaths;
      // document.getElementById("covid-stats").appendChild(newD);

      // const newlyConfirmedC = document.createElement("p");
      // newlyConfirmedC.innerHTML = "Newly Confirmed Cases: " + newlyConfirmedCases;
      // document.getElementById("covid-stats").appendChild(newlyConfirmedC);

      // const newlyRecoveredC = document.createElement("p");
      // newlyRecoveredC.innerHTML = "Newly Recovered Cases: " + newlyRecoveredCases;
      // document.getElementById("covid-stats").appendChild(newlyRecoveredC);

      // const totalConfirmedC = document.createElement("p");
      // totalConfirmedC.innerHTML = "Total Confirm Cases: " + totalConfirmedCases;
      // document.getElementById("covid-stats").appendChild(totalConfirmedC);

      // const totalD = document.createElement("p");
      // totalD.innerHTML = "Total Deaths: " + totalDeaths;
      // document.getElementById("covid-stats").appendChild(totalD);

      // const totalRecoveredC = document.createElement("p");
      // totalRecoveredC.innerHTML = "Total Recovered Cases: " + totalRecoveredCases;
      // document.getElementById("covid-stats").appendChild(totalRecoveredC);


    })
    .catch((err) => {
      console.error(err);
    });
}


function searchCovidStats() {
  covidStats(document.querySelector(".search-bar2").value).catch((err) => {
    console.error(err);
  });
}

  document.querySelector(".search-bar2").addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      searchCovidStats();
    }
  }) 

  document.querySelector(".search button").addEventListener("click", function () {
    searchCovidStats();
});