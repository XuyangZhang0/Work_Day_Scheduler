// variables
let businessHourStart = 9;
let businessHourEnd = 18 // including 17-18
let currentHour = getCurrentHour();
let selectedDay = moment().format('MMDDYYYY');
let calendarEvents = [];
let todayEvents = [];
let calendarEvent = {
    day: "",
    hour: 0,
    description: ""
}

// Get current day, output to Jumbotron
$("#currentDay").text(moment().format('dddd [, ] MMM Do YYYY'));

//Show Today Planner
function showTodayPlanner() {
    for (let i = businessHourStart; i < businessHourEnd; i++) {
        let timeBlockStatus = "";
        if (currentHour > i) {
            timeBlockStatus = "past";
        } else if (currentHour === i) {
            timeBlockStatus = "present";
        } else {
            timeBlockStatus = "future";
        }
        $("#planner-view").append(`<div class="row time-block">
    <div class="hour col-1">
      <label for="description${i}">${convertTime(i)}</label>
    </div>
    <textarea class="form-control description col-10 text-left ${timeBlockStatus}" id="description${i}" data-descriptionid="${i}"></textarea>
    <button type="button" class="btn col-1 saveBtn" id="saveBtn${i}" data-buttonid="${i}"><i class="fas fa-save" data-buttonid="${i}"></i></button>
    </div>
    `);
        // console.log(todayEvents.filter(obj => {
        //     return obj.hour == i;
        // }))
        let hourlyEvent = todayEvents.filter(obj => {
            return obj.hour == i;
        })
if (hourlyEvent.length!==0){
    
}

    }
}

//Convert 24 hr time to 12 hr

function convertTime(hour) {
    return moment(hour, "HH").format("h a");
}
// Get current hour number
function getCurrentHour() {
    return parseInt(moment().format("H"));
}


//Read from localStorage



//Save to local storage on button click
$("#planner-view").click(function (event) {

    var element = event.target;
    if (element.matches(".saveBtn") || element.matches(".fa-save")) {
        calendarEvent.day = selectedDay;
        calendarEvent.hour = element.dataset.buttonid;
        calendarEvent.description = $(".row").find(`[data-descriptionid="${calendarEvent.hour}"]`).val();
        calendarEvents.push(calendarEvent);
        localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
    }
});

//Save customization
$("#save-customization").click(function () {
    businessHourStart = parseInt($("#business-hour-start").val());
    businessHourEnd = parseInt($("#business-hour-end").val());
    localStorage.setItem("business-hour-start", businessHourStart);
    localStorage.setItem("business-hour-end", businessHourEnd);
    $("#customization-modal").modal("hide");
    $(".row").remove();
    showTodayPlanner();
});


//Read from localstorage to find current day's events array
function getTodayEvents() {
    todayEvents = calendarEvents.filter(obj => {
        return obj.day === selectedDay;
    })
}
// https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
//Save Event on button click




//Initialization
businessHourStart = parseInt(localStorage.getItem("business-hour-start"));
businessHourEnd = parseInt(localStorage.getItem("business-hour-end"));
calendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
getTodayEvents();
showTodayPlanner();