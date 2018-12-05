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
	    var newData = {
            'areas': $(".container").data('mapael').areas
        };
        Object.keys(newData.areas).forEach(key => {
            var value = newData.areas[key];
             value.attrs = {fill: "#000088"}
        });
        

        
        $(".container").trigger('update', [{mapOptions: newData}]);
}

function computeMapFilmDensity(map){
    var newData = {
            'areas': $(".container").data('mapael').areas
        };
    Object.keys(newData.areas).forEach(key => {
            var value = newData.areas[key];
            value.attrs = {fill: "#880000"}
        });
    $(".container").trigger('update', [{mapOptions: newData}]);
}
window.onload = computeMapFilmDensity 

function getColor(numberOfFilms,maxFilms){//we will assume the min film is 0 which is probably the case
    var blue = "ff";
    var redGreenGradient = Math.round(numberOfFilms/maxFilms)
    return "" + redGreenGradient + redGreenGradient + blue//"" at the begining so we get "1111ff" and not "22ff" 
}





