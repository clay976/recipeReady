module.exports = function couldMake (kitchen){
  var HTML = '<div class="w3-group">'
    for (var index = 3; index < 7; index ++){
      if (kitchen.recipe.results[index].title.trim() != 'Product Equivalents'){
        HTML += '<p>Recipe '+(index + 1)+ ': ' +kitchen.recipe.results[index].title.trim()
        HTML += '<br></br>'
        HTML += 'Ingredients: ' +kitchen.recipe.results[index].ingredients+ '</p>'
        HTML += 'Link: <a>' +kitchen.recipe.results[index].href+ '</a></p>'
        HTML += '<br></br>'
      }else{
        kitchen.recipe.results.splice(index, index)
        index = index - 1
      }
    }
  HTML += '</div>'
  kitchen.HTML.couldMake = HTML
  return (kitchen)
}