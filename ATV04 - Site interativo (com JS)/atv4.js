document.addEventListener("DOMContentLoaded", function () {
    const lamp = document.getElementById("lamp");
    const counter = document.getElementById("counter");
    let isOn = true;
    let clickCount = 0;

    // Function to update the page's background color based on the lamp's state
    function updateBackgroundColor() {
        document.body.style.backgroundColor = isOn ? "yellow" : "grey";
        document.body.style.color = isOn ? "black" : "white";
        document.querySelector("h1").style.color = isOn ? "black" : "white";
    }

    lamp.addEventListener("click", function () {
        isOn = !isOn;
        lamp.src = isOn ? "lamp_on.png" : "lamp_off.png";
        clickCount++;
        counter.textContent = `Cliques: ${clickCount}`;
        updateBackgroundColor(); // Call the function to update the background color
    });

    // Initial background color based on the lamp's state
    updateBackgroundColor();
});
