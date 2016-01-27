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

   //hide form, reinitialize recurring checkbox
   Session.set("showAddForm", false);
   Session.set("recurring", false);
 }
});

Template.event_form.helpers({
  showNewEventForm:function(){
    return Session.get("showAddForm");
  },
  recurring:function(){
    return Session.get("recurring");
  },
  frequency:function(){
    return Session.get('freqency');
  },
  second_date:function(){
    if (Session.get("frequency") == "Twice A"){
      return true;
    };
  }
});

Template.event_form.events({
  "change #recur_off": function () {
    Session.set("recurring", false);
    console.log("Clicked the One Time radio button");
  },
  "change #recur_on": function () {
    Session.set("recurring", true);
    console.log("Clicked the Recurring radio button");
  },
  "change #period_week": function () {
    Session.set("period", "week");
    console.log("Clicked the period_week radio button");
  },
  "change #period_month": function () {
    Session.set("period", "month");
    console.log("Clicked the period_month radio button");
  },
  "change #period_year": function () {
    Session.set("period", "year");
    console.log("Clicked the period_year radio button");
  },
  "change #frequency": function(evt){
    console.log("Frequency set to "+$(evt.target).val());
    Session.set("frequency", $(evt.target).val());
  }
})
