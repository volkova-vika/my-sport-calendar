document.getElementById("btn").addEventListener("click", function() {
    window.location.href = "/profile/profile.html";
})
// document.querySelectorAll('.schedule-btn').forEach(button => {
//     button.addEventListener('click', function () {
//         // Get the type of yoga session from the button's data attribute
//         const yogaType = this.getAttribute('data-type'); 

//         // Get the shared date and time inputs
//         const selectedDate = document.getElementById('scheduleDate').value;
//         const selectedTime = document.getElementById('scheduleTime').value;

//         // Validate that both date and time are selected
//         if (selectedDate && selectedTime) {
//             // Create an object to store session data
//             const scheduleData = {
//                 type: yogaType, // The specific yoga type from the clicked button
//                 date: selectedDate, // Date selected from the shared input
//                 time: selectedTime // Time selected from the shared input
//             };

//             fetch('https://sport-calendar-new-default-rtdb.firebaseio.com/scheduledSessions.json', {
//                 method: 'POST', 
//                 headers: {
//                     'Content-Type': 'application/json' 
//                 },
//                 body: JSON.stringify(scheduleData) // Convert the scheduleData object to JSON
//             })
//             .then(response => response.json()) // Parse the JSON response
//             .then(data => {
//                 alert(`Yoga session for ${yogaType} scheduled successfully! Check your profile.`); 
//             })
//             .catch(error => {
//                 console.error('Error scheduling session:', error); 
//             });
//         } else {
//             alert('Please select both a date and a time.');
//         }
//     });
// });

// Disable all schedule buttons initially
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

// Add click event listeners to all schedule buttons
scheduleButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Get the yoga type from the button's data attribute
        const yogaType = this.getAttribute("data-type");

        // Read the selected date and time values
        const selectedDate = scheduleDate.value;
        const selectedTime = scheduleTime.value;

        // Check if date and time are properly selected
        if (selectedDate && selectedTime) {
            // Prepare session data for Firebase
            const scheduleData = {
                type: yogaType,
                date: selectedDate,
                time: selectedTime
            };

            // Send the session data to Firebase
            fetch('https://sport-calendar-new-default-rtdb.firebaseio.com/scheduledSessions.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // JSON format for the request
                },
                body: JSON.stringify(scheduleData) // Convert schedule data to JSON
            })
                .then(response => response.json()) // Parse the response JSON
                .then(data => {
                    alert(`Yoga session for ${yogaType} scheduled successfully! Check your profile.`); // Confirmation to the user
                })
                .catch(error => {
                    console.error("Error scheduling session:", error); // Log any errors
                });
        } else {
            // Validation error if inputs are missing
            alert("Please select both a date and a time.");
        }
    });
});