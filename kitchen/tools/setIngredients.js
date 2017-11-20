var querystring = require ('querystring')

module.exports = function setIng (kitchen, req){
	return new Promise (function (fulfill, reject){
		if (kitchen == null){
			console.log ('redirect')
			reject ('redirect')
		}else{
			var b1 = false
			var b2 = false
			var b3 = false
			var b4 = false

			if (kitchen.sensorIngredients[0]){
				b1 = kitchen.sensorIngredients[0].avaliable
				b2 = kitchen.sensorIngredients[1].avaliable
				b3 = kitchen.sensorIngredients[2].avaliable
				b4 = kitchen.sensorIngredients[3].avaliable
			}
			console.log ('checking stuff')
			kitchen.sensorIngredients = [
				{
					"name" 			: req.body.ingredient[0],
					"avaliable"	: b1
				},
				{
					"name" 			: req.body.ingredient[1],
					"avaliable"	: b2
				},
				{
					"name" 			: req.body.ingredient[2],
					"avaliable"	: b3
				},
				{
					"name" 			: req.body.ingredient[3],
					"avaliable"	: b4
				}
			]
			kitchen.homepage  = '/loggedIn.html#'+querystring.stringify({'kitchenID':kitchen.kitchenID, 'i1':req.body.ingredient[0], 'i2':req.body.ingredient[1], 'i3':req.body.ingredient[2], 'i4':req.body.ingredient[3] })
			fulfill (kitchen)
		}
	})
}