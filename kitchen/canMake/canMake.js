var request       = require('request');
var request       = require('request-promise-native');
var databaseKitchenValidate  = require ('../../database/kitchen/validate')

module.exports = function canMake (req, res){
  return new Promise (function (fulfill, reject){  
    var kitchen = databaseKitchenValidate (req.body.kitchenID)
    kitchen.then (function (kitchen){
      return request ('http://www.recipepuppy.com/api/?i=' +kitchen.sensorIngredients[0].name+ ',' +kitchen.sensorIngredients[1].name+ ',' +kitchen.sensorIngredients[2].name+ ',' +kitchen.sensorIngredients[3].name/*+ '&q=' +query*/)
    })
    .then (function (recipe){
      //console.log (recipe)
      recipe = JSON.parse (recipe)      
      return buildRecipeCanMake (recipe)
    })
    .then (function (recipe){
      res.status(200).send (recipe)
    })
    .catch (function (error){
      console.log('error:', error); // Print the error if one occurred
      res.status(500).send ('there was an error. sorry')
    })
  })
}


function buildRecipeCanMake (recipe){
  var HTML = '<div class="w3-group">'
    for (var index = 0; index < 4; index ++){
      if (recipe.results[index].title.trim() != 'Product Equivalents'){
        HTML += '<p>Recipe '+(index + 1)+ ': ' +recipe.results[index].title.trim()
        HTML += '<br></br>'
        HTML += 'Ingredients: ' +recipe.results[index].ingredients+ '</p>'
        HTML += '<br></br>'
      }else{
        recipe.results.splice(index, index)
        index = index - 1
      }
    }
  HTML += '</div>'
  return (HTML)
}