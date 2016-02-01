//initialize session variables
Session.set("showAddForm", false); //only true for testing
Session.set("recurring", false); //only true for testing
Session.set("period", "none");
Session.set("type", "none");
Session.set('event_dates', [null]);
Session.set('event_days', ["Monday"]);
Session.set('event_months', ["January"]);
Session.set("skips", 1);
Session.set("skips_enabled", false);


Template.recurring.helpers({
  events: function () {
    events = Events.find({}, {sort: {createdAt: -1}});
    //console.log(events.collection.queries[].results);
    return events;

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
