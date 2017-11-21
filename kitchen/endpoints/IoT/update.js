var model								= require ('../../../database/models')
var validateKitchen			= require ('../../../database/kitchen/validate')
var databaseKitchenSave	= require ('../../../database/kitchen/save')
/*
validates the access token that the user has provided from the website
Our access token will be valid until they remove our access to allow
guest to continue adding songs. This means we can check validity of
the access token internally instead of making a request to spotify
before knowing.
*/
module.exports = function update (req, res){
	return new Promise (function (fulfill, reject){
		console.log ('logging request')
		console.log (req.params)
		var kitchenID				= req.body.kitchenID
		var sensorToUpdate	= req.body.sensor
		var update					= req.body.update

	  var promise = validateKitchen (kitchenID)
	  promise.then (function (kitchen){
	  	console.log ('found the kitchen')
	  	console.log (kitchen)
	  	kitchen.sensorIngredients[sensorToUpdate].avaliable = update
	  	return kitchen
	  })
  	.then (function (kitchen){
  		return kitchen.save()
  	})
  	.then (function (kitchen){
  		console.log ('updating')
  		res.status(200).send (kitchen.sensorIngredients)
  	})
	  .catch (function(error) {
    	reject (error)
	  })
	})
}