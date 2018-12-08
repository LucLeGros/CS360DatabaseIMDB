var newData
//map[myKey1] = myObj1;
var filmDescription = []


$(".container").mapael({
    map : {
        name : "world_countries",

        defaultArea: {
	        eventHandlers: {
	                            click: onclickFindFilmsDescription
	                        }
        }
    }
});


window.onload = colorWorldMap 

function colorWorldMap(){
    getMapFilmDensity().then( map => computeMapFilmDensity(map))//map has been computed     
}
function onclickFindFilmsDescription(e, id, mapElem, textElem) {
	getFilmForCountry(id).then(populate)//filmDescription has been computed
        
}

function computeMapFilmDensity(map){
    newData = {
            'areas': $(".container").data('mapael').areas
        };
    var maxFilms = Math.max(map.values())
    console.log(map.values() + " map values")
     console.log(map + " map ")
     console.log(maxFilms + " max ")
     
    //var maxFilms = 
    console.log(newData.areas)
    Object.keys(newData.areas).forEach(key => {
            var country = newData.areas[key];//finding what is the country key might not be this I can't remember

            var numberOfFilms = map.has(key) ? map.get(key) : 0

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
        return "#ffffff"
    }
    var blue = "ff";
    var redGreenGradient = (Math.round((maxFilms-numberOfFilms)/maxFilms)*15).toString(16)//0 to f

    return "#" + redGreenGradient + redGreenGradient + blue//format is: "#xxxxff with x ranges from 0 to f
}

function getMapFilmDensity(){

    return API.getFilmsPerCountry().then(result => {
        var mapCountryFilmNumber = new Map()
        for (var i = 0; i < result.length; ++i){
            var elem = result[i]
            var k = elem["region"]

            var v = elem["COUNT(*)"]
            //add to our map so we can ignore weird countries
            console.log(k + " key region " + v + " count film")
            mapCountryFilmNumber.set(k, v)

        }
        return mapCountryFilmNumber
        
    })

}

function getFilmForCountry(id){//i don't know what form the result will be in 
    
    return API.getFilmsInCountry(id).then(result =>{
        filmDescription = []
        result.forEach(key => filmDescription.push(key.title))
                
       
    })

            
}

function populate(){
    var text = ""
    for(var i = 0; i < filmsForCountry.length; ++i){
        var film = filmsForCountry[i] + '\n'
        text += film
    }
    document.getElementById("films").value = text;
    document.getElementById("films").readOnly = true;
}





