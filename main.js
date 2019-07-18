    function fetchFUNC(searchUrl, apiKey) {
        const url = searchUrl + '?api_key=' + apiKey 
        fetch(url)
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
    function displayResults(responseJson) {
        $('#resultConainter').html('')
        $('.results-img').attr('src' , `${responseJson[0].url}`)
            .addClass('containImage ')
            .removeClass('hidden')
    }
    function getCatApi(){
        const apiKey = 'a5295d92-dbaf-4fb2-a789-55c45ad3c594'
        const searchURL = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`
        fetchFUNC(searchURL)
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