// Saves options to chrome.storage
function save_options() {
  var age = document.getElementById('age').value;
  localStorage.ageParam = age;

  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  var age = localStorage.ageParam;

  document.getElementById('age').value = age;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);