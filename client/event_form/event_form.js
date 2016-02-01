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
     var period = Session.get("period");
     myDate = moment();
     if (period == 'week') {
       var frequency = Session.get('event_days');
     } else if (period == 'month') {
       var frequency = Session.get('event_dates');
       recurrence = myDate.recur().every(frequency).dayofmonth();
     } else if (period == 'year') {
       var frequency = Session.get('event_months');
       var sub_frequency = Session.get('event_dates');
     }
   };

   console.log("name: "+name);
   console.log("amount: "+amount.toString());
   console.log("type: "+type);
   console.log("recurring: "+recurring.toString());
   console.log("frequency: "+frequency.toString());
   console.log("period: "+period);
   console.log("recurrence: "+recurrence.humanize());

   // Insert a task into the collection
   Events.insert({
     name: name,
     amount: amount,
     type: type,
     recurring: recurring,
     recurrence: recurrence

     createdAt: new Date() // current time
   });

   // Clear form
   event.target.name.value = "";
   event.target.amount.value = "";
   //Reinitialize Session vars
   Session.set('period', "none");
   Session.set("type", "none");
   Session.set('event_dates', [null]);
   Session.set('event_days', ["Monday"]);
   Session.set('event_months', ["January"]);
   Session.set("skips", 1);
   Session.set("skips_enabled", false);
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
  period_is_year:function(){
    if (Session.get('period') == "year"){
      return true;
    };
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
    // need to set event_days picker to current values in the session variable
    console.log("Switched to weeks. Current days are "+Session.get('event_days'));
  },
  "change #period_month": function () {
    Session.set("period", "month");
    // need to set event_dates picker to current values in the session variable
    console.log("Switched to months. Current dates are "+Session.get('event_dates'));
  },
  "change #period_year": function () {
    Session.set("period", "year");
    // need to set event_dates picker to current values in the session variable
    console.log("Switched to year. Current months are "+Session.get('event_months'));
  },
  "click #enable_skips": function(){
    Session.set("skips_enabled", !Session.get("skips_enabled"));
    console.log("Skips clicked, set to "+Session.get("skips_enabled"));
  },

})

Template.dayofmonth_selector.helpers({
  event_dates:function(){
    return Session.get('event_dates');
  },
  first_instance:function(a){
    if (a == 0) return true;
  },
  dateIs:function(index, num){
    //index = this.target.id;
    dates = Session.get('event_dates');
    //console.log(index+", "+num+", "+values[index]);
    //console.log("Evaluating value for date "+index.toString()+" which is "+values[index].toString());
    if (dates[index] == num) {
      return true;
    }
  },
  not_equal:function(a,b){
    if (a != b) return true;
  },
  not_the_only_date:function(){
    length = Session.get('event_dates').length;
    if (length > 1) return true;
  }
});

Template.dayofmonth_selector.events({
  "change .date_picker":function(event){
    //console.log("picked a new date!");
    index = event.target.id;
    //console.log("Index: "+index);
    value = event.target.value;
    dates = Session.get('event_dates');
    dates[index] = value;
    console.log("Changing a date: "+dates.toString());
    Session.set('event_dates', dates);
  },
  "click .add_date": function(event){
    dates = Session.get('event_dates');
    index = event.target.id;
    console.log("Adding another date");
    //console.log("currently there are "+pickers.length);
    if (dates.length < 5) {
      //dates.push(null);
      dates.splice(index+1, 0, null);
      Session.set('event_dates', dates);
    };
    console.log("Dates: "+dates.toString());
  },
  "click .del_date": function(event){
    dates = Session.get('event_dates');
    console.log("dates before: "+dates.toString());
    index = event.target.id;
    console.log("Removing a date at index "+index);
    //console.log("currently there are "+pickers.length);
    if (dates.length > 1) {
      //dates.pop();
      dates.splice(index, 1);
      Session.set('event_dates', dates);
    };
    console.log("Dates: "+dates.toString());
  }
});
