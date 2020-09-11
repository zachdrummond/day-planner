$(document).ready(function () {

  // Variables
  var hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var timeOfNotesArray = [];
  var userNotesArray = [];

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
    var storedTimes = JSON.parse(localStorage.getItem("Time"));
    var storedNotes = JSON.parse(localStorage.getItem("Text"));

    if ((storedTimes !== null) && (storedNotes !== null)) {
      timeOfNotesArray = storedTimes;
      userNotesArray = storedNotes;
    
      for(var i = 0; i < userNotesArray.length; i++){
        if(timeDisplay.text() === timeOfNotesArray[i]){
            textArea.text(userNotesArray[i]);
          }
      }
    }
  }

//   Adds Colors to the Schedule to reflect Present, Past, and Future Hours
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
      var timeOfNote = $(this).siblings("div").text();
      var userNote = $(this).siblings("textArea").val();

      if(userNote !== ""){
        timeOfNotesArray.push(timeOfNote);
        userNotesArray.push(userNote);
  
        localStorage.setItem("Time", JSON.stringify(timeOfNotesArray));
        localStorage.setItem("Text", JSON.stringify(userNotesArray));
      }
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
