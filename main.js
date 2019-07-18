
    function displayResults(responseJson) {
        $('#resultImageConainter').html('')
        $('.results-img').attr('src' , `${responseJson[0].url}`)
            .addClass('containImage')
            .removeClass('hidden')
    }
    function getCatImageApi(){
        const searchURL = 'https://api.thecatapi.com/v1/images/search'
        fetch(searchURL)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then (responseJson =>  { 
            console.log(responseJson[0].url)
            displayResults(responseJson)
        })
        .catch('something went wrong')
    }
    function watchImage(){
        $('button').on('click', function(e){
            getCatImageApi();
        })  
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function watchFact(){
        const url = "https://cat-fact.herokuapp.com/facts"
        fetch(url)
            .then(response => {
                console.log(response)
            })
            
    }

    $(function(){
        console.log('ready to load')
        watchImage()
        watchFact()
    })