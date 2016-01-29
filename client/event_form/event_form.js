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
     if (period == 'week') {
       var frequency = Session.get('event_days');
     } else if (period == 'month') {
       var frequency = Session.get('event_dates');
     } else if (period == 'year') {
       var frequency = Session.get('event_months');
       var sub_frequency = Session.get('event_dates');
     }
     //var dayofweek = event.target.dayofweek.value;
     var starting = new Date();
   };

   console.log("name: "+name);
   console.log("amount: "+amount.toString());
   console.log("type: "+type);
   console.log("recurring: "+recurring.toString());
   console.log("frequency: "+frequency.toString());
   console.log("period: "+period);

   // Insert a task into the collection
   Events.insert({
     name: name,
     amount: amount,
     type: type,
     //recurring: recurring,
     frequency: frequency,
     period: period,
     starting: starting,
     createdAt: new Date() // current time
   });

   // Clear form
   event.target.name.value = "";
   event.target.amount.value = "";
   //Reinitialize Session vars
   Session.set('period', "none");
   Session.set("type", "none");
   Session.set('event_dates', [1]);
   Session.set('event_days', ["Monday"]);
   Session.set('event_months', ["January"]);
   Session.set('event_dates_pickers', [0]);
   Session.set('event_days_pickers' [0]);
   Session.set('event_months_pickers', [0]);
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
  pickers:function(){
    return Session.get('event_dates_pickers');
  },
  first_instance:function(a){
    if (a == 0) return true;
  }
});

Template.dayofmonth_selector.events({
  "change .multiples":function(event, template){
    index = this.toString();
    div_id = "#"+this.toString();
    console.log(div_id);
    element = $(div_id);
    console.log(element[0].value);
    value = element[0].value;
    freq = Session.get('event_dates');
    freq[index] = value;
    console.log("picked a new date! Updated array: "+freq.toString());
    Session.set('event_dates', freq);
  },
  "click #add_date": function(){
    if (Session.get("event_dates_pickers").length < 5) {
      Session.set("event_dates_pickers", rebuildPickers(Session.get("event_dates_pickers").length+1, Session.get('event_dates_pickers')));
    };
    console.log("Clicked the button to add a picker. Number is now "+Session.get("event_dates_pickers").length.toString());
  },
  "click #del_date": function(){
    if (Session.get("event_dates_pickers").length > 1) {
      Session.set("event_dates_pickers", rebuildPickers(Session.get("event_dates_pickers").length-1, Session.get('event_dates_pickers')));
    };
    console.log("Clicked the button to del a picker. Number is now "+Session.get("event_dates_pickers").length.toString());
  }
});

function rebuildPickers(length, pickers) {
  orig_length = pickers.length;
  diff = length - orig_length;
  console.log("orig: "+orig_length.toString()+", new: "+length.toString()+", diff: "+diff.toString());
  console.log(pickers.toString());
  a = new Array(length);
  for (i = 0; i < length; i++) {
    a[i] = i;
  }
  console.log(a.toString());
  period = Session.get('period');
  if (period == 'week') {
    freq = Session.get('event_days');
  } else if (period == 'month') {
    freq = Session.get('event_dates');
  } else if (period == 'year') {
    freq = Session.get('event_dates');
  }
  console.log("freq: "+freq.toString());
  if (diff == 1) {
    freq.push(1);
  } else freq.pop();
  console.log("freq after: "+freq.toString());
  if (period == 'week') {
    Session.set('event_days', freq);
  } else if (period == 'month') {
    Session.set('event_dates', freq);
  } else if (period == 'year') {
    Session.set('event_dates', freq);
  }
  return a;
}
