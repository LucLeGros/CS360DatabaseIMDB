$(".container").mapael({
    map : {
        name : "world_countries",

        defaultArea: {
	        eventHandlers: {
	                            click: onclick
	                        }
        }
    }
});

function onclick(e, id, mapElem, textElem) {
	    //getMapFilmDensity().then()
        

        
        $(".container").trigger('update', [{mapOptions: newData}]);
}

function computeMapFilmDensity(map){
    var newData = {
            'areas': $(".container").data('mapael').areas
        };
    var filmArayNumber = getMapFilmDensity()
    //var maxFilms = 
    Object.keys(newData.areas).forEach(key => {
            var value = newData.areas[key];
            value.attrs = {fill: getColor()}
        });
    $(".container").trigger('update', [{mapOptions: newData}]);
}
//window.onload = computeMapFilmDensity 

//creates color that ranges from white to blue (blue is high film density)
function getColor(numberOfFilms,maxFilms){//we will assume the min film is 0 which is probably the case
    var blue = "ff";
    var redGreenGradient = (Math.round((maxFilms-numberOfFilms)/maxFilms)*15).toString(16)//0 to f

    return "#" + redGreenGradient + redGreenGradient + blue//format is: "#xxxxff with x ranges from 0 to f
}

function getMapFilmDensity(){

}

function getFilmForCountry(){

}

function populate(filmsForCountry){
    var text = ""
    for(var i = 0; i < filmsForCountry.length; ++i){
        var film = filmsForCountry[i] + '\n'
        text += film
    }
    document.getElementById("films").value = text;
    document.getElementById("films").readOnly = true;
}





