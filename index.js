document.getElementById("btn").addEventListener("click", function() {
    window.location.href = "./profile/profile.html";
})

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Fetch activities from the database
    fetch('https://sport-calendar-new-default-rtdb.firebaseio.com/admin.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            
            for (let key in data) {
                createCard(data[key]); 
            }
        })
        .catch(error => console.error('Error fetching activities:', error)); 
});

// Create a card for an activity
function createCard(activity) {
    let cardContainer;

    // Determine the container based on the category of the activity
    switch (activity.category.toLowerCase()) {
        case 'yoga':
            cardContainer = document.getElementById('yogaContainer'); // Container for Yoga cards
            break;
        case 'stretching':
            cardContainer = document.getElementById('stretchingContainer'); // Container for Stretching cards
            break;
        case 'fitness':
            cardContainer = document.getElementById('fitnessContainer'); // Container for Fitness cards
            break;
        default:
            console.error('Unknown category:', activity.category); // Error if unknown
            return; // Exit 
    }

    const card = document.createElement('div'); // Create a new div element for the card
    card.classList.add('activity'); // Add the CSS class for styling

    const img = document.createElement('img'); // Create an img element
    img.classList.add('img'); // Add the CSS class for the image
    img.src = activity.image; // Set the image source from the activity data
    img.alt = `${activity.type} image`; // Set the alt text for the image
    card.appendChild(img); // Append the image to the card

    const category = document.createElement('p'); // Create a p element for the category
    category.classList.add('category'); // Add the CSS class for the category
    category.textContent = activity.category; // Set the category text from the activity data
    card.appendChild(category); // Append the category to the card

    const type = document.createElement('p'); // Create a p element for the type
    type.classList.add('type'); // Add the CSS class for the type
    type.textContent = activity.type; // Set the type text from the activity data
    card.appendChild(type); // Append the type to the card

    const description = document.createElement('p'); // Create a p element for the description
    description.classList.add('description'); // Add the CSS class for the description
    description.textContent = activity.description; // Set the description text from the activity data
    card.appendChild(description); // Append the description to the card

    const schedule = document.createElement('p'); // Create a p element for the schedule
    schedule.classList.add('schedule'); // Add the CSS class for the schedule
    schedule.textContent = `Schedule: ${activity.schedule}`; // Set the schedule text from the activity data
    card.appendChild(schedule); // Append the schedule to the card

    const detailsButton = document.createElement('button'); // Create a button element for details
    detailsButton.classList.add('details-btn'); // Add the CSS class for the button

    let link;
    if (activity.category.toLowerCase() === 'yoga') {
    link = '/yoga/yoga.html';
    } else if (activity.category.toLowerCase() === 'stretching') {
    link = '/stretching/stretching.html';
    } else if (activity.category.toLowerCase() === 'fitness') {
    link = '/fitness/fitness.html';
    } else {
    link = '#'; // if unknown
    }

detailsButton.innerHTML = `<a href="${link}">Discover</a>`; // Set the inner HTML of the button
card.appendChild(detailsButton); // Append the button to the card

    cardContainer.appendChild(card); // Append the card to the determined container
}