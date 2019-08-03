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
///////////////////////////////////////////////////////////////////////////////////////////////////////////   YOUTUBE IFRAME  ^
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayResults(responseJson) {  
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////     YOUTUBE API AND DISPLAY FX ^
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayStarWarsInfo(responseJson, searchTerm){
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////   STAR WARS API AND DISPLAY FX ^
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function handleAboutButton() { 
  let txtStatus = true;
  $('.btn').on('click',function(){
    if(txtStatus === true){
      $('p').fadeOut('10000');
      $(this).html('ABOUT');
      txtStatus = false;
    } else { 
      txtStatus = true;
      $(this).html('HIDE');
      $('p').fadeIn('10000');
    }
  })
}
function rmIntroHidden(){
  $('h4').removeClass('hidden')
  $('footer').removeClass('hidden')
}
function watchForm() {
  handleAboutButton();
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#input').val();
    $('#input').html('')
    getYouTubeVideos(searchTerm);
    getStarWarsApi(searchTerm);
    rmIntroHidden()
    
  });
}

$(watchForm)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////   QUERY FORMAT, EVENT LISTENER AND CALLBACK




