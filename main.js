
    function watchForm(){
        $('form').on('submit', function(e){
            e.preventDefault();
            getCatApi();
        })  
    }

    function getCatApi(){
        fetch(`https://api.thecatapi.com/v1/images/search`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch('something went wrong')
    }


    function displayResults(responseJson){
        $('#resultContainer').html('')
        $('.results-img').html(`<img src="${responseJson.url}" />`)
    }

    $(function(){
        console.log('ready to load')
        watchForm()
    })