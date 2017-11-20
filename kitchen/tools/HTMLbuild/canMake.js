module.exports = function canMake (kitchen){
  var missingIngredients = []
  var HTML = '<div class="w3-group">'
  var recipeIngredients
  var missing = false

    for (var index = 0; index < 4; index ++){
      console.log (kitchen.recipe.results[index])
      if (kitchen.recipe.results[index].title.trim() != 'Product Equivalents'){
        recipeIngredients = kitchen.recipe.results[index].ingredients.split(", ");
        missingIngredients = []
        for (var ing = 0; ing < recipeIngredients.length; ing ++){
          missingIngredients.unshift (true)
        }
        for (var ing = 0; ing < recipeIngredients.length; ing ++){

          for (var kitchenIng = 0; kitchenIng < 4; kitchenIng ++){
            if (kitchen.sensorIngredients[kitchenIng].name == recipeIngredients[ing] && kitchen.sensorIngredients[kitchenIng].avaliable){
              missingIngredients[ing] = false
            }
          }
        }
        missing = false
        for (var i = 0; i < missingIngredients.length; i ++){
          if (missingIngredients[i] == true){
            missing = true
            break
          }
        }
        if (missing == false){
          HTML += '<p>Recipe '+(index + 1)+ ': ' +kitchen.recipe.results[index].title.trim()
          HTML += '<br></br>'
          HTML += 'Ingredients: ' +kitchen.recipe.results[index].ingredients+ '</p>'
          HTML += 'Link: <a>' +kitchen.recipe.results[index].href+ '</a>'
          HTML += '<br></br>'
        }
      }else{
        kitchen.recipe.results.splice(index, index)
        index = index - 1
      }
    }
  HTML += '</div>'
  kitchen.HTML.canMake = HTML
  return (kitchen)
}