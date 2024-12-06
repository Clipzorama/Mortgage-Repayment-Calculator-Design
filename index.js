// I will do the condition through the submit button instead of making a function and using onSubmit.


document.getElementById("mortgager").addEventListener("submit", function (event) {
    // removing default form behavior for personal modification
    event.preventDefault();


    // For the first input field
    let mortgageAmount = document.getElementById("mortgage-amount");
    let mortgage_value = parseFloat(mortgageAmount.value);
    let poundSign = document.querySelector(".input-text-m");

    // Left input information
    let mortgageTerm = document.getElementById("mortgage-term");
    let termValue = parseInt(mortgageTerm.value);
    let yearSign = document.querySelector(".input-year")


    // Right input information
    let interestField = document.getElementById("interest-rate");
    let interestRate = parseFloat(interestField.value);
    let percentSign = document.querySelector(".input-percent");

    // radio buttons
    let repaymentInput = document.getElementById("repayment").checked;
    let interestInput = document.getElementById("interestO").checked;

    // all error elements for manipulation 
    let amountError = document.querySelector(".amount-error");
    let termError = document.querySelector(".error-term");
    let interestError = document.querySelector(".error-rate");
    let radioError = document.querySelector(".error-radio");

    // right side of main card manipulation references

    let resultPending = document.querySelector(".potential-results");
    let resultDiv = document.querySelector(".result-container");
    let monthPlan = document.querySelector(".month-plan");
    let overTerm = document.querySelector(".over-term");

    // flag to check if we can go to next phase of the calculation
    let isValid = true;


    // using type "text" so validation logic is manual instead of checkValidity().
    if (!mortgageAmount.value.trim() || isNaN(parseFloat(mortgage_value)) || parseFloat(mortgage_value) <= 0) {
        amountError.style.display = "block";
        mortgageAmount.classList.add("error-input");
        poundSign.classList.add("error-span");
        isValid = false;
    } else {
        amountError.style.display = "none";
        mortgageAmount.classList.remove("error-input");
        poundSign.classList.remove("error-span");
    }

    // Validate Mortgage Term
    if (!mortgageTerm.value.trim() || isNaN(parseInt(termValue)) || termValue <= 0) {
        termError.style.display = "block";
        mortgageTerm.classList.add("error-input");
        yearSign.classList.add("error-span");
        isValid = false;
    } else {
        termError.style.display = "none";
        mortgageTerm.classList.remove("error-input");
        yearSign.classList.remove("error-span");
    }

    // Validate Interest Rate
    if (!interestField.value.trim() || isNaN(parseFloat(interestRate)) || interestRate <= 0) {
        interestError.style.display = "block";
        interestField.classList.add("error-input");
        percentSign.classList.add("error-span");
        isValid = false;
    } else {
        interestError.style.display = "none";
        interestField.classList.remove("error-input");
        percentSign.classList.remove("error-span");
    }
    //radio button checker

    if (!repaymentInput && !interestInput) {
        radioError.style.display = "block";
        isValid = false;
    } else {
        radioError.style.display = "none";
    }

    if (!isValid) {
        console.log("Next phase wont transpire...")
        return;
    }

    console.log("Logged! Calulations are loading...");

    // this variable will depend depending on the radio button that was checked
    let monthlyPayment;
    let totalPayment;


    if (repaymentInput) {
        let monthlyRate = interestRate / 12 / 100;
        let totalMonths = termValue * 12;
        monthlyPayment = mortgage_value * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        totalPayment = monthlyPayment * totalMonths;

    } else if (interestInput) {
        let monthlyRate = interestRate / 12 / 100;
        monthlyPayment = mortgage_value * monthlyRate;
        let totalMonths = termValue * 12;
        let totalInterest = monthlyPayment * totalMonths;
        totalPayment = totalInterest + mortgage_value;
    }

    // this formatter is to add the commas in their respected areas
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2, // Ensures two decimal places
    });

    console.log(formatter.format(monthlyPayment));
    console.log(totalPayment.toLocaleString());

    resultPending.style.display = "none";
    resultDiv.style.display = "flex";

    monthPlan.textContent = `${formatter.format(monthlyPayment)}`;
    overTerm.textContent = `${formatter.format(totalPayment)}`;

    // Now to clear everything and put it back to default

});

let clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", () => {

    // redefining due to scoping. Global placement didnt reference these variables

    let amountError = document.querySelector(".amount-error");
    let mortgageAmount = document.getElementById("mortgage-amount");
    let poundSign = document.querySelector(".input-text-m");

    let termError = document.querySelector(".error-term");
    let mortgageTerm = document.getElementById("mortgage-term");
    let yearSign = document.querySelector(".input-year");

    let interestError = document.querySelector(".error-rate");
    let interestField = document.getElementById("interest-rate");
    let percentSign = document.querySelector(".input-percent");

    let radioError = document.querySelector(".error-radio");

    const resultDiv = document.querySelector(".result-container");
    const resultPending = document.querySelector(".potential-results");
    const monthPlan = document.querySelector(".month-plan");
    const overTerm = document.querySelector(".over-term");

    document.getElementById("mortgager").reset();
    resultDiv.style.display = "none";
    resultPending.style.display = "flex";
    monthPlan.textContent = "";
    overTerm.textContent = "";

    amountError.style.display = "none";
    mortgageAmount.classList.remove("error-input");
    poundSign.classList.remove("error-span");


    termError.style.display = "none";
    mortgageTerm.classList.remove("error-input");
    yearSign.classList.remove("error-span");

    interestError.style.display = "none";
    interestField.classList.remove("error-input");
    percentSign.classList.remove("error-span");

    radioError.style.display = "none";

    document.getElementById("repayment").checked = false;
    document.getElementById("interestO").checked = false;

});
