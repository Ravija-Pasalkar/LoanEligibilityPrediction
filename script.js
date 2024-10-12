document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Gather form data
    const name = document.getElementById("name").value.trim();
    const married = document.getElementById("married").value;
    const education = document.getElementById("education").value;
    const loanAmount = document.getElementById("loanAmount").value;
    const loanTerm = document.getElementById("loanTerm").value;
    const propertyArea = document.getElementById("propertyArea").value;
    const creditHistory = document.getElementById("creditHistory").value;

    // Validate fields
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

    // Show validation errors if any
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

    // Log the data (replace this part with the Kafka integration)
    console.log("Loan Application Data:", loanData);

    /* Kafka integration (this is a simulation, replace with actual Kafka code)
    This requires a Kafka producer running on your backend server
    The following code simulates an API call to send the loanData to a Kafka topic
    fetch('http://localhost:8080/kafka/loan-application', { // Replace with your actual Kafka API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data sent to Kafka:", data);
        document.getElementById("result").innerText = "Application submitted successfully!";
    })
    .catch(error => {
        console.error("Error sending data to Kafka:", error);
        document.getElementById("result").innerText = "Failed to submit the application. Please try again.";
    });
    */

    document.getElementById("result").innerText = "Application submitted successfully!";
});