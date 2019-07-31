var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady(videoId) {
    player = new YT.Player('player', {
        height: '280px',
        width: '100%',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
      }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(6000);
      done = true;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayResults(responseJson) {  
    console.log(responseJson)  
    const randomIndex = Math.floor(Math.random() * 5);
    const videoId = responseJson.items[randomIndex].id.videoId;
    $('section').html(`
        <div id="player"></div>
    `)
    onYouTubeIframeAPIReady(videoId)
}
function getYouTubeVideos(searchTerm) {

    const apiKey = 'AIzaSyBuEocizD6Gv32eYB0uYNTZORE7jeGRcIU'; 
    const searchURL = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part:'snippet',
        q: `star wars ${searchTerm} origin story`,
        key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString 
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          displayResults(responseJson)
        })
        .catch('something went wrong')
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayStarWarsInfo(responseJson, searchTerm){
  console.log(responseJson)
  const objMain = responseJson.results[0];

    $('section').append(`
      <ul>
          <li>Name: ${objMain.name}</li><br>
          <li>Hair Color: ${objMain.hair_color}</li><br>
          <li>Height: ${objMain.height} cm</li><br>
          <li>Color: ${objMain.skin_color}</li><br>
          <li>Eye Color: ${objMain.eye_color}</li><br>
          <li>Birth Year: ${objMain.birth_year}</li><br>
      </ul>
    `)
}
function getStarWarsApi(searchTerm){
  const baseUrl = 'https://swapi.co/api/people/?search='
  const completeUrl = baseUrl + searchTerm  
  fetch(completeUrl)
    .then(response => response.json())
    .then(responseJson => {
      displayStarWarsInfo(responseJson, searchTerm)
    })
    .catch('error, fix.')    
}
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#input').val();
    getYouTubeVideos(searchTerm);
    getStarWarsApi(searchTerm);
    $('#input').html('')
    $('h4').removeClass('hidden')
  });
}

$(watchForm)