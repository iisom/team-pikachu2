// Initialize a flag to track if the "Home" link has been clicked before
let homeLinkClicked = false;

// Function to display the alert and navigate to homepage if "Home" link is clicked
function handleHomeLinkClick(event) {
    event.preventDefault();

    if (!homeLinkClicked) {
        // Show the alert if the "Home" link is clicked for the first time
        displayAlert();
        homeLinkClicked = true; // Set the flag to true
    } else {
        // Navigate to homepage without showing the alert if the "Home" link has been clicked before
        window.location.href = this.href;
    }
}

// Event listener for "Home" link click
document.getElementById("home_link").addEventListener('click', handleHomeLinkClick);

// Function to display the alert
function displayAlert() {
    if (confirm("Are you sure you want to navigate away from this page?")) {
        // If the user clicks "OK" in the alert, navigate to the homepage
        window.location.href = document.getElementById("home_link").href;
    }
}


//open up a new tab
function goToWebsite1() {//open up a new tab- javascript method that takes 2 parameters the url and target (what you want it to do) 
    var url1 = "https://engage.metmuseum.org/admission/?promocode=52356";
    window.open(url1, '_blank');
}

function goToWebsite2() {
    var url2 = "https://engage.metmuseum.org/members/membership/?promocode=52596";
    window.open(url2, '_blank');
}
