document.getElementById("btn").addEventListener("click", function() {
    window.location.href = "/profile/profile.html";
})

// Add click event listeners to all buttons with the class "schedule-btn"
document.querySelectorAll('.schedule-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Get the type of yoga session from the button's data attribute
        const fitnessType = this.getAttribute('data-type');

        // Prompt the user to enter the date and time for the yoga session
        const selectedDate = prompt("Please enter the date (YYYY-MM-DD) for the yoga session:");
        const selectedTime = prompt("Please enter the time (HH:MM) for the yoga session:");

        if (selectedDate && selectedTime) {
            // Create an object to hold the session data
            const scheduleData = {
                type: fitnessType, 
                date: selectedDate,
                time: selectedTime
            };

            // Send the session data to the Firebase database
            fetch('https://sport-calendar-new-default-rtdb.firebaseio.com/scheduledSessions.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scheduleData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Fitness session scheduled successfully! Check your profile', data);
            })
            .catch(error => {
                console.error('Error scheduling session:', error);
            });
        } else {
            alert('Please enter both date and time.');
        }
    });
});

