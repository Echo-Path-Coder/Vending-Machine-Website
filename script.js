let working = true;

let lastSent = 0;

function toggleStatus() {

    const status = document.getElementById("status");

    working = !working;

    if (working) {
        status.textContent = "✅ Machine is operating normally";
    } else {
        status.textContent = "⚠️ Machine may be empty or out of order";
    }
}

async function reportProblem() {
    let message = document.getElementById("reportMessage");
    let issue =  document.getElementById("reportIssue").value.trim();
    let name = document.getElementById("reporterName").value.trim();
    let contact = document.getElementById("reporterContact").value.trim();

    let issueTrue = false
    let nameTrue = false
    let contactTrue = false

    const now = Date.now();
    if (now - lastSent < 10000) { // 10 seconds timer
        alert("Please wait a moment before sending another message.");
        return;
    }
    lastSent = now;


    if (issue !== "") {

        if(issue.length < 10){
            alert("Please Enter a real question")
        }
        else{
        message.textContent += "Problem: " + issue;
        issueTrue = true
        }
    }

    if(name !== "") {
        if(issue.length < 3){
            alert("Please Enter a real name")
        }
        else{
            message.textContent += " Reporter: " + name;
            nameTrue = true
        }
        
    }
    if(contact !== "") {

        if(issue.length < 8){
            alert("Please Enter a real contact")
        }
        else{
        message.textContent += " Contact: " + contact;
        contactTrue = true
        }
        
    }

    if(issueTrue && nameTrue && contactTrue) {
        message.textContent = "";
        message.textContent += "✅ Report submitted successfully!" + " Problem: " + issue + " Reporter: " + name + " Contact: " + contact;
       alert("Thank you for your report! We will look into the issue as soon as possible!");

    try {

        const response = await fetch("https://vending-machine-website-fibj.onrender.com/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                issue,
                name,
                contact
            })
        });

        if (response.ok) {
            alert("Report submitted successfully!");
        } else {
            const errorText = await response.text();
            alert("Error: " + errorText);
        }

    } catch (error) {
        console.error(error);
        alert("Could not connect to server.");
    }
    
    }
    else{
        message.textContent = "";
        message.textContent += "⚠️ Please fill out all fields before submitting a report.";
    }


}

async function submitSnack() {

    let snackName = document.getElementById("snackInput").value;
    let name = document.getElementById("suggestName").value;
    let reason = document.getElementById("suggestReason").value;
    let thanks = document.getElementById("thanksMessage");

    const now = Date.now();
    if (now - lastSent < 10000) { // 10 seconds timer
        alert("Please wait a moment before sending another message.");
        return;
    }
    lastSent = now;

    if (snackName.trim() != "" && name.trim() != "" && reason.trim() != "") {

        thanks.textContent = "";
        thanks.textContent += 
        "✅ Suggestion received: " + snackName + ". Name: " + name + ". Reason: " + reason;
        alert("Thank you for your suggestion! We will consider adding it to our vending machine selection.");

        try {

        const response = await fetch("https://vending-machine-website-fibj.onrender.com/snack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                snackName,
                name,
                reason
            })
        });

        if (response.ok) {
            alert("Report submitted successfully!");
        } else {
            const errorText = await response.text();
            alert("Error: " + errorText);
        }

    } catch (error) {
        console.error(error);
        alert("Could not connect to server.");
    }
    
    }
    else {
        thanks.textContent = "⚠️ Please enter a snack suggestion.";
    }
}

async function submitQuestion(){
    let question = document.getElementById("anyQuestion").value()
    let contact = document.getElementById("contactQuestion").value()
    let name = document.getElementById("questionName").value()
    let thanks = document.getElementById("questionThanks")

    if(question.value.trim() != "" && name.value.trim() != "" && contact.value.trim() != ""){
        thanks.textContent = ""
        thanks.textContent += "We have received the question: " + question.value + " Your Name: " + name + " Your contact: " + contact

        alert("Thank you for your question! We'll try to answer it as best as we can!")

        try {

        const response = await fetch("https://vending-machine-website-fibj.onrender.com/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question,
                name,
                contact
            })
        });

        if (response.ok) {
            alert("Question submitted successfully!");
        } else {
            const errorText = await response.text();
            alert("Error: " + errorText);
        }

    } catch (error) {
        console.error(error);
        alert("Could not connect to server.");
    }
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






