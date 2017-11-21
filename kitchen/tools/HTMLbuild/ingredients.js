module.exports = function ingredients (kitchen){
  var HTML = ''
    for (var index = 0; index < 3; index ++){
    	HTML += '<div class="w3-group">'
    	HTML += '<input class="w3-input" type="text" name="sensor'+(index+1)+'" id="ingredient1" value=' +kitchen.sensorIngredients[index].name+ ' required>'
    	HTML +=	'<label class="w3-label w3-validate">Ingredient Sensor '+(index+1)+'</label>'
    	HTML +=	'</div>'
  	}
  kitchen.HTML.ingredients = HTML
  return (kitchen)
}