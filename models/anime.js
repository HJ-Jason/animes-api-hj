// https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var formatDate = function () {
  return DateTime.fromJSDate(this.releaseDate).toISODate();
};

var animeSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  type: { type: String, required: true, enum: ["Shounen", "Shojo", "Seinen"] },
  releaseDate: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
});

animeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

animeSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("animes", animeSchema);
