window.Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST["boards/show"],

  events: {
    "click #delete": "destroy"
  },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync", this.render);
    },

  destroy: function(event){
    event.preventDefault();

    this.model.destroy();

    Backbone.history.navigate("", {trigger: true});
  },

  render: function() {
    var view = this;

    var renderedContent = this.template({board: this.model});

    this.$el.html(renderedContent);

    $attach_members = this.$('#members_go_here');
    for (var i = 0; i < this.model.currentMembers.length; i++){
      $attach_members.append($('<li>' + this.model.currentMembers[i] +'</li>'));
    }

    $member_div = this.$("#member_div");

    var memberView = new window.Trellino.Views.MembersNew({model: this.model});
    $member_div.append(memberView.render().$el);

    $attach_list = this.$('#lists_go_here');
    $form_div = this.$('#form_div');
    /*
    WAI I need to call this model and not board????
    If you want to pass board, it must be passed as an attribute
    */
    var formView = new window.Trellino.Views.ListsNew({model: this.model});

    $form_div.append(formView.render().$el);

    this.model.lists().each(function(list){
      var view = new window.Trellino.Views.ListShow({
        model: list
        });
        $attach_list.append(view.render().$el);
    })

    $(".card_holder").sortable({connectWith: ".card_holder"});
    $(".row").sortable({connectWith: "#content"})

    return this;
  }
});