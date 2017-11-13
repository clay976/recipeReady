var model				= require ('../../database/models')
/*
validates the access token that the user has provided from the website
Our access token will be valid until they remove our access to allow
guest to continue adding songs. This means we can check validity of
the access token internally instead of making a request to spotify
before knowing.
*/
module.exports = function remove (req, res){
	return new Promise (function (fulfill, reject){
		var kitchenID 					= req.body.kitchenID
		var ingredientToDelete	= req.body.ingredient
	  var promise							= validateKitchen (kitchenID)

	  promise.then (function (kitchen){
	  	//TODO: delete the specific ingredient from the list ________________________________________________
	  	return kitchen
	  })
	  .then (function (kitchen){
  		return databaseSaveKitchen (kitchen)
  	})
  	.then (function (kitchen){
  		fulfill (kitchen)
  	})
	  .catch (function(error) {
    	reject (error)
	  })
	})
}