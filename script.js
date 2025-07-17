"use strict";

// Calculator data for 10 calculators, categories and IDs
const calculators = [
  // Finance
  { id: "emi", name: "EMI Calculator", category: "finance" },
  { id: "loan", name: "Loan Calculator", category: "finance" },

  // Health
  { id: "bmi", name: "BMI Calculator", category: "health" },
  { id: "bmr", name: "BMR Calculator", category: "health" },

  // Math
  { id: "percentage", name: "Percentage Calculator", category: "math" },
  { id: "discount", name: "Discount Calculator", category: "math" },

  // Conversion
  { id: "cmToInch", name: "CM to Inch Converter", category: "conversion" },
  { id: "kmToMiles", name: "KM to Miles Converter", category: "conversion" },

  // DateTime
  { id: "daysBetween", name: "Days Between Dates", category: "datetime" },
  { id: "futureDate", name: "Future Date Finder", category: "datetime" },
];

// Sticky header on scroll (optional)
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 10) header.classList.add("sticky");
  else header.classList.remove("sticky");
});

// Dark mode toggle & save preference
const darkToggleElems = document.querySelectorAll("#darkModeToggle, #darkModeToggleFitness, #darkModeToggleAbout");

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark");
    darkToggleElems.forEach((el) => (el.checked = true));
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark");
    darkToggleElems.forEach((el) => (el.checked = false));
    localStorage.setItem("darkMode", "disabled");
  }
}

function toggleDarkMode() {
  setDarkMode(!document.body.classList.contains("dark"));
}

// On load - apply saved theme
document.addEventListener("DOMContentLoaded", () => {
  const darkModeSetting = localStorage.getItem("darkMode");
  setDarkMode(darkModeSetting === "enabled");
  // Load calculators on homepage
  if (document.getElementById("calculatorContainer")) loadAllCalculators();

  // Load fitness calculators on fitness page
  if (document.getElementById("fitnessCalculators")) loadFitnessCalculators();

  // Sync toggle inputs
  darkToggleElems.forEach((toggle) =>
    toggle.addEventListener("change", toggleDarkMode)
  );
});

// Category filtering
function showCategory(category) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
  });

  const clickedBtn = [...buttons].find((btn) => btn.textContent.toLowerCase().includes(category));
  if (clickedBtn) {
    clickedBtn.classList.add("active");
    clickedBtn.setAttribute("aria-pressed", "true");
  }

  if (category === "all") {
    loadAllCalculators();
    return;
  }

  const filtered = calculators.filter((calc) => calc.category === category);
  renderCalculators(filtered);
}

// Search filter
function filterCalculators() {
  const input = document.getElementById("searchBar").value.toLowerCase();
  const filtered = calculators.filter((calc) =>
    calc.name.toLowerCase().includes(input)
  );
  renderCalculators(filtered);
}

// Render calculators on homepage container
function loadAllCalculators() {
  renderCalculators(calculators);
}

function renderCalculators(calcs) {
  const container = document.getElementById("calculatorContainer");
  if (!container) return;

  container.innerHTML = calcs.map(calcTemplate).join("");
  attachCalculatorHandlers();
}

// Render fitness calculators on fitness page (subset)
function loadFitnessCalculators() {
  const fitnessCalcs = calculators.filter((c) => c.category === "health");
  const container = document.getElementById("fitnessCalculators");
  if (!container) return;

  container.innerHTML = fitnessCalcs.map(calcTemplate).join("");
  attachCalculatorHandlers();
}

