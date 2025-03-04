document.getElementById("logo").addEventListener("click", function() {
    window.location.href = "../index.html";
})

// JavaScript code runs only after the entire HTML document has been loaded
document.addEventListener('DOMContentLoaded', function () {
    const visitedContainer = document.querySelector('.recently-visited'); // Select the container for recently visited sessions

    // Load from local storage on page load
    const recentlyVisitedSessions = JSON.parse(localStorage.getItem('recentlyVisited')) || []; // Retrieve saved sessions from local storage, or use an empty array if none exist
    displayVisitedSessions(recentlyVisitedSessions, visitedContainer); // Display the saved sessions
});

// Event listener for when the date input value changes
document.getElementById('calendar').addEventListener('change', function () {
    const selectedDate = this.value; // Get the selected date from the input

    fetch('https://sport-calendar-new-default-rtdb.firebaseio.com/scheduledSessions.json', { // Fetch scheduled sessions data from Firebase
        method: 'GET', // HTTP GET method to retrieve data
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        }
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        const scheduledContainer = document.querySelector('.scheduled-sessions'); // Select the container for scheduled sessions
        const visitedContainer = document.querySelector('.recently-visited'); // Select the container for recently visited sessions

        if (!scheduledContainer || !visitedContainer) { // Check if the containers are found
            console.error('Element not found'); // Log an error if not found
            return; // Exit the function
        }

        scheduledContainer.innerHTML = ''; // Clear the scheduled sessions container
        visitedContainer.innerHTML = ''; // Clear the recently visited sessions container

        let recentlyVisitedSessions = JSON.parse(localStorage.getItem('recentlyVisited')) || []; // Retrieve saved sessions from local storage, or use an empty array if none exist

        for (const key in data) { // Iterate over each session in the data
            const session = data[key]; // Get the session object
            const sessionDate = session.date; // Get the session date
            const sessionTime = session.time; // Get the session time
            const sessionType = session.type; // Get the session type

            const workoutDiv = document.createElement('div'); // Create a new div element
            workoutDiv.classList.add('workout'); // Add the "workout" class to the div
            workoutDiv.innerHTML = `
                <h2>${sessionType}</h2>
                <p>Date: ${sessionDate}</p>
                <p>Time: ${sessionTime}</p>
            `; // Set the inner HTML of the div to display session details

            if (sessionDate === selectedDate) { // Check if the session date matches the selected date
                scheduledContainer.appendChild(workoutDiv); // Append the div to the scheduled sessions container
            } else if (new Date(sessionDate) < new Date(selectedDate)) { // Check if the session date is before the selected date
                if (!recentlyVisitedSessions.some(s => s.date === sessionDate && s.time === sessionTime && s.type === sessionType)) {
                    recentlyVisitedSessions.push(session); // Add the session to the recently visited sessions array if it's not already present
                    visitedContainer.appendChild(workoutDiv); // Append the div to the recently visited container
                }
            }
        }

        // Save recently visited sessions to local storage
        localStorage.setItem('recentlyVisited', JSON.stringify(recentlyVisitedSessions)); // Save the array to local storage as a JSON string
    })
    .catch(error => {
        console.error('Error fetching scheduled sessions:', error); // Log any errors that occur during the fetch
    });
});

// Function to display visited sessions
function displayVisitedSessions(sessions, container) {
    const today = new Date(); // Get today's date

}


