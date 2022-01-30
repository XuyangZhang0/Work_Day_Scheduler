// variables
let businessHourStart = 9;
let businessHourEnd = 18 // including 17-18
let currentHour = getCurrentHour();
let selectedDay = moment().format('MMDDYYYY');
let calendarEvents = [];
let todayEvents = [];

/*
Utility or helper functions
*/
//Convert 24 hr time to 12 hr
function convertTime(hour) {
    return moment(hour, "HH").format("h a");
}
// Get current hour number
function getCurrentHour() {
    return parseInt(moment().format("H"));
}
//Read from localstorage to find current day's events array
function getTodayEvents() {
    if (calendarEvents !== null) {
        todayEvents = calendarEvents.filter(obj => {
            return obj.day === selectedDay;
        })
    }
}
// convert date to standard date
function convertDate(dateString) {
    if (dateString.length > 1) {
        return dateString.slice(-4) + dateString.slice(0, -4);
    }
    return dateString;
}
/*
Page rendering and event listeners
*/
//Show Today Planner
function showTodayPlanner() {
    for (let i = businessHourStart; i < businessHourEnd; i++) {
        let timeBlockStatus = "";
        if (moment().isAfter(convertDate(selectedDay), "day") || (currentHour > i && selectedDay === moment().format('MMDDYYYY'))) {
            timeBlockStatus = "past";
        } else if (currentHour === i && selectedDay === moment().format('MMDDYYYY')) {
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

//Save to local storage on button click
$("#planner-view").click(function (event) {
    let calendarEvent = {
        day: "",
        hour: 0,
        description: ""
    }
    var element = event.target;
    if (element.matches(".saveBtn") || element.matches(".fa-save")) {
        calendarEvent.day = selectedDay;
        calendarEvent.hour = element.dataset.buttonid;
        calendarEvent.description = $(".row").find(`[data-descriptionid="${calendarEvent.hour}"]`).val();
        if (todayEvents.filter(obj => { return obj.hour == element.dataset.buttonid }).length === 0) {
            calendarEvents.push(calendarEvent);
            getTodayEvents();
      } else {
            todayEvents.filter(obj => { return obj.hour == element.dataset.buttonid })[0].description = $(".row").find(`[data-descriptionid="${element.dataset.buttonid}"]`).val();
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

// jQueryUI datepicker 
$(function () {
    $("#datepicker").datepicker({
        onSelect: function (date, datepicker) {
            if (date != "") {
                selectedDay = date.replace(/\//g, '');
                $(".row").remove();
                getTodayEvents();
                $("#currentDay").text(moment(selectedDay, "MMDDYYYY").format('dddd [, ] MMM Do YYYY'));
                showTodayPlanner();
            }
        }
    });
});

/*
Initialization (first load or refresh)
*/
$("#currentDay").text(moment().format('dddd [, ] MMM Do YYYY'));
businessHourStart = parseInt(localStorage.getItem("business-hour-start")) || 9;
businessHourEnd = parseInt(localStorage.getItem("business-hour-end")) || 18;
calendarEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
getTodayEvents();
showTodayPlanner();