// Calculator HTML Template
function calcTemplate(calc) {
  switch(calc.id) {
    case "emi":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="principal">Principal Amount (₹)</label>
        <input type="number" id="principal" min="0" placeholder="e.g., 500000" />
        <label for="rate">Annual Interest Rate (%)</label>
        <input type="number" id="rate" min="0" step="0.01" placeholder="e.g., 7.5" />
        <label for="tenure">Tenure (Years)</label>
        <input type="number" id="tenure" min="0" placeholder="e.g., 15" />
        <button onclick="calculateEMI()">Calculate</button>
        <div class="result" id="emiResult" aria-live="polite"></div>
      </section>
      `;
    case "loan":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="loanAmount">Loan Amount (₹)</label>
        <input type="number" id="loanAmount" min="0" placeholder="e.g., 1000000" />
        <label for="loanInterest">Interest Rate (%)</label>
        <input type="number" id="loanInterest" min="0" step="0.01" placeholder="e.g., 9" />
        <label for="loanTenure">Tenure (Years)</label>
        <input type="number" id="loanTenure" min="0" placeholder="e.g., 10" />
        <button onclick="calculateLoan()">Calculate</button>
        <div class="result" id="loanResult" aria-live="polite"></div>
      </section>
      `;
    case "bmi":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="weight">Weight (kg)</label>
        <input type="number" id="weight" min="0" placeholder="e.g., 70" />
        <label for="height">Height (cm)</label>
        <input type="number" id="height" min="0" placeholder="e.g., 170" />
        <button onclick="calculateBMI()">Calculate</button>
        <div class="result" id="bmiResult" aria-live="polite"></div>
      </section>
      `;
    case "bmr":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="bmrWeight">Weight (kg)</label>
        <input type="number" id="bmrWeight" min="0" placeholder="e.g., 70" />
        <label for="bmrHeight">Height (cm)</label>
        <input type="number" id="bmrHeight" min="0" placeholder="e.g., 170" />
        <label for="age">Age (years)</label>
        <input type="number" id="age" min="0" placeholder="e.g., 30" />
        <label for="gender">Gender</label>
        <select id="gender">
          <option value="" disabled selected>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button onclick="calculateBMR()">Calculate</button>
        <div class="result" id="bmrResult" aria-live="polite"></div>
      </section>
      `;
    case "percentage":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="part">Part</label>
        <input type="number" id="part" min="0" placeholder="e.g., 50" />
        <label for="total">Total</label>
        <input type="number" id="total" min="0" placeholder="e.g., 200" />
        <button onclick="calculatePercentage()">Calculate</button>
        <div class="result" id="percentageResult" aria-live="polite"></div>
      </section>
      `;
    case "discount":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="originalPrice">Original Price (₹)</label>
        <input type="number" id="originalPrice" min="0" placeholder="e.g., 1000" />
        <label for="discountPercent">Discount Percentage (%)</label>
        <input type="number" id="discountPercent" min="0" max="100" placeholder="e.g., 15" />
        <button onclick="calculateDiscount()">Calculate</button>
        <div class="result" id="discountResult" aria-live="polite"></div>
      </section>
      `;
    case "cmToInch":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="cm">Centimeters (cm)</label>
        <input type="number" id="cm" min="0" placeholder="e.g., 180" />
        <button onclick="calculateCmToInch()">Calculate</button>
        <div class="result" id="cmToInchResult" aria-live="polite"></div>
      </section>
      `;
    case "kmToMiles":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="km">Kilometers (km)</label>
        <input type="number" id="km" min="0" placeholder="e.g., 10" />
        <button onclick="calculateKmToMiles()">Calculate</button>
        <div class="result" id="kmToMilesResult" aria-live="polite"></div>
      </section>
      `;
    case "daysBetween":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="startDate">Start Date</label>
        <input type="date" id="startDate" />
        <label for="endDate">End Date</label>
        <input type="date" id="endDate" />
        <button onclick="calculateDaysBetween()">Calculate</button>
        <div class="result" id="daysBetweenResult" aria-live="polite"></div>
      </section>
      `;
    case "futureDate":
      return `
      <section class="calculator" id="calc-${calc.id}" aria-label="${calc.name}">
        <h3>${calc.name}</h3>
        <label for="currentDate">Current Date</label>
        <input type="date" id="currentDate" />
        <label for="daysToAdd">Days to Add</label>
        <input type="number" id="daysToAdd" min="0" placeholder="e.g., 30" />
        <button onclick="calculateFutureDate()">Calculate</button>
        <div class="result" id="futureDateResult" aria-live="polite"></div>
      </section>
      `;
    default:
      return "";
  }
}

// Attach event handlers if needed
function attachCalculatorHandlers() {
  // Could attach event listeners if you want live calculation or validation
}

// Calculator logic functions

function calculateEMI() {
  const P = parseFloat(document.getElementById("principal").value);
  const r = parseFloat(document.getElementById("rate").value) / 1200;
  const n = parseFloat(document.getElementById("tenure").value) * 12;

  const resultDiv = document.getElementById("emiResult");

  if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
    resultDiv.textContent = "Please enter valid positive inputs.";
    return;
  }

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  resultDiv.textContent = `Monthly EMI: ₹${emi.toFixed(2)}`;
}

function calculateLoan() {
  const amount = parseFloat(document.getElementById("loanAmount").value);
  const rate = parseFloat(document.getElementById("loanInterest").value) / 100;
  const years = parseFloat(document.getElementById("loanTenure").value);

  const resultDiv = document.getElementById("loanResult");

  if (isNaN(amount) || isNaN(rate) || isNaN(years) || amount <= 0 || rate <= 0 || years <= 0) {
    resultDiv.textContent = "Please enter valid positive inputs.";
    return;
  }

  const totalInterest = amount * rate * years;
  const totalPayment = amount + totalInterest;
  const monthlyPayment = totalPayment / (years * 12);

  resultDiv.textContent = `Total Interest: ₹${totalInterest.toFixed(2)}, Total Payment: ₹${totalPayment.toFixed(2)}, Monthly Payment: ₹${monthlyPayment.toFixed(2)}`;
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  const resultDiv = document.getElementById("bmiResult");

  if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
    resultDiv.textContent = "Please enter valid positive inputs.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  resultDiv.textContent = `BMI: ${bmi.toFixed(2)} (${category})`;
}

function calculateBMR() {
  const weight = parseFloat(document.getElementById("bmrWeight").value);
  const height = parseFloat(document.getElementById("bmrHeight").value);
  const age = parseFloat(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;

  const resultDiv = document.getElementById("bmrResult");

  if (
    isNaN(weight) ||
    isNaN(height) ||
    isNaN(age) ||
    weight <= 0 ||
    height <= 0 ||
    age <= 0 ||
    !["male", "female"].includes(gender)
  ) {
    resultDiv.textContent = "Please enter valid inputs and select gender.";
    return;
  }

  let bmr = 0;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  }

  resultDiv.textContent = `BMR: ${bmr.toFixed(2)} calories/day`;
}

function calculatePercentage() {
  const part = parseFloat(document.getElementById("part").value);
  const total = parseFloat(document.getElementById("total").value);
  const resultDiv = document.getElementById("percentageResult");

  if (isNaN(part) || isNaN(total) || part < 0 || total <= 0 || part > total) {
    resultDiv.textContent = "Please enter valid inputs (part ≤ total).";
    return;
  }

  const percentage = (part / total) * 100;
  resultDiv.textContent = `Percentage: ${percentage.toFixed(2)}%`;
}

function calculateDiscount() {
  const original = parseFloat(document.getElementById("originalPrice").value);
  const discount = parseFloat(document.getElementById("discountPercent").value);
  const resultDiv = document.getElementById("discountResult");

  if (
    isNaN(original) ||
    isNaN(discount) ||
    original <= 0 ||
    discount < 0 ||
    discount > 100
  ) {
    resultDiv.textContent = "Please enter valid inputs (discount 0-100%).";
    return;
  }

  const discountedPrice = original * (1 - discount / 100);
  resultDiv.textContent = `Discounted Price: ₹${discountedPrice.toFixed(2)}`;
}

function calculateCmToInch() {
  const cm = parseFloat(document.getElementById("cm").value);
  const resultDiv = document.getElementById("cmToInchResult");

  if (isNaN(cm) || cm < 0) {
    resultDiv.textContent = "Please enter valid non-negative input.";
    return;
  }

  const inches = cm / 2.54;
  resultDiv.textContent = `${cm} cm = ${inches.toFixed(2)} inches`;
}

function calculateKmToMiles() {
  const km = parseFloat(document.getElementById("km").value);
  const resultDiv = document.getElementById("kmToMilesResult");

  if (isNaN(km) || km < 0) {
    resultDiv.textContent = "Please enter valid non-negative input.";
    return;
  }

  const miles = km * 0.621371;
  resultDiv.textContent = `${km} km = ${miles.toFixed(2)} miles`;
}

function calculateDaysBetween() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const resultDiv = document.getElementById("daysBetweenResult");

  if (!start || !end) {
    resultDiv.textContent = "Please select both start and end dates.";
    return;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    resultDiv.textContent = "End date must be after start date.";
    return;
  }

  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  resultDiv.textContent = `Days Between: ${diffDays} days`;
}

function calculateFutureDate() {
  const current = document.getElementById("currentDate").value;
  const days = parseInt(document.getElementById("daysToAdd").value, 10);
  const resultDiv = document.getElementById("futureDateResult");

  if (!current || isNaN(days) || days < 0) {
    resultDiv.textContent = "Please select date and enter valid days.";
    return;
  }

  const currentDate = new Date(current);
  currentDate.setDate(currentDate.getDate() + days);

  resultDiv.textContent = `Future Date: ${currentDate.toISOString().split("T")[0]}`;
}
