let name = window.localStorage.getItem('name');
let address = window.localStorage.getItem('address') ;
let zipcode = window.localStorage.getItem('zipcode') ;
let education = window.localStorage.getItem('education');
let dob = window.localStorage.getItem('dob');
let height = window.localStorage.getItem('height');
let phone = window.localStorage.getItem('phone');
let email =window.localStorage.getItem('email')

document.getElementById('name').innerText= name ? `- Name: ${name}` : ""
document.getElementById('dob').innerText= dob ? `- Date of Birth: ${dob}` : ""
document.getElementById('address').innerText= address ? `- Address: ${address}` : ""
document.getElementById('education').innerText= education ? `- Education: ${education}` : ""
document.getElementById('height').innerText=height ? `- Height: ${height}` : ""
document.getElementById('phone').innerText= phone ? `- Phone: ${phone}` : ""
document.getElementById('email').innerText= email ? `- Email: ${email}` : ""

if(name===null){
    document.getElementById('status').innerText = "No data to show"
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic21vZWV6NDMiLCJhIjoiY2tjbmo5YWJxMGJzdDJ0cXl6bXlnOWpyNyJ9.Jc-mq9PYmDIKZ-dthlWx4g';

async function getCoordinates(address,zipcode){
  let response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoic21vZWV6NDMiLCJhIjoiY2tjbmo5YWJxMGJzdDJ0cXl6bXlnOWpyNyJ9.Jc-mq9PYmDIKZ-dthlWx4g`)
  let data = await response.json()
  return data;
}

getCoordinates(address, zipcode)
.then(data =>{
    if(address !==  null){
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: data.features[0].geometry.coordinates,
            zoom: 9
        });

        map.addControl(new mapboxgl.NavigationControl());

        var marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat(data.features[0].geometry.coordinates)
        .addTo(map);
    }
    else{
        console.log('Address not given')
    }
})
.catch(error => console.log(error));