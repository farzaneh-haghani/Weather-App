window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector("#temperature-degree");
  let iconImg = document.querySelector("img");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = `9ddae689e46f66927de24b959bc93d2b`;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const { description, icon } = data.weather[0];
          const { name } = data;
          const { temp } = data.main;
          locationTimezone.textContent = name;
          temperatureDegree.textContent = Math.floor(temp - 273.15);
          temperatureDescription.textContent = description;
          iconImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
        })
    })
  }
  else {
    document.querySelector("h1").textContent = "Hey, You need to give permission to your browser to access your location";
  }
});

