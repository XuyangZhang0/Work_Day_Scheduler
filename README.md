# Work_Day_Scheduler

## Description
This is a work day scheduler that allows users to view, add, edit, events to stay up to date on his/her schedules.

## Deployed GitHub Page
[Work Day Scheduler](https://xuyangzhang0.github.io/Work_Day_Scheduler/)

## Demo

![User Flow](WorkDayScheduler.gif)

## Functions

1. Upon first load, the view will be set as the current day context, with current hour shown as red, past hours shown as grey, and future hours shown in green.
2. Application reads from localStorage to see if there is any saved events, and render them.
3. Event listener is bound on the save button where event description will be saved into localStorage.
4. Customization button will trigger customization modal where user can choose their own workday hours, and next load will honor it.
5. Datepicker is added to allow user to go to a past date and future date and color coding will be honored as well, upon selecting date, page renders again with events on that date.

## How it works
I leveraged Bootstrap, jQuery, jQueryUI, Moment in this work.

