Template.event_form.events({
 "submit .new-event": function (event) {
   // Prevent default browser form submit
   console.log(".new-event submitted!")
   event.preventDefault();

   // Get value from form element Session variables
   var name = event.target.name.value;
   var amount = event.target.amount.value;
   var type = Session.get("type");
   var recurring = Session.get("recurring");

   if (recurring==true) {
     var frequency = Session.get("frequency");
     var period = Session.get("period");
     var dayofmonth = event.target.dayofmonth.value;
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
   //event.target.type.value = "Payment";
   //event.target.period.value = "Month";

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
  period:function(){
    return Session.get('period');
  },
  period_selected:function(){
    if (Session.get('period') != "none"){
      return true;
    };
  },
  period_is_week:function(){
    if (Session.get('period') == "week"){
      return true;
    };
  },
  period_is_month:function(){
    if (Session.get('period') == "month"){
      return true;
    };
  },
  multiples_enabled:function(){
    return Session.get('multiples_enabled');
  },
  skips_enabled:function(){
    return Session.get('skips_enabled');
  }
});

Template.event_form.events({
  "change #type_payment": function () {
    Session.set("type", "Payment");
    console.log("Clicked the Payment radio button");
  },
  "change #type_income": function () {
    Session.set("type", "Income");
    console.log("Clicked the Income radio button");
  },
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
  },
  "click #enable_multiples": function(){
    Session.set("multiples_enabled", !Session.get("multiples_enabled"));
    console.log("Multiples clicked, set to "+Session.get("multiples_enabled"));
  },
  "click #enable_skips": function(){
    Session.set("skips_enabled", !Session.get("skips_enabled"));
    console.log("Skips clicked, set to "+Session.get("skips_enabled"));
  }
})
