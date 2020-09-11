// Pseudocode Overview
// 1. Display the Current Day at the top of the Calendar
// Variables - currentDay, currentDayDisplay (<p>)
// Use https://momentjs.com/ to get the Day
// 2. Display blocks of hours of time from 9:00 AM - 5:00 PM
// Use <div class = "container"> to dynamically populate
// Use a for loop to create all 9 rows
// 9 Rows & 3 Columns - 2, 8, 2
// Col 1 - Display Time by Hour
// Col 2 - Input Form with Text
// Col 3 - Save Button (Set column)
// 3. Color past blocks of hours to gray
// Use https://momentjs.com/ to get the current time
// CSS Class - past
// 4. Color present hour block to Red
// Use https://momentjs.com/ to get the current time
// CSS Class - present
// 5. Color future blocks of hours to Green
// Use https://momentjs.com/ to get the current time
// CSS Class - future
// 6. Add an input to the hour blocks - User can enter an event
// Input Form with Text
// 7. Add a save button to each hour block - Save text to local storage
// Submit Button - Font Awesome lock look for class
// setItem & getItem
// 8. Refreshing the page doesn't get rid of saved events
// 9. Add CSS to make the app look visually appealing.

$(document).ready(function () {
  // Variables
  var currentDay;
  var hoursArray = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Element Variables
  var currentDayDisplay = $("#currentDayDisplay");
  currentDayDisplay.text(moment().format("dddd MMM Do YYYY"));

  var containerDiv = $(".container");

  // Functions

  function displayCalendar() {
    for (var i = 0; i < hoursArray.length; i++) {
      // Row
      var rowDiv = $("<div>");
      rowDiv.addClass("row time-block");
      containerDiv.append(rowDiv);
      // Column 1 - Time
      var colDiv1 = $("<div>");
      colDiv1.addClass("col-sm-2 hour");
      colDiv1.text(hoursArray[i]);
      rowDiv.append(colDiv1);
      // Column 2 - Text
      var textArea = $("<textarea>");
      textArea.addClass("col-sm-9 description");
      textArea.text("Hello World");
      rowDiv.append(textArea);
      // Column 3 - Save Button
      var saveButton = $("<button>");
      saveButton.addClass("col-sm-1 fas fa-save saveBtn i:hover");
      rowDiv.append(saveButton);
    }
  }

  // Call Functions
  displayCalendar();

  // Event Listeners
});
