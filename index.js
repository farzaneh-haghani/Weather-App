window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature-description");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureDegree = document.querySelector("#temperature-degree");
  const iconImg = document.querySelector("img");
  const temperatureSection = document.querySelector(".temperature-section")
  const temperatureSpan = document.querySelector(".temperature-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiKey = `591e3fc3d2053500c48f2379d790ada6`;
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
          iconImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor((temp * 1.8) + 32);
            }
            else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(temp - 273.15);
            }
          })
        })
    })
  }
  else {
    document.querySelector("h1").textContent = "Hey, You need to give permission to your browser to access your location";
  }
});

