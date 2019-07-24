const apiKey = 'AIzaSyBuEocizD6Gv32eYB0uYNTZORE7jeGRcIU'; 
const searchURL = 'https://www.googleapis.com/youtube/v3/search';
function displayResults(responseJson) {  
  
    for(let i = 0; i < responseJson.items.length; i++){ 
      
        onYouTubeIframeAPIReady()
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
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#dogInput').val();
    getYouTubeVideos(searchTerm);
    $('.resultsContainer').html('')
  });
}
$(watchForm);