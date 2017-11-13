var model				= require ('../../database/models')
var databaseKitchenValidate  = require ('../../database/kitchen/validate')
var databaseKitchenSave  = require ('../../database/kitchen/save')
var querystring         = require('querystring')
/*
validates the access token that the user has provided from the website
Our access token will be valid until they remove our access to allow
guest to continue adding songs. This means we can check validity of
the access token internally instead of making a request to spotify
before knowing.
*/
module.exports = function set (req, res){
	return new Promise (function (fulfill, reject){
	  var promise = databaseKitchenValidate (req.body.kitchenID)
	  promise.then (function (kitchen){
	  	return setIng (kitchen, req)
	  })
		.then (function (kitchen){
			return databaseKitchenSave (kitchen)
		})
		.then (function (kitchen){
			return buildIngredientView (kitchen)
		})
		.then (function (kitchen){
			res.status(200).send (kitchen)
		})
	  .catch (function(error) {
	  	console.log (error)
	  	res.send ('there was an error')
	  })
	 })
}

function setIng (kitchen, req){
	return new Promise (function (fulfill, reject){
		if (kitchen == null){
			reject ('redirect')
		}else{
			kitchen.sensorIngredients = [
				{
					"name" 			: req.body.ingredient[0],
					"avaliable"	: false
				},
				{
					"name" 			: req.body.ingredient[1],
					"avaliable"	: false
				},
				{
					"name" 			: req.body.ingredient[2],
					"avaliable"	: false
				},
				{
					"name" 			: req.body.ingredient[3],
					"avaliable"	: false
				}
			]
			kitchen.homepage  = '/loggedIn.html#'+querystring.stringify({'kitchenID':kitchen.kitchenID, 'i1':req.body.ingredient[0], 'i2':req.body.ingredient[1], 'i3':req.body.ingredient[2], 'i4':req.body.ingredient[3] })
			fulfill (kitchen)
		}
	})
}

function buildIngredientView (kitchen){
  var HTML = ''
    for (var index = 0; index < 4; index ++){
    	HTML += '<div class="w3-group">'
    	HTML += '<input class="w3-input" type="text" name="sensor'+(index+1)+'" id="ingredient1" value=' +kitchen.sensorIngredients[index].name+ ' required>'
    	HTML +=	'<label class="w3-label w3-validate">Ingredient Sensor '+(index+1)+'</label>'
    	HTML +=	'</div>'
  	}
  return (HTML)
}
