var databaseKitchenValidate = require ('../../../database/kitchen/validate')
var getRecipe               = require ('../../tools/getRecipe')
var buildCanMakeHTML        = require ('../../tools/HTMLbuild/canMake')

module.exports = function canMake (req, res){
  return new Promise (function (fulfill, reject){  
    var kitchen = databaseKitchenValidate (req.body.kitchenID)
    kitchen.then (function (kitchen){
      return getRecipe (kitchen)
    })
    .then (function (kitchen){
      return buildCanMakeHTML (kitchen)
    })
    .then (function (kitchen){
      res.status(200).send (kitchen)
    })
    .catch (function (kitchen){
      res.send (kitchen)
    })
  })
}