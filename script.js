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
        let hourlyEvent = todayEvents.filter(obj => {
            return obj.hour == i;
        })
        if (hourlyEvent.length !== 0) {
            $(".row").find(`[data-descriptionid="${i}"]`).text(hourlyEvent[0].description);
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

//Save to local storage on button click
$("#planner-view").click(function (event) {

    var element = event.target;
    if (element.matches(".saveBtn") || element.matches(".fa-save")) {
        calendarEvent.day = selectedDay;
        calendarEvent.hour = element.dataset.buttonid;
        calendarEvent.description = $(".row").find(`[data-descriptionid="${calendarEvent.hour}"]`).val();
        if (todayEvents.filter(obj => { return obj.hour == calendarEvent.hour }).length === 0) {
            calendarEvents.push(calendarEvent);
            console.log("0 event, so pushed the update");
        } else {
            todayEvents.filter(obj => { return obj.hour == calendarEvent.hour })[0].description = $(".row").find(`[data-descriptionid="${calendarEvent.hour}"]`).val();
        }
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
    if (calendarEvents !== null) {
        todayEvents = calendarEvents.filter(obj => {
            return obj.day === selectedDay;
        })
    }

}

//Initialization
$("#currentDay").text(moment().format('dddd [, ] MMM Do YYYY'));
businessHourStart = parseInt(localStorage.getItem("business-hour-start"));
businessHourEnd = parseInt(localStorage.getItem("business-hour-end"));
calendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
if (calendarEvents == null) {
    calendarEvents = [];
}
getTodayEvents();
showTodayPlanner();