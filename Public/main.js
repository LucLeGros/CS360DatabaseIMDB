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
	getFilmForCountry(id)//filmDescription has been computed
        
}

function computeMapFilmDensity(map){
    newData = {
            'areas': $(".container").data('mapael').areas
        };
    
    var maxFilms = Math.max(...map.values())
    console.log(map)
    console.log(map.values())
     
    console.log(maxFilms)
     
    //var maxFilms = 
    console.log(newData.areas)
    Object.keys(newData.areas).forEach(key => {
            var country = newData.areas[key];//finding what is the country key might not be this I can't remember

            var numberOfFilms = map.has(key) ? map.get(key) : 0

            //compute color of one country
            console.log(numberOfFilms+  "nb")
            console.log(getColor(numberOfFilms,maxFilms) + " color")
            country.attrs = {fill: getColor(numberOfFilms,maxFilms)}
        });
    $(".container").trigger('update', [{mapOptions: newData}]);
}


//creates color that ranges from white to blue (blue is high film density)
function getColor(numberOfFilms,maxFilms){//we will assume the min film is 0 which is probably the case
    if(maxFilms == 0 || numberOfFilms == 0){
        return "#ffffff"
    }
    var blue = "ff";
    var redGreenGradient = (Math.round(((Math.log(maxFilms)-Math.log(numberOfFilms))/Math.log(maxFilms))*255)).toString(16).padStart(2, '0')//0 to f
    
    console.log(redGreenGradient)

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
    
    API.getFilmsInCountry(id).then(result =>{
        filmDescription = ""
        result.forEach(key => filmDescription+=(key.title + '\n'))
        document.getElementById("films").value = filmDescription;
        document.getElementById("films").readOnly = true;        
       
    })


            
}





