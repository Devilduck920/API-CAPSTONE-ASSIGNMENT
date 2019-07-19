
    function displayCatImageResults(responseJson) {
        $('#resultsConainter').html('')
        $('.results-img').attr('src' , `${responseJson[0].url}`)
            .addClass('containImage')
            .removeClass('hidden')
    }
    function getCatImageApi(){
        const searchURL = 'https://api.thecatapi.com/v1/images/search'
        fetch(searchURL)
            .then(response => response.json())
            .then (responseJson => displayCatImageResults(responseJson))
            .catch('something went wrong')
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function displayJoke(responseJson) {
        $('.results-txt').html('')
        $('.results-txt').append(`${responseJson.value.joke}`)
            .removeClass('hidden')
    }

    function getJokeApi(){
        const url = "https://api.icndb.com/jokes/random"
        fetch(url)
            .then(response =>response.json())
            .then(responseJson => {
                displayJoke(responseJson)
            })
            .catch('error was caught')
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function watchApis(){
        $('button').on('click', function(e){
            getCatImageApi();
            getJokeApi()

        })  
    }
    $(function(){
        console.log('ready to load')
        watchApis()
    })