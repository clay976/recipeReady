var mongoose = require("mongoose");

var kitchen = mongoose.Schema({
	kitchenID		: { type: String, default: '' },
  sensorIngredients	: [],
  otherIngedients  : [],
  homepage		: { type: String, default: '' },
  canMake			: [],
  coulMake		: []
})

var Kitchen = mongoose.model('Kitchen', kitchen);

module.exports = {
  Kitchen : Kitchen
}