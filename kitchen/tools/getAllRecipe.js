var request       = require('request-promise-native');

module.exports = function getAllRecipe (kitchen){
	return new Promise (function (fulfill, reject){
		var query = 'http://www.recipepuppy.com/api/?i='
		for (var index = 0; index < 3; index ++){
			if (index < 3) {
				query = query + kitchen.sensorIngredients[index].name+ ','
			}else{
				query = query + kitchen.sensorIngredients[index].name
			}
		}
		if (query == 'http://www.recipepuppy.com/api/?i='){
			kitchen.HTML.canMake = 'none of your ingredients are in stock!!!'
			reject (kitchen)
		}else{
			var req = request (query)
			req.then (function (recipe){
				recipe = JSON.parse (recipe)
				kitchen.recipe = recipe
				fulfill (kitchen)
			})
			.catch (function (error){
				reject (error)
			})
		}
	})
}