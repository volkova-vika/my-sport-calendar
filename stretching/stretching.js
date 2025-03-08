document.getElementById("btn").addEventListener("click", function() {
    window.location.href = "/profile/profile.html";
})

const scheduleDate = document.getElementById("scheduleDate");
const scheduleTime = document.getElementById("scheduleTime");
const scheduleButtons = document.querySelectorAll(".schedule-btn");

function disableButton() {
    // Check if date and time inputs are valid
    const isDateFilled = scheduleDate.value.trim() !== ""; // Validate date input
    const isTimeFilled = scheduleTime.value.trim() !== ""; // Validate time input

    scheduleButtons.forEach(button => {
        button.disabled = !(isDateFilled && isTimeFilled); // Enable button only if both inputs are filled
    });
}

// Attach listeners to the date and time inputs
scheduleDate.addEventListener("input", disableButton);
scheduleTime.addEventListener("input", disableButton);

// Ensure buttons are disabled on page load
disableButton();

// Add click event listeners to all buttons with the class "schedule-btn"
document.querySelectorAll('.schedule-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Get the type of stretching session from the button's data attribute
        const stretchingType = this.getAttribute('data-type');

        // Prompt the user to enter the date and time for the stretching session
        const selectedDate = scheduleDate.value;
        const selectedTime = scheduleTime.value;

        if (selectedDate && selectedTime) {
            // Create an object to hold the session data
            const scheduleData = {
                type: stretchingType, 
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
                alert('Stretching session scheduled successfully! Check your profile', data);
            })
            .catch(error => {
                console.error('Error scheduling session:', error);
            });
        } else {
            alert('Please enter both date and time.');
        }
    });
});

