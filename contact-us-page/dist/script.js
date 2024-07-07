document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    var responseDiv = document.getElementById('form-response');

    // Simulate form submission
    responseDiv.innerHTML = "Thank you for contacting us, " + name + ". We will get back to you soon.";
});