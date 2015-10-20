
function save_options() {
  var age = document.getElementById('age').value;
  localStorage.ageParam = age;

  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
}


function restore_options() {

  var age = localStorage.ageParam || 12;

  document.getElementById('age').value = age;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);