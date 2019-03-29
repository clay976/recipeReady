var databaseKitchenValidate	= require ('../../../database/kitchen/validate')
var databaseKitchenSave			= require ('../../../database/kitchen/save')
var getRecipe								= require	('../../tools/getRecipe')
var setIngredients					= require ('../../tools/setIngredients')
var HTMLbuildCanMake				= require ('../../tools/HTMLbuild/canMake')
var HTMLbuildIngredients		= require ('../../tools/HTMLbuild/ingredients')
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
	  	console.log ('setting')
	  	return setIngredients (kitchen, req)
	  })
	  .then (function (kitchen){
	  	console.log ('building')
			return HTMLbuildIngredients (kitchen)
		})
		.then (function (kitchen){
			console.log ('saving')
			return databaseKitchenSave (kitchen)
		})
	  .then (function (kitchen){
			return getRecipe (kitchen)
		})
		.then (function (kitchen){
			return HTMLbuildCanMake (kitchen)
		})
		.then (function (kitchen){
			return databaseKitchenSave (kitchen)
		})
		.then (function (kitchen){
			res.status(200).send (kitchen)
		})
	  .catch (function(kitchen) {
	  	res.send (kitchen)
	  })
	 })
}