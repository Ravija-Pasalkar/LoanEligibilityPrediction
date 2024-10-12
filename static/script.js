document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const married = document.getElementById("married").value;
    const education = document.getElementById("education").value;
    const loanAmount = document.getElementById("loanAmount").value;
    const loanTerm = document.getElementById("loanTerm").value;
    const propertyArea = document.getElementById("propertyArea").value;
    const creditHistory = document.getElementById("creditHistory").value;

    let errors = [];

    if (name === "") {
        errors.push("Full name is required.");
    }

    if (loanAmount === "" || isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
        errors.push("Valid loan amount is required.");
    }

    if (loanTerm === "" || isNaN(loanTerm) || parseInt(loanTerm) <= 0) {
        errors.push("Valid loan term is required.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // Create an object to send
    const loanData = {
        name: name,
        married: married,
        education: education,
        loanAmount: loanAmount,
        loanTerm: loanTerm,
        propertyArea: propertyArea,
        creditHistory: creditHistory
    };

    console.log("Loan Application Data:", loanData);

    // Send data to Flask using Fetch API
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanData) // Convert the object to JSON
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Print response from server
        document.getElementById("result").innerText = data; // Display the response message
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});