// Create a text area to display the logger history and set its "id" to "areaId" below.
var areaId = "history";

// Add event listener for "submit" to handle them differently
document.getElementById("thisForm").addEventListener('submit', handleForm);

function loadHistory() {
  // Check if sessionHistory already exists
  if (sessionStorage.history) {
    document.getElementById(areaId).value = sessionStorage.history;
  }
  // Scroll to end of textarea	
  document.getElementById(areaId).scrollTop = document.getElementById(areaId).scrollHeight;
}
	
// Concatenate timestamp and note then append to previous history
function saveHistory(nextLine) {
  var newHistory = document.getElementById(areaId).value + new Date().toISOString() + "\t" + nextLine + "\n";
  sessionStorage.history = newHistory;
  document.getElementById(areaId).value = newHistory;
  document.getElementById(areaId).scrollTop = document.getElementById(areaId).scrollHeight;
  document.getElementById("note").value = "";
}

// Copy history to clipboard
function copy2Clipboard() {
  document.getElementById(areaId).select();
  document.execCommand('copy');
}

// Clear text area
function clearText() {
  if (confirm("Clear all text?") == true) {
    document.getElementById(areaId).value = "";
    sessionStorage.history = "";
  }
}
	
// Interrupt normal form submit so that page does not refresh on "returns"
function handleForm(event) {
  event.preventDefault();
  // Get text from input field
  saveHistory(document.getElementById("note").value);
} 
	
// Prompt to close tab
window.onbeforeunload = function (e) {
  e = e || window.event;

  // For IE and Firefox prior to version 4
  if (e) {
    e.returnValue = 'Sure?';
  }

  // For Safari
  return 'Sure?';
}