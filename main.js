document.getElementById("sipAmount").addEventListener("input", function () {
    validateSIPAmount(this);
});

document.getElementById("sipRate").addEventListener("input", function () {
    validateSIPRate(this);
});

document.getElementById("sipPeriod").addEventListener("input", function () {
    validateSIPPeriod(this);
});

function calculateSIP() {
    const sipAmountInput = document.getElementById("sipAmount");
    const sipRateInput = document.getElementById("sipRate");
    const sipPeriodInput = document.getElementById("sipPeriod");
    const resultDiv = document.getElementById("sipResult");

    const sipAmountError = document.getElementById("sipAmountError");
    const sipRateError = document.getElementById("sipRateError");
    const sipPeriodError = document.getElementById("sipPeriodError");

    sipAmountError.style.display = "none";
    sipRateError.style.display = "none";
    sipPeriodError.style.display = "none";


    const P = parseFloat(sipAmountInput.value);
    const r = parseFloat(sipRateInput.value);
    const n = parseFloat(sipPeriodInput.value) * 12;


    let isValid = true;

    if (isNaN(P) || P < 100 || P > 1000000) {
        isValid = false;
        shakeInput(sipAmountInput, sipAmountError, "Enter a valid SIP amount (₹100 - ₹10,00,000).");
    }
    if (isNaN(r) || r < 1 || r > 30) {
        isValid = false;
        shakeInput(sipRateInput, sipRateError, "Rate should be between 1% and 30%.");
    }
    if (isNaN(n) || n < 12 || n > 480) {
        isValid = false;
        shakeInput(sipPeriodInput, sipPeriodError, "Period should be between 1 and 40 years.");
    }

    if (!isValid) {
        resultDiv.innerHTML = "";
        return;
    }

    const monthlyRate = r / 100 / 12;
    const FV = P * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
    const investedAmount = P * n;
    const estimatedReturns = FV - investedAmount;

    resultDiv.innerHTML = `
      <div class="result-card">
        <h3>Investment Summary</h3>
        <p><strong>Invested Amount:</strong> ₹${investedAmount.toFixed(2)}</p>
        <p><strong>Estimated Returns:</strong> ₹${estimatedReturns.toFixed(2)}</p>
        <p><strong>Total Value:</strong> ₹${FV.toFixed(2)}</p>
      </div>
    `;
}


function shakeInput(inputElement, errorElement, errorMessage) {
    inputElement.classList.add("shake");
    errorElement.style.display = "block";
    errorElement.textContent = errorMessage;

    setTimeout(() => {
        inputElement.classList.remove("shake");
    }, 300);
}


function validateSIPAmount(input) {
    const value = parseFloat(input.value);
    const error = document.getElementById("sipAmountError");
    if (isNaN(value) || value < 100 || value > 1000000) {
        error.style.display = "block";
        error.textContent = "Amount should be between ₹100 and ₹10,00,000.";
        input.classList.add("shake");
    } else {
        error.style.display = "none";
        input.classList.remove("shake");
    }
}


function validateSIPRate(input) {
    const value = parseFloat(input.value);
    const error = document.getElementById("sipRateError");


    if (isNaN(value) || value < 1 || value > 30) {
        error.style.display = "block";
        error.textContent = "Rate should be between 1% and 30%.";
        input.classList.add("shake");
    } else {
        error.style.display = "none";
        input.classList.remove("shake");
    }
}


function validateSIPPeriod(input) {
    const value = parseFloat(input.value);
    const error = document.getElementById("sipPeriodError");
    if (isNaN(value) || value < 1 || value > 40) {
        error.style.display = "block";
        error.textContent = "Period should be between 1 and 40 years.";
        input.classList.add("shake");
    } else {
        error.style.display = "none";
        input.classList.remove("shake");
    }
}
