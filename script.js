const API_Key = '7e97c6c6bc7b128aaddcae97bb267477';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_Key}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    console.log(data);
    const WeatherData = {
        location : data.name,
        description:  data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature:data.main.temp,
        date: getDate(),
    }
    Object.keys(WeatherData).forEach(key => {
        document.getElementById(key).textContent = WeatherData[key];
    })

    cleanUp()
}

const cleanUp= () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return`${date.getDate()}-${( '0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`
}

const onload = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}