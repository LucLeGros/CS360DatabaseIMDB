var newData
var mapCountryFilmNumber = new Map()//map[myKey1] = myObj1;
var filmDescription = []


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


window.onload = colorWorldMap 

function colorWorldMap(){
    getMapFilmDensity().then(computeMapFilmDensity)//map has been computed     
}
function onclickFindFilmsDescription(e, id, mapElem, textElem) {
	getFilmForCountry(id).then(populate(filmDescription))//filmDescription has been computed
        
}

function computeMapFilmDensity(){
    newData = {
            'areas': $(".container").data('mapael').areas
        };
    var maxFilms = Math.max(mapCountryFilmNumber.values())
    //var maxFilms = 
    console.log(newData.areas)
    Object.keys(newData.areas).forEach(key => {
            var country = newData.areas[key];//finding what is the country key might not be this I can't remember

            var numberOfFilms = mapCountryFilmNumber.has(key) ? mapCountryFilmNumber.get(key) : 0

            //compute color of one country
            console.log(numberOfFilms+  "nb")
            console.log(getColor(numberOfFilms,maxFilms) + "color")
            country.attrs = {fill: getColor(numberOfFilms,maxFilms)}
        });
    $(".container").trigger('update', [{mapOptions: newData}]);
}


//creates color that ranges from white to blue (blue is high film density)
function getColor(numberOfFilms,maxFilms){//we will assume the min film is 0 which is probably the case
    if(maxFilms == 0){
        return "#FFFFff"
    }
    var blue = "ff";
    var redGreenGradient = (Math.round((maxFilms-numberOfFilms)/maxFilms)*15).toString(16)//0 to f

    return "#" + redGreenGradient + redGreenGradient + blue//format is: "#xxxxff with x ranges from 0 to f
}

function getMapFilmDensity(){

    return API.getFilmsPerCountry().then(result => {
        console.log(result)
        console.log(typeof(result))
        for (var i = 0; i < result.length; ++i){
            var elem = result[i]
            var k = elem["region"]

            var v = elem["COUNT(*)"]
            //add to our map so we can ignore weird countries
            console.log(k + " key region " + v + " count film")
            mapCountryFilmNumber.set(k, v)
        }
        
    })
}

function getFilmForCountry(id){//i don't know what form the result will be in 
    filmDescription = []
    API.getFilmsInCountry(id).then(result =>
            Object.keys(result).forEach(key => 
                filmDescription.push(key.title)
                )
        )
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





