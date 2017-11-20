var databaseKitchenValidate = require ('../../../database/kitchen/validate')
var getAllRecipe               = require ('../../tools/getAllRecipe')
var buildCouldMakeHTML      = require ('../../tools/HTMLbuild/couldMake')

module.exports = function couldMake (req, res){
  return new Promise (function (fulfill, reject){  
    var kitchen = databaseKitchenValidate (req.body.kitchenID)
    kitchen.then (function (kitchen){
      console.log ('got recipe')
      return getAllRecipe (kitchen)
    })
    .then (function (kitchen){
      console.log ('building HTML')
      return buildCouldMakeHTML (kitchen)
    })
    .then (function (kitchen){
      console.log ('sending')
      console.log (kitchen.HTML.couldMake)
      res.status(200).send (kitchen)
    })
    .catch (function (kitchen){
      res.send (kitchen)
    })
  })
}