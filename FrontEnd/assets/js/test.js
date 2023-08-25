var openModalBtn = document.getElementById('openModalBtn');
var modal = document.getElementById('myModal');
var closeButton = document.querySelector('#myModal .close');
var modalForm = document.getElementById('modalForm');
var secondbutton = document.querySelector('.close');
function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function submitForm(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  console.log('Nom:', name);
  console.log('Email:', email);
  closeModal();
}
secondbutton.addEventListener('click', openModal);
openModalBtn.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

modalForm.addEventListener('submit', submitForm);