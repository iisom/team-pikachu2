// Event listener for "submit" link click
document.getElementById("submitform").addEventListener('click', Alert1);

// Function to display the alert
function Alert1() {
    alert("Thank you for your generous donation");
    }

// Event listener for "donations" link click
document.querySelectorAll(".donation-btn").forEach(button => {
    button.addEventListener('click', donations);
});

function donations(event) {
    const button = event.target;
    if (button.style.color !== "red") {
        button.style.color = "red";
    } else {
        button.style.color = ""; // Revert to original color
    }
}
