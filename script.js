// Updated script.js for Calculevo with full logic, formulas, and unit options including math and chat tools

document.addEventListener('DOMContentLoaded', () => {
  showCalculator('health');
  document.getElementById('search').addEventListener('input', searchCalculators);
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      showCalculator(category);
    });
  });
});

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

function searchCalculators() {
  const query = document.getElementById('search').value.toLowerCase();
  const main = document.querySelector('main');
  const allCalculators = [
    ...getCalculatorsByCategory('health'),
    ...getCalculatorsByCategory('finance'),
    ...getCalculatorsByCategory('math'),
    ...getCalculatorsByCategory('chat')
  ];
  main.innerHTML = '';
  const filtered = allCalculators.filter(calc => calc.name.toLowerCase().includes(query));
  if (filtered.length === 0) {
    main.innerHTML = '<p class="text-center text-gray-500">No calculators found.</p>';
    return;
  }
  filtered.forEach(calc => renderCalculator(calc));
  triggerScrollAnimations();
}

function showCalculator(category) {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const calculators = getCalculatorsByCategory(category);
  calculators.forEach(calc => renderCalculator(calc));
  triggerScrollAnimations();
}

function renderCalculator(calc) {
  const main = document.querySelector('main');
  const section = document.createElement('section');
  section.className = 'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md scroll-animate';
  section.innerHTML = `
    <h3 class="text-xl font-bold mb-4 text-cyan-600">${calc.name}</h3>
    <div>${calc.form}</div>
    <p id="${calc.resultId}" class="mt-4 text-lg text-gray-700 dark:text-gray-300"></p>
  `;
  main.appendChild(section);
}

function getCalculatorsByCategory(category) {
  switch(category) {
    case 'health':
      return [bmiCalc(), bmrCalc(), idealWeightCalc(), waterIntakeCalc()];
    case 'finance':
      return [emiCalc(), sipCalc(), loanCalc(), taxCalc()];
    case 'math':
      return [ageCalc(), percentageCalc(), unitConvertCalc()];
    case 'chat':
      return [wordCountCalc(), lineCountCalc()];
    default:
      return [];
  }
}

function triggerScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-animate');
  elements.forEach((el, i) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = 1;
    }, 100 * i);
  });
}

// ------------------ MATH CALCULATORS ------------------
function ageCalc() {
  return {
    name: 'Age Calculator',
    resultId: 'age-result',
    form: `
      <input type="date" id="dob" class="input-box">
      <button onclick="calculateAge()" class="btn">Calculate</button>`
  };
}

function calculateAge() {
  const dob = new Date(document.getElementById('dob').value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  document.getElementById('age-result').innerText = `Age: ${age} years`;
}

function percentageCalc() {
  return {
    name: 'Percentage Calculator',
    resultId: 'percent-result',
    form: `
      <input type="number" id="percent-value" placeholder="Value" class="input-box">
      <input type="number" id="percent-total" placeholder="Total" class="input-box">
      <button onclick="calculatePercentage()" class="btn">Calculate</button>`
  };
}

function calculatePercentage() {
  const value = parseFloat(document.getElementById('percent-value').value);
  const total = parseFloat(document.getElementById('percent-total').value);
  if (value && total) {
    const percent = (value / total * 100).toFixed(2);
    document.getElementById('percent-result').innerText = `${percent}%`;
  }
}

function unitConvertCalc() {
  return {
    name: 'Unit Converter (Length)',
    resultId: 'unit-result',
    form: `
      <input type="number" id="unit-value" placeholder="Enter value" class="input-box">
      <select id="unit-from" class="input-box">
        <option value="meter">Meter</option>
        <option value="kilometer">Kilometer</option>
        <option value="centimeter">Centimeter</option>
      </select>
      <select id="unit-to" class="input-box">
        <option value="meter">Meter</option>
        <option value="kilometer">Kilometer</option>
        <option value="centimeter">Centimeter</option>
      </select>
      <button onclick="convertUnit()" class="btn">Convert</button>`
  };
}

function convertUnit() {
  const val = parseFloat(document.getElementById('unit-value').value);
  const from = document.getElementById('unit-from').value;
  const to = document.getElementById('unit-to').value;
  const rates = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100
  };
  const converted = (val / rates[from]) * rates[to];
  document.getElementById('unit-result').innerText = `Converted: ${converted.toFixed(4)} ${to}`;
}

// ------------------ CHAT TOOLS ------------------
function wordCountCalc() {
  return {
    name: 'Word Counter',
    resultId: 'word-result',
    form: `
      <textarea id="word-input" rows="4" class="input-box" placeholder="Enter text..."></textarea>
      <button onclick="countWords()" class="btn">Count Words</button>`
  };
}

function countWords() {
  const text = document.getElementById('word-input').value.trim();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  document.getElementById('word-result').innerText = `Word Count: ${words.length}`;
}

