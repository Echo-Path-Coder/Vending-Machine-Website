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
    let message = document.getElementById("reportMessage");
    let input =  document.getElementById("reportInput").value.trim();
    let name = document.getElementById("reporterName").value.trim();
    let contact = document.getElementById("reporterContact").value.trim();

    if (input !== "") {
        message.textContent += "Problem: " + input;
    }

    if(name !== "") {
        message.textContent += " Reporter: " + name;
    }
    if(contact !== "") {
        message.textContent += " Contact: " + contact;
    }

    if(input !== "" && name !== "" && contact !== "") {
        message.textContent = "";
        message.textContent += "✅ Report submitted successfully!" + " Problem: " + input + " Reporter: " + name + " Contact: " + contact;
       alert("Thank you for your report! We will look into the issue as soon as possible!");
    }
    else{
        message.textContent = "";
        message.textContent += "⚠️ Please fill out all fields before submitting a report.";
    }

}

function submitSnack() {

    let input = document.getElementById("snackInput");
    let thanks = document.getElementById("thanksMessage");

    if (input.value.trim() != "") {

        thanks.textContent = "";
        thanks.textContent += 
        "✅ Suggestion received: " + input.value;
        alert("Thank you for your suggestion! We will consider adding it to our vending machine selection.");
        input.value = "";
    }
    else {
        thanks.textContent = "⚠️ Please enter a snack suggestion.";
    }
}

function submitQuestion(){
    let question = document.getElementById("anyQuestion")
    let thanks = document.getElementById("questionThanks")
    let contact = document.getElementById("contactQuestion")

    if(question.value.trim() != ""){
        thanks.textContent = ""
        thanks.textContent += "We have received the question: " + question.value
        
        if(contact.value.trim() != ""){
            thanks.textContact += "Your contact: " + contact;
        }

        alert("Thank you for your question! We'll try to answer it as best as we can!")
    }
    else{
        thanks.textContent = ""
        thanks.textContent += "You did not submit a question"
    }
}

function adminLogin() {
    let adminPassword = "Group 1 on top";
    let attempts = 0;
    const passwordInput = document.getElementById("adminPassword");
    const adminMessage = document.getElementById("adminMessage");
    
    while (attempts < 3) {
    if (passwordInput.value.trim() === adminPassword) {
        adminMessage.textContent = "✅ Admin login successful!";
        passwordInput.value = "";
        break;
    } else {
        adminMessage.textContent = "❌ Incorrect password.";
        attempts++;
        if (attempts === 3) {
            adminMessage.textContent = "⚠️ Too many failed attempts. Please try again later.";
            passwordInput.disabled = true;
        }
    }
}
}