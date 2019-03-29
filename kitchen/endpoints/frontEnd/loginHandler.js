var databaseKitchenValidate = require ('../../../database/kitchen/validate')
var databaseKitchenCreate   = require ('../../../database/kitchen/create')
var databaseKitchenSave     = require ('../../../database/kitchen/save')

module.exports = function LoginHandler (req, res){
  return new Promise (function (fulfill, reject){
    var kitchenID = req.body.kitchenID

    databaseKitchenValidate (kitchenID)
    .then (function (kitchen){
      if (kitchen){
        console.log ('found existing kitchen')
        return kitchen
      }else{
        console.log ('new Kitchen')
        return databaseKitchenCreate (kitchenID)
      }
    })
  	.then (function (kitchen){
  		return databaseKitchenSave (kitchen)
  	})
  	.then (function (kitchen){
      res.redirect(kitchen.homepage)
  	})
  	.catch (function (error){
  		res.send ('There was an error logging you in, sorry.')
      console.log (error)
  	})
  })
}