function lineCountCalc() {
  return {
    name: 'Line Counter',
    resultId: 'line-result',
    form: `
      <textarea id="line-input" rows="4" class="input-box" placeholder="Enter text..."></textarea>
      <button onclick="countLines()" class="btn">Count Lines</button>`
  };
}

function countLines() {
  const text = document.getElementById('line-input').value.trim();
  const lines = text.split(/\n+/).filter(l => l.trim().length > 0);
  document.getElementById('line-result').innerText = `Line Count: ${lines.length}`;
}

// ------------------ FINANCE CALCULATORS ------------------
function emiCalc() {
  return {
    name: 'EMI Calculator',
    resultId: 'emi-result',
    form: `
      <input type="number" id="emi-principal" placeholder="Loan Amount (₹)" class="input-box">
      <input type="number" id="emi-rate" placeholder="Annual Interest Rate (%)" class="input-box">
      <input type="number" id="emi-tenure" placeholder="Loan Tenure (months)" class="input-box">
      <button onclick="calculateEMI()" class="btn">Calculate EMI</button>
    `
  };
}

function calculateEMI() {
  const P = parseFloat(document.getElementById('emi-principal').value);
  const annualRate = parseFloat(document.getElementById('emi-rate').value);
  const N = parseInt(document.getElementById('emi-tenure').value);

  const R = annualRate / 12 / 100;
  if (!isNaN(P) && !isNaN(R) && !isNaN(N)) {
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    document.getElementById('emi-result').innerText = `Monthly EMI: ₹${emi.toFixed(2)}`;
  }
}

function sipCalc() {
  return {
    name: 'SIP Calculator',
    resultId: 'sip-result',
    form: `
      <input type="number" id="sip-amount" placeholder="Monthly Investment (₹)" class="input-box">
      <input type="number" id="sip-rate" placeholder="Expected Annual Return (%)" class="input-box">
      <input type="number" id="sip-years" placeholder="Investment Duration (years)" class="input-box">
      <button onclick="calculateSIP()" class="btn">Calculate Returns</button>
    `
  };
}

function calculateSIP() {
  const P = parseFloat(document.getElementById('sip-amount').value);
  const annualRate = parseFloat(document.getElementById('sip-rate').value);
  const years = parseFloat(document.getElementById('sip-years').value);

  const r = annualRate / 12 / 100;
  const n = years * 12;

  if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
    const futureValue = P * ((Math.pow(1 + r, n) - 1) * (1 + r)) / r;
    document.getElementById('sip-result').innerText = `Future Value: ₹${futureValue.toFixed(2)}`;
  }
}

function loanCalc() {
  return {
    name: 'Loan Eligibility Calculator',
    resultId: 'loan-result',
    form: `
      <input type="number" id="loan-income" placeholder="Monthly Income (₹)" class="input-box">
      <input type="number" id="loan-expense" placeholder="Monthly Expenses (₹)" class="input-box">
      <input type="number" id="loan-rate" placeholder="Interest Rate (%)" class="input-box">
      <input type="number" id="loan-tenure" placeholder="Tenure (years)" class="input-box">
      <button onclick="calculateLoanEligibility()" class="btn">Calculate Eligibility</button>
    `
  };
}

function calculateLoanEligibility() {
  const income = parseFloat(document.getElementById('loan-income').value);
  const expense = parseFloat(document.getElementById('loan-expense').value);
  const rate = parseFloat(document.getElementById('loan-rate').value) / 12 / 100;
  const tenureYears = parseFloat(document.getElementById('loan-tenure').value);
  const months = tenureYears * 12;

  const surplus = income - expense;

  if (!isNaN(surplus) && surplus > 0 && !isNaN(rate) && !isNaN(months)) {
    const loanEligibility = surplus * (1 - Math.pow(1 + rate, -months)) / rate;
    document.getElementById('loan-result').innerText = `Eligible Loan Amount: ₹${loanEligibility.toFixed(2)}`;
  }
}

function taxCalc() {
  return {
    name: 'Income Tax Calculator (India)',
    resultId: 'tax-result',
    form: `
      <input type="number" id="tax-income" placeholder="Annual Income (₹)" class="input-box">
      <button onclick="calculateTax()" class="btn">Calculate Tax</button>
    `
  };
}

function calculateTax() {
  const income = parseFloat(document.getElementById('tax-income').value);
  let tax = 0;

  if (income <= 250000) tax = 0;
  else if (income <= 500000) tax = (income - 250000) * 0.05;
  else if (income <= 1000000)
    tax = 12500 + (income - 500000) * 0.2;
  else tax = 112500 + (income - 1000000) * 0.3;

  document.getElementById('tax-result').innerText = `Estimated Tax: ₹${tax.toFixed(2)}`;
}
