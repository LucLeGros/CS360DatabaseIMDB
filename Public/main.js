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
            'areas': {}
        };
        if (mapElem.originalAttrs.fill == "#5ba4ff") {
            newData.areas[id] = {
                attrs: {
                    fill: "#0088db"
                }
            };
        } else {
            newData.areas[id] = {
                attrs: {
                    fill: "#5ba4ff"
                }
            };
        }
        $(".container").trigger('update', [{mapOptions: newData}]);
}



