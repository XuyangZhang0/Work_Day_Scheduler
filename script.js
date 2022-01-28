// variables
let businessHourStart = 0;
let businessHourEnd = 24; // including 17-18
let currentHour = getCurrentHour();

// Get current day, output to Jumbotron
$("#currentDay").text(moment().format('dddd [, ] MMM Do YYYY'));

//Show Today Planner
for (let i=businessHourStart; i<businessHourEnd; i++) {
    let timeBlockStatus ="";
    if (currentHour>i) {
        timeBlockStatus = "past";
    } else if (currentHour===i) {
        timeBlockStatus = "present";
    } else {
        timeBlockStatus = "future";
    }
    $("#planner-view").append(`<div class="row time-block">
    <div class="hour col-1">
      <label for="description${i}">${convertTime(i)}</label>
    </div>
    <textarea class="form-control description col-10 text-left ${timeBlockStatus}" id="description${i}"></textarea>
    <button type="button" class="btn col-1 saveBtn"><i class="fas fa-save"></i></button>
    </div>
    `);
}


//Convert 24 hr time to 12 hr

function convertTime (hour) {
    return moment(hour,"HH").format("h a");
}
// Get current hour number
function getCurrentHour () {
    return parseInt(moment().format("H"));
}


//Read from localStorage



//Save to local storage on button click



