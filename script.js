let working = true;

function toggleStatus() {

    const status = document.getElementById("status");

    working = !working;

    if (working) {
        status.textContent = "✅ Machine is operating normally";
    } else {
        status.textContent = "⚠️ Machine may be empty or out of order";
    }
}

function reportProblem() {
    alert("Thanks! The issue has been reported.");
}

function submitSnack() {

    const input = document.getElementById("snackInput");
    const thanks = document.getElementById("thanks");

    if (input.value.trim() !== "") {

        thanks.textContent = 
        "✅ Suggestion received: " + input.value;

        input.value = "";
    }
}

