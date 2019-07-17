    const apiKey = ''
    const searchURl = 'https://api.thecatapi.com/v1/images/search'

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

    function getCatApi(apiKey, searchURL){
        const params = {
            key: apiKey,
        }
        const queryString = formatQueryParams(params)
        const url = searchURL + '?' + queryString
        fetch(url)
        .then(response => response.url)
        .then (responseUrl => console.log(responseUrl))
        .then(responseUrl => displayResults(responseUrl))

        .catch('something went wrong')
    }


    function displayResults(responseUrl){
        $('#resultContainer').html('')
        $('#resultContainer').append(`<img src="${responseUrl}" />`)
    }
    function watchForm(){
        $('button').on('click', function(e){

            getCatApi();
        })  
    }

    $(function(){
        console.log('ready to load')
        watchForm()
    })