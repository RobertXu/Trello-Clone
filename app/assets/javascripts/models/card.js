window.Trellino.Models.ListCard = Backbone.Model.extend({
  urlRoot: "api/lists/" + this.list_id + "/cards",
  comparator: "rank"
})