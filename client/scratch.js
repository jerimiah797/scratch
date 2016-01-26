//initialize session variables
Session.set("showAddForm", false);
Session.set("recurring", false);


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

Template.event_form.events({
 "submit .new-event": function (event) {
   // Prevent default browser form submit
   console.log(".new-event submitted!")
   event.preventDefault();

   // Get value from form element
   var name = event.target.name.value;
   var amount = event.target.amount.value;
   var type = event.target.type.value;

   var recurring = Session.get("recurring");
   if (recurring==true) {
     var frequency = event.target.frequency.value;
     var period = event.target.period.value;
     var dayofmonth = event.target.dayofmonth.value;
     var dayofmonth_2 = event.target.dayofmonth_2.value;
     //var dayofweek = event.target.dayofweek.value;
     var when = new Date();
   };


   // Insert a task into the collection
   Events.insert({
     name: name,
     amount: amount,
     type: type,
     //recurring: recurring,
     frequency: frequency,
     period: period,
     dayofmonth: dayofmonth,
     when: when,
     createdAt: new Date() // current time
   });

   // Clear form
   event.target.name.value = "";
   event.target.amount.value = "";
   event.target.type.value = "Bill";
   event.target.period.value = "Monthly";

   //hide form
   Session.set("showAddForm", false);
 }
});

Template.event_form.helpers({
  showNewEventForm:function(){
    return Session.get("showAddForm");
  },
  recurring:function(){
    return Session.get("recurring");
  }
});

Template.event_form.events({
  "click #toggle_recur": function () {
    Session.set("recurring", !Session.get("recurring"));
    console.log("Recurring toggle set to "+Session.get("recurring"));
  },
  "change #frequency": function(evt){
    console.log($(evt.target).val());
  }
})

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
