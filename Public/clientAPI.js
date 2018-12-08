var API = {}
API.serverBaseURL = "database"
API.getFilmsPerCountry = ()=>{
	var promise = new Promise((res, rej)=>{
		var xhr = new XMLHttpRequest()
		xhr.open("GET", API.serverBaseURL+"/filmsPerCountry")
		xhr.onload = ()=>{
            if(xhr.status == 200){
                res(JSON.parse(xhr.response))
            } else{
                rej(xhr.status)
            }
        }
        xhr.send()
	})
	return promise
}
API.getFilmsInCountry = (country)=>{
	var promise = new Promise((res, rej)=>{
		var xhr = new XMLHttpRequest()
		xhr.open("GET", API.serverBaseURL+"/films/"+country)
		xhr.onload = ()=>{
            if(xhr.status == 200){
                res(JSON.parse(xhr.response))
            } else{
                rej(xhr.status)
            }
        }
        xhr.send()
	})
	return promise
}