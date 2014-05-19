window.Trellino.Views.MembersNew = Backbone.View.extend({
  template: JST["members/new"],
  events: {
    "submit #member_form": "submit"
  },

  render: function(){
    var renderedContent = this.template({});
    $('#messages').removeClass('alert-danger');
    $('#messages').html('');
    this.$el.html(renderedContent);

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var board = this.model;
    var params = $(event.currentTarget).serializeJSON();
    var email = params.newMemberEmail;

    var allUsers = Trellino.Collections.boards.allUsers;

    if (allUsers.indexOf(email) === -1 || board.currentMembers.indexOf(email) !==-1){
      $('#messages').addClass('alert-danger');
      $('#messages').html('Invalid email');
    }
    else{
      board.save({newMemberEmail: email}, {
        success: function(){
          board.currentMembers.push(email);
        }
      })
    }
  }
})