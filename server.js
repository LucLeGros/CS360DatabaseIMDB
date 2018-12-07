const sqlite3 = require("sqlite3")
const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = (process.env.PORT || 3000)

app.use(express.static('Public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + "/Public/index.html")
})

app.get('/database/filmsPerCountry', function(req, res){
	var sql = 	`SELECT DISTINCT
					a.region, COUNT(*)
				FROM
					alternate_titles AS a
					INNER JOIN alternate_titles As o
					USING (tconst, title)
				WHERE
					a.region IS NOT NULL
					AND o.is_original = 1
					AND a.title = o.title
				GROUP BY
					a.region;`

	db.all(sql, callback = (err, result)=>{
		console.log(sql)
		if (err) {console.log(err)
			res.status(400).send()}
		else{
			console.log(result)
			res.status(200).send(JSON.stringify(result))
		}
	})
});
app.get('/database/films/:country', function(req, res){
	var country = req.params.country
	var sql = 	`SELECT DISTINCT
					a.tconst, a.title
				FROM
					alternate_titles AS a
					INNER JOIN alternate_titles As o
					USING (tconst, title)
				WHERE
					a.region = '${country}'
					AND o.is_original = 1
					AND a.title = o.title;`

	db.all(sql, callback = (err, result)=>{
		console.log(sql)
		if (err) {res.status(400).send()}
		else{
			console.log(result)
			res.status(200).send(JSON.stringify(result))
		}
	})
});


let db = new sqlite3.Database(__dirname + "/cs360_ass2_min.db", (err)=>{
	if(err){
		console.log(err)
	}
	console.log("Connected to database")
})

app.listen(port, ()=>{
	console.log("Listening on port " + port)
	console.log(__dirname)
});