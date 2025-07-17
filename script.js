// 10 calculators data with html & categories
const calculators = [
  {
    id: "bmi",
    name: "BMI Calculator",
    category: "health",
    html: `
      <h3>BMI Calculator</h3>
      <label>Height (cm): <input type="number" id="bmiHeight" min="0" /></label>
      <label>Weight (kg): <input type="number" id="bmiWeight" min="0" /></label>
      <button onclick="calculateBMI()">Calculate</button>
      <p class="result" id="bmiResult"></p>
    `
  },
  {
    id: "gst",
    name: "GST Calculator",
    category: "finance",
    html: `
      <h3>GST Calculator</h3>
      <label>Amount (₹): <input type="number" id="gstAmount" min="0" /></label>
      <label>GST %: <input type="number" id="gstRate" min="0" /></label>
      <button onclick="calculateGST()">Calculate</button>
      <p class="result" id="gstResult"></p>
    `
  },
  {
    id: "loan",
    name: "Loan EMI Calculator",
    category: "finance",
    html: `
      <h3>Loan EMI Calculator</h3>
      <label>Principal (₹): <input type="number" id="loanPrincipal" min="0" /></label>
      <label>Annual Interest Rate (%): <input type="number" id="loanRate" min="0" step="0.01"/></label>
      <label>Tenure (Years): <input type="number" id="loanTenure" min="0" /></label>
      <button onclick="calculateLoanEMI()">Calculate</button>
      <p class="result" id="loanResult"></p>
    `
  },
  {
    id: "fahrenheit",
    name: "Fahrenheit to Celsius",
    category: "conversion",
    html: `
      <h3>Fahrenheit to Celsius</h3>
      <label>Fahrenheit: <input type="number" id="fahrenheitInput" /></label>
      <button onclick="convertFtoC()">Convert</button>
      <p class="result" id="fahrenheitResult"></p>
    `
  },
  {
    id: "celsius",
    name: "Celsius to Fahrenheit",
    category: "conversion",
    html: `
      <h3>Celsius to Fahrenheit</h3>
      <label>Celsius: <input type="number" id="celsiusInput" /></label>
      <button onclick="convertCtoF()">Convert</button>
      <p class="result" id="celsiusResult"></p>
    `
  },
  {
    id: "simpleInterest",
    name: "Simple Interest Calculator",
    category: "finance",
    html: `
      <h3>Simple Interest Calculator</h3>
      <label>Principal (₹): <input type="number" id="siPrincipal" min="0" /></label>
      <label>Rate of Interest (%): <input type="number" id="siRate" min="0" step="0.01"/></label>
      <label>Time (Years): <input type="number" id="siTime" min="0" /></label>
      <button onclick="calculateSimpleInterest()">Calculate</button>
      <p class="result" id="siResult"></p>
    `
  },
  {
    id: "ageCalc",
    name: "Age Calculator",
    category: "datetime",
    html: `
      <h3>Age Calculator</h3>
      <label>Date of Birth: <input type="date" id="dobInput" max="${new Date().toISOString().split('T')[0]}" /></label>
      <button onclick="calculateAge()">Calculate</button>
      <p class="result" id="ageResult"></p>
    `
  },
  {
    id: "percentage",
    name: "Percentage Calculator",
    category: "math",
    html: `
      <h3>Percentage Calculator</h3>
      <label>Part: <input type="number" id="partInput" min="0" /></label>
      <label>Total: <input type="number" id="totalInput" min="0" /></label>
      <button onclick="calculatePercentage()">Calculate</button>
      <p class="result" id="percentageResult"></p>
    `
  },
  {
    id: "compoundInterest",
    name: "Compound Interest Calculator",
    category: "finance",
    html: `
      <h3>Compound Interest Calculator</h3>
      <label>Principal (₹): <input type="number" id="ciPrincipal" min="0" /></label>
      <label>Annual Rate (%): <input type="number" id="ciRate" min="0" step="0.01"/></label>
      <label>Times Compounded Per Year: <input type="number" id="ciTimes" min="1" value="1" /></label>
      <label>Time (Years): <input type="number" id="ciTime" min="0" /></label>
      <button onclick="calculateCompoundInterest()">Calculate</button>
      <p class="result" id="ciResult"></p>
    `
  },
  {
    id: "daysBetween",
    name: "Days Between Dates",
    category: "datetime",
    html: `
      <h3>Days Between Dates</h3>
      <label>Start Date: <input type="date" id="startDate" /></label>
      <label>End Date: <input type="date" id="endDate" /></label>
      <button onclick="calculateDaysBetween()">Calculate</button>
      <p class="result" id="daysResult"></p>
    `
  },
];

// Render calculator cards
function calcTemplate(calc) {
  return `
    <article class="calculator" id="${calc.id}" data-category="${calc.category}">
      ${calc.html}
    </article>
  `;
}

// Render calculators in container
function renderCalculators(calcs) {
  const container = document.getElementById("calculatorContainer");
  if (!container) return;

  if (calcs.length === 0) {
    container.innerHTML = `<p class="no-results">No calculators found.</p>`;
    return;
  }
  container.innerHTML = calcs.map(calcTemplate).join("");
}

// Show calculators by category
function showCategory(category) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });

  if (category === "all") {
    renderCalculators(calculators);
  } else {
    const filtered = calculators.filter((c) => c.category === category);
    renderCalculators(filtered);
  }
}

// Search calculators by name
let searchTimeout;
function filterCalculators() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const term = document.getElementById("searchBar").value.toLowerCase();
    const filtered = calculators.filter((calc) =>
      calc.name.toLowerCase().includes(term)
    );
    renderCalculators(filtered);

    // Reset category buttons active state
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === "all");
    });
  }, 200);
}

// Dark Mode Toggle
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load saved theme
function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    document.querySelector(".dark-toggle").checked = true;
  }
  document.querySelector(".dark-toggle").addEventListener("change", toggleDarkMode);
}

// Mobile menu toggle
function initMobileMenuToggle() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar");

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    toggleBtn.setAttribute("aria-expanded", nav.classList.contains("show"));
  });
}

// Calculator functions below

function calculateBMI() {
  const h = parseFloat(document.getElementById("bmiHeight").value) / 100;
  const w = parseFloat(document.getElementById("bmiWeight").value);
  const r = document.getElementById("bmiResult");

  if (!h || !w) {
    r.textContent = "Please enter valid height and weight.";
    return;
  }
  const bmi = w / (h * h);
  r.textContent = `Your BMI is ${bmi.toFixed(2)}`;
}

function calculateGST() {
  const amount = parseFloat(document.getElementById("gstAmount").value);
  const rate = parseFloat(document.getElementById("gstRate").value);
  const r = document.getElementById("gstResult");

  if (!amount || !rate) {
    r.textContent = "Please enter valid amount and GST rate.";
    return;
  }
  const gst = (amount * rate) / 100;
  const total = amount + gst;
  r.textContent = `GST: ₹${gst.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
}

function calculateLoanEMI() {
  const P = parseFloat(document.getElementById("loanPrincipal").value);
  const R = parseFloat(document.getElementById("loanRate").value) / 12 / 100;
  const N = parseInt(document.getElementById("loanTenure").value) * 12;
  const r = document.getElementById("loanResult");

  if (!P || !R || !N) {
    r.textContent = "Please enter valid principal, interest rate and tenure.";
    return;
  }

  const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  r.textContent = `Your monthly EMI is ₹${emi.toFixed(2)}`;
}

function convertFtoC() {
  const f = parseFloat(document.getElementById("fahrenheitInput").value);
  const r = document.getElementById("fahrenheitResult");
  if (isNaN(f)) {
    r.textContent = "Please enter a valid number.";
    return;
  }
  const c = (f - 32) * (5 / 9);
  r.textContent = `${f}°F = ${c.toFixed(2)}°C`;
}

function convertCtoF() {
  const c = parseFloat(document.getElementById("celsiusInput").value);
  const r = document.getElementById("celsiusResult");
  if (isNaN(c)) {
    r.textContent = "Please enter a valid number.";
    return;
  }
  const f = (c * 9) / 5 + 32;
  r.textContent = `${c}°C = ${f.toFixed(2)}°F`;
}

function calculateSimpleInterest() {
  const P = parseFloat(document.getElementById("siPrincipal").value);
  const R = parseFloat(document.getElementById("siRate").value);
  const T = parseFloat(document.getElementById("siTime").value);
  const r = document.getElementById("siResult");

  if (!P || !R || !T) {
    r.textContent = "Please enter valid principal, rate and time.";
    return;
  }
  const SI = (P * R * T) / 100;
  r.textContent = `Simple Interest: ₹${SI.toFixed(2)}`;
}

function calculateAge() {
  const dobInput = document.getElementById("dobInput").value;
  const r = document.getElementById("ageResult");
  if (!dobInput) {
    r.textContent = "Please select your date of birth.";
    return;
  }
  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    r.textContent = "Date of birth cannot be in the future.";
    return;
  }

  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  r.textContent = `Your age is ${age} years`;
}

function calculatePercentage() {
  const part = parseFloat(document.getElementById("partInput").value);
  const total = parseFloat(document.getElementById("totalInput").value);
  const r = document.getElementById("percentageResult");

  if (!part || !total || total === 0) {
    r.textContent = "Please enter valid part and total (total must be > 0).";
    return;
  }

  const percentage = (part / total) * 100;
  r.textContent = `${percentage.toFixed(2)}%`;
}

function calculateCompoundInterest() {
  const P = parseFloat(document.getElementById("ciPrincipal").value);
  const R = parseFloat(document.getElementById("ciRate").value) / 100;
  const n = parseInt(document.getElementById("ciTimes").value);
  const t = parseFloat(document.getElementById("ciTime").value);
  const r = document.getElementById("ciResult");

  if (!P || !R || !n || !t) {
    r.textContent = "Please enter valid principal, rate, times/year, and time.";
    return;
  }

  const amount = P * Math.pow(1 + R / n, n * t);
  const ci = amount - P;
  r.textContent = `Compound Interest: ₹${ci.toFixed(2)} | Amount: ₹${amount.toFixed(2)}`;
}

function calculateDaysBetween() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const r = document.getElementById("daysResult");

  if (!start || !end) {
    r.textContent = "Please select both dates.";
    return;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (endDate < startDate) {
    r.textContent = "End date must be after start date.";
    return;
  }

  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  r.textContent = `There are ${diffDays} day(s) between the two dates.`;
}

// Initialize app after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  renderCalculators(calculators);

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn) =>
    btn.addEventListener("click", () => showCategory(btn.dataset.category))
  );

  document.getElementById("searchBar").addEventListener("input", filterCalculators);

  initMobileMenuToggle();
  initTheme();
});
