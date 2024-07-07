document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const questionElement = document.getElementById('question');
    const startButton = document.getElementById('start-interview');
    const stopButton = document.getElementById('stop-interview');
    const feedbackElement = document.getElementById('feedback');
    const feedbackMessage = document.getElementById('feedback-message');
    const proceedButton = document.getElementById('proceed');

    const questions = [
        "Tell me about yourself.",
        "Why do you want to work in finance?",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "How do you handle stress and pressure?"
    ];

    let questionIndex = 0;

    startButton.addEventListener('click', startInterview);
    stopButton.addEventListener('click', stopInterview);
    proceedButton.addEventListener('click', proceedToExpertInterview);

    function startInterview() {
        startButton.style.display = 'none';
        stopButton.style.display = 'inline';
        questionElement.textContent = questions[questionIndex];

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(error => {
                console.error("Error accessing webcam: ", error);
            });

        setTimeout(askNextQuestion, 10000); // Wait 10 seconds before asking next question
    }

    function stopInterview() {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
        video.srcObject = null;

        stopButton.style.display = 'none';
        feedbackElement.style.display = 'block';

        // Simulated feedback logic
        const feedback = getFeedback();
        feedbackMessage.textContent = feedback.message;

        if (feedback.rating === 'Strong Select') {
            proceedButton.style.display = 'block';
        }
    }

    function askNextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            questionElement.textContent = questions[questionIndex];
            setTimeout(askNextQuestion, 10000); // Wait 10 seconds before asking next question
        } else {
            stopInterview();
        }
    }

    function getFeedback() {
        // Simulated feedback logic
        const ratings = ['Weak', 'Strong', 'Strong Select'];
        const rating = ratings[Math.floor(Math.random() * ratings.length)];

        let message = '';
        if (rating === 'Weak') {
            message = 'Your interview needs improvement in various areas including communication skills and content.';
        } else if (rating === 'Strong') {
            message = 'Your interview was strong, but there is room for improvement in certain areas.';
        } else if (rating === 'Strong Select') {
            message = 'Excellent interview! You are rated as a Strong Select.';
        }

        return { rating, message };
    }

    function proceedToExpertInterview() {
        alert("Proceeding to schedule with an Industry Expert.");
        window.location.href = "industry_expert_interview.html"; // Update with your actual URL
    }
});
