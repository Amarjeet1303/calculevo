// Sample Calculator Data
const calculators = [
  {
    id: "bmi",
    name: "BMI Calculator",
    category: "health",
    html: `
      <h3>BMI Calculator</h3>
      <label>Height (cm): <input type="number" id="bmiHeight" /></label>
      <label>Weight (kg): <input type="number" id="bmiWeight" /></label>
      <button onclick="calculateBMI()">Calculate</button>
      <p id="bmiResult"></p>
    `
  },
  {
    id: "gst",
    name: "GST Calculator",
    category: "finance",
    html: `
      <h3>GST Calculator</h3>
      <label>Amount: <input type="number" id="gstAmount" /></label>
      <label>GST %: <input type="number" id="gstRate" /></label>
      <button onclick="calculateGST()">Calculate</button>
      <p id="gstResult"></p>
    `
  }
  // Add more calculators as needed
];

// Render calculator template with data-category for filtering
function calcTemplate(calc) {
  return `
    <div class="calculator-card" id="${calc.id}" data-category="${calc.category}">
      ${calc.html}
    </div>
  `;
}

// Attach button handlers after render (if needed)
function attachCalculatorHandlers() {
  // Add other calc-specific events if needed
}

// Render calculators
function renderCalculators(calcs) {
  const container = document.getElementById("calculatorContainer");
  if (!container) return;

  if (calcs.length === 0) {
    container.innerHTML = `<p class="no-results">No calculators found.</p>`;
    return;
  }

  container.innerHTML = calcs.map(calcTemplate).join("");
  attachCalculatorHandlers();
}

// Load all calculators
function loadAllCalculators() {
  renderCalculators(calculators);
}

// Show calculators by category
function showCategory(category) {
  const buttons = document.querySelectorAll(".category-btn");

  buttons.forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");

    if (btn.dataset.category === category) {
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
    }
  });

  if (category === "all") {
    loadAllCalculators();
  } else {
    const filtered = calculators.filter((calc) => calc.category === category);
    renderCalculators(filtered);
  }
}

// Filter calculators by search input
let searchTimeout;
function filterCalculators() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const input = document.getElementById("searchBar");
    if (!input) return;

    const term = input.value.toLowerCase();
    const filtered = calculators.filter((calc) =>
      calc.name.toLowerCase().includes(term)
    );
    renderCalculators(filtered);
  }, 200);
}

// Toggle Dark Mode (optional)
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Mobile Menu Toggle
function initMobileMenuToggle() {
  const toggleBtn = document.querySelector("#menuToggle");
  const nav = document.querySelector("#navbar");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }
}

// Load stored theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  const toggles = document.querySelectorAll(".dark-toggle");
  toggles.forEach((toggle) => {
    toggle.checked = document.body.classList.contains("dark");
    toggle.addEventListener("change", toggleDarkMode);
  });
}

// Initialize app after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadAllCalculators();
  initMobileMenuToggle();
  initTheme();

  // Category buttons event listeners
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      showCategory(category);
    });
  });

  // Search input event listener
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", filterCalculators);
  }
});

// === Calculator Functions ===

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
