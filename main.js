const apiKey = 'AIzaSyBuEocizD6Gv32eYB0uYNTZORE7jeGRcIU'; 
const searchURL = 'https://www.googleapis.com/youtube/v3/search';

function displayResults(responseJson) {  
    for(let i = 0; i < responseJson.items.length; i++){  
      let videoId = responseJson.items[i].id.videoId
      onYouTubeIframeAPIReady(videoId)
      $('section').append(`
        <p>${responseJson.items[i].snippet.title}</p>
        <br>
        <div id="player"></div>
      `)
        .removeClass('hidden')  
        .addClass('inline')
    }
  }
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function getYouTubeVideos(searchTerm) {
    
    const params = {
        q: searchTerm,
        part: 'snippet',
        key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString 
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          displayResults(responseJson)})
        .catch('something went wrong')
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady(videoId) {
  console.log()
  player = new YT.Player('player', {
    height: '300',
    width: '640',
    videoId: `${videoId}`,
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
    setTimeout( 6000);
    done = true;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#input').val();
    getYouTubeVideos(searchTerm);
    $('.resultsContainer').html('')
  });
}
$(watchForm);