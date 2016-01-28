//initialize session variables
Session.set("showAddForm", false);
Session.set("recurring", false);
Session.set("period", "none");
Session.set("type", "none");
Session.set("frequency", 1);
Session.set("multiples", Array(1));
Session.set("skips", 1);
Session.set("multiples_enabled", false);
Session.set("skips_enabled", false);


// This code only runs on the client
// Template.body.helpers({
//   events: [
//     { name: "House", amount: 1200 },
//     { name: "Car", amount: 300 },
//     { name: "Phone", amount: 120 },
//     { name: "Paycheck", amount: 2000 }
//   ]
// });


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
