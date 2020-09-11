$(document).ready(function () {

  // Variables
  var hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var timeArray = [];
  var notesArray = [];

  // Element Variables
  var currentDayDisplay = $("#currentDayDisplay");
  currentDayDisplay.text(moment().format("dddd MMM Do YYYY"));

  var containerDiv = $(".container");

  // Functions
  // Displays the Time on the Schedule
  function displayTime() {
    if (hoursArray[i] < 12) {
      timeDisplay.text(hoursArray[i] + "AM");
    } else if (hoursArray[i] > 12) {
      timeDisplay.text(hoursArray[i] - 12 + "PM");
    } else {
      timeDisplay.text(hoursArray[i] + "PM");
    }
  }

  // Displays the User's Notes from Local Storage
  function getNotes() {
    var storedTime = JSON.parse(localStorage.getItem("Time"));
    var storedNotes = JSON.parse(localStorage.getItem("Text"));

    if ((storedTime !== null) & (storedNotes !== null)) {
      timeArray = storedTime;
      notesArray = storedNotes;

      textArea.text(notesArray[i]);
    }
  }

  // Adds Colors to the Schedule to reflect Present, Past, and Future Hours
  function colorSchedule() {
    var currentTime = moment().hour();

    if (hoursArray[i] === currentTime) {
      textArea.addClass("present");
    } else if (hoursArray[i] < currentTime) {
      textArea.addClass("past");
    } else {
      textArea.addClass("future");
    }
  }

  // Adds the Save Button that saves the User's Notes to Local Storage
  function addSaveButton() {
    saveButton.on("click", function () {
      timeArray.push($(this).siblings("div").text());
      notesArray.push($(this).siblings("textArea").val());

      localStorage.setItem("Time", JSON.stringify(timeArray));
      localStorage.setItem("Text", JSON.stringify(notesArray));
    });
  }

  // Function Calls
  for (var i = 0; i < hoursArray.length; i++) {
    // Row
    var rowDiv = $("<div>");
    rowDiv.addClass("row time-block");
    containerDiv.append(rowDiv);
    
    // Column 1 - Time
    var timeDisplay = $("<div>");
    timeDisplay.addClass("col-sm-2 hour");
    displayTime();
    rowDiv.append(timeDisplay);
    
    // Column 2 - Text
    var textArea = $("<textarea>");
    textArea.addClass("col-sm-9 description");
    getNotes();
    rowDiv.append(textArea);

    colorSchedule();

    // Column 3 - Save Button
    var saveButton = $("<button>");
    saveButton.addClass("col-sm-1 fas fa-save saveBtn i:hover");
    rowDiv.append(saveButton);
    addSaveButton();
  }

});
