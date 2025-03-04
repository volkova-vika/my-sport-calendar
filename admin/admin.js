document.getElementById("btn").addEventListener("click", function() {
    window.location.href = "/profile/profile.html";
})

document.getElementById('adminForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const schedule = document.getElementById('schedule').value;
    const image = document.getElementById('image').value;

    const newActivity = {
        category: category,
        type: type,
        description: description,
        schedule: schedule,
        image: image
    };

    fetch('https://sport-calendar-new-default-rtdb.firebaseio.com/admin.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newActivity)
    })
    .then(response => response.json())
    .then(data => {
        alert('Activity added successfully!');
        // document.getElementById('adminForm').reset();

        // Create a new card and add it to the front page
        createCard(newActivity);
    })
    .catch(error => {
        console.error('Error adding activity:', error);
    });
});

const deleteButton = document.getElementById('delete');

deleteButton.onclick = () => {
    const userId = '-OKDd74BKmiKiRXFSR2N';

    fetch(`https://sport-calendar-new-default-rtdb.firebaseio.com/admin/${userId}.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};
