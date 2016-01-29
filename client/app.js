//initialize session variables
Session.set("showAddForm", false); //only true for testing
Session.set("recurring", false); //only true for testing
Session.set("period", "none");
Session.set("type", "none");
Session.set("frequency", [0]);
Session.set("multiples", [0]);
Session.set("skips", 1);
Session.set("skips_enabled", false);


Template.recurring.helpers({
  events: function () {
    return Events.find({}, {sort: {createdAt: -1}});
  }
});

Template.show_event_form_button.events({
  "click #show_form": function (event) {
    Session.set("showAddForm", !Session.get("showAddForm"));
    console.log("Session variable set to "+Session.get("showAddForm"));
  }
});

Template.show_event_form_button.helpers({
  showNewEventForm:function(){
    return Session.get("showAddForm");
  }
});

Template.event.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Events.update(this._id, {
      $set: {checked: ! this.checked}
    });
  },
  "click .delete": function () {
    Events.remove(this._id);
  }
});

Template.event.helpers({
  when:function(){
    return "Once a Month on the 1st";
  }
});
