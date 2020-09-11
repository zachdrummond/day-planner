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
  var hoursArray = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  var timeArray = [];
  var notesArray = [];

  // Element Variables
  var currentDayDisplay = $("#currentDayDisplay");
  currentDayDisplay.text(moment().format("dddd MMM Do YYYY"));

  var containerDiv = $(".container");

  // Functions

  for (var i = 0; i < hoursArray.length; i++) {
    // Row
    var rowDiv = $("<div>");
    rowDiv.addClass("row time-block");
    containerDiv.append(rowDiv);
    // Column 1 - Time
    var timeDisplay = $("<div>");
    timeDisplay.addClass("col-sm-2 hour");
    timeDisplay.text(hoursArray[i]);
    rowDiv.append(timeDisplay);
    // Column 2 - Text
    var textArea = $("<textarea>");
    textArea.addClass("col-sm-9 description");

    var storedTime = JSON.parse(localStorage.getItem("Time"));
    var storedNotes = JSON.parse(localStorage.getItem("Text"));

    if ((storedTime !== null) & (storedNotes !== null)) {
      timeArray = storedTime;
      notesArray = storedNotes;

      textArea.text(notesArray[i]);
    }
    rowDiv.append(textArea);

    var militaryTime = 0;
    if (hoursArray.indexOf(hoursArray[i]) > 3) {
      militaryTime = hoursArray[i] + 12;
    } else {
      militaryTime = hoursArray[i];
    }

    if (militaryTime === getCurrentTime()) {
      textArea.addClass("present");
    } else if (militaryTime < getCurrentTime()) {
      textArea.addClass("past");
    } else {
      textArea.addClass("future");
    }

    // Column 3 - Save Button
    var saveButton = $("<button>");
    saveButton.addClass("col-sm-1 fas fa-save saveBtn i:hover");
    rowDiv.append(saveButton);

    saveButton.on("click", function () {
      timeArray.push($(this).siblings("div").text());
      notesArray.push($(this).siblings("textArea").val());

      localStorage.setItem("Time", JSON.stringify(timeArray));
      localStorage.setItem("Text", JSON.stringify(notesArray));
    });
  }

  function getCurrentTime() {
    var currentTime = moment().hour();
    return currentTime;
  }

  // Call Functions
  //   displayCalendar();

  // Event Listeners
});
