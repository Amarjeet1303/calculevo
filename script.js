// script.js for Calculevo - Functional logic for 20 calculators with scroll-triggered animations

document.addEventListener('DOMContentLoaded', () => {
  showCalculator('health');
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
  const placeholder = document.getElementById('placeholder');
  placeholder.innerText = `Searching for: ${query}`;
}

function showCalculator(category) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const calculators = getCalculatorsByCategory(category);

  calculators.forEach(calc => {
    const section = document.createElement('section');
    section.className = 'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md scroll-animate';
    section.innerHTML = `
      <h3 class="text-xl font-bold mb-4 text-cyan-600">${calc.name}</h3>
      <div>${calc.form}</div>
      <p id="${calc.resultId}" class="mt-4 text-lg text-gray-700 dark:text-gray-300"></p>
    `;
    main.appendChild(section);
  });

  triggerScrollAnimations();
}

function getCalculatorsByCategory(category) {
  switch(category) {
    case 'health':
      return [bmiCalc(), bmrCalc(), idealWeightCalc(), waterIntakeCalc()];
    case 'finance':
      return [emiCalc(), sipCalc(), loanCalc(), taxCalc()];
    case 'math':
      return [ageCalc(), percentageCalc(), areaCalc(), unitConverterCalc(), gpaCalc()];
    case 'chat':
      return [wordCountCalc(), readingTimeCalc(), charCountCalc(), lineCountCalc(), sentenceCountCalc()];
    default:
      return [];
  }
}

// --- Health Calculators ---
function bmiCalc() {
  return {
    name: 'BMI Calculator',
    resultId: 'bmiResult',
    form: `
      <input id="bmiWeight" class="input" placeholder="Weight (kg)" type="number">
      <input id="bmiHeight" class="input" placeholder="Height (cm)" type="number">
      <button onclick="calculateBMI()" class="btn">Calculate</button>
    `
  };
}
function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight').value);
  const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
  const bmi = (w / (h * h)).toFixed(2);
  document.getElementById('bmiResult').innerText = `BMI: ${bmi}`;
}

function bmrCalc() {
  return {
    name: 'BMR Calculator',
    resultId: 'bmrResult',
    form: `
      <input id="bmrWeight" class="input" placeholder="Weight (kg)" type="number">
      <input id="bmrHeight" class="input" placeholder="Height (cm)" type="number">
      <input id="bmrAge" class="input" placeholder="Age" type="number">
      <select id="bmrGender" class="input">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onclick="calculateBMR()" class="btn">Calculate</button>
    `
  };
}
function calculateBMR() {
  const w = parseFloat(document.getElementById('bmrWeight').value);
  const h = parseFloat(document.getElementById('bmrHeight').value);
  const a = parseInt(document.getElementById('bmrAge').value);
  const g = document.getElementById('bmrGender').value;
  let bmr = g === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
  document.getElementById('bmrResult').innerText = `BMR: ${bmr.toFixed(2)}`;
}

function idealWeightCalc() {
  return {
    name: 'Ideal Weight Calculator',
    resultId: 'idealWeightResult',
    form: `
      <input id="idealHeight" class="input" placeholder="Height (cm)" type="number">
      <select id="idealGender" class="input">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onclick="calculateIdealWeight()" class="btn">Calculate</button>
    `
  };
}
function calculateIdealWeight() {
  const h = parseFloat(document.getElementById('idealHeight').value);
  const g = document.getElementById('idealGender').value;
  const ideal = g === 'male' ? 50 + 0.91 * (h - 152.4) : 45.5 + 0.91 * (h - 152.4);
  document.getElementById('idealWeightResult').innerText = `Ideal Weight: ${ideal.toFixed(2)} kg`;
}

function waterIntakeCalc() {
  return {
    name: 'Water Intake Calculator',
    resultId: 'waterIntakeResult',
    form: `
      <input id="waterWeight" class="input" placeholder="Weight (kg)" type="number">
      <button onclick="calculateWaterIntake()" class="btn">Calculate</button>
    `
  };
}
function calculateWaterIntake() {
  const w = parseFloat(document.getElementById('waterWeight').value);
  const liters = (w * 0.033).toFixed(2);
  document.getElementById('waterIntakeResult').innerText = `Recommended Water Intake: ${liters} L/day`;
}

// --- Finance Calculators ---
function emiCalc() {
  return {
    name: 'EMI Calculator',
    resultId: 'emiResult',
    form: `
      <input id="emiPrincipal" class="input" placeholder="Principal" type="number">
      <input id="emiRate" class="input" placeholder="Annual Interest Rate (%)" type="number">
      <input id="emiTime" class="input" placeholder="Loan Term (years)" type="number">
      <button onclick="calculateEMI()" class="btn">Calculate</button>
    `
  };
}
function calculateEMI() {
  const p = parseFloat(document.getElementById('emiPrincipal').value);
  const r = parseFloat(document.getElementById('emiRate').value) / 12 / 100;
  const n = parseFloat(document.getElementById('emiTime').value) * 12;
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  document.getElementById('emiResult').innerText = `Monthly EMI: ₹${emi.toFixed(2)}`;
}

function sipCalc() {
  return {
    name: 'SIP Calculator',
    resultId: 'sipResult',
    form: `
      <input id="sipAmount" class="input" placeholder="Monthly Investment" type="number">
      <input id="sipRate" class="input" placeholder="Expected Annual Return (%)" type="number">
      <input id="sipTime" class="input" placeholder="Investment Duration (years)" type="number">
      <button onclick="calculateSIP()" class="btn">Calculate</button>
    `
  };
}
function calculateSIP() {
  const a = parseFloat(document.getElementById('sipAmount').value);
  const r = parseFloat(document.getElementById('sipRate').value) / 100 / 12;
  const n = parseFloat(document.getElementById('sipTime').value) * 12;
  const future = a * ((Math.pow(1 + r, n) - 1) * (1 + r)) / r;
  document.getElementById('sipResult').innerText = `Future Value: ₹${future.toFixed(2)}`;
}

function loanCalc() {
  return {
    name: 'Loan Calculator',
    resultId: 'loanResult',
    form: `
      <input id="loanAmount" class="input" placeholder="Loan Amount" type="number">
      <input id="loanRate" class="input" placeholder="Interest Rate (%)" type="number">
      <input id="loanTerm" class="input" placeholder="Loan Term (years)" type="number">
      <button onclick="calculateLoan()" class="btn">Calculate</button>
    `
  };
}
function calculateLoan() {
  const p = parseFloat(document.getElementById('loanAmount').value);
  const r = parseFloat(document.getElementById('loanRate').value) / 100 * parseFloat(document.getElementById('loanTerm').value);
  const total = p + (p * r);
  document.getElementById('loanResult').innerText = `Total Payable: ₹${total.toFixed(2)}`;
}

function taxCalc() {
  return {
    name: 'Tax Calculator',
    resultId: 'taxResult',
    form: `
      <input id="taxIncome" class="input" placeholder="Annual Income" type="number">
      <input id="taxRate" class="input" placeholder="Tax Rate (%)" type="number">
      <button onclick="calculateTax()" class="btn">Calculate</button>
    `
  };
}
function calculateTax() {
  const income = parseFloat(document.getElementById('taxIncome').value);
  const rate = parseFloat(document.getElementById('taxRate').value);
  const tax = (income * rate / 100).toFixed(2);
  document.getElementById('taxResult').innerText = `Tax Payable: ₹${tax}`;
}

// --- Math Calculators ---
function ageCalc() {
  return {
    name: 'Age Calculator',
    resultId: 'ageResult',
    form: `
      <input id="birthYear" class="input" placeholder="Birth Year" type="number">
      <button onclick="calculateAge()" class="btn">Calculate</button>
    `
  };
}
function calculateAge() {
  const year = parseInt(document.getElementById('birthYear').value);
  const age = new Date().getFullYear() - year;
  document.getElementById('ageResult').innerText = `Age: ${age} years`;
}

function percentageCalc() {
  return {
    name: 'Percentage Calculator',
    resultId: 'percentageResult',
    form: `
      <input id="part" class="input" placeholder="Part" type="number">
      <input id="total" class="input" placeholder="Total" type="number">
      <button onclick="calculatePercentage()" class="btn">Calculate</button>
    `
  };
}
function calculatePercentage() {
  const part = parseFloat(document.getElementById('part').value);
  const total = parseFloat(document.getElementById('total').value);
  const percent = (part / total * 100).toFixed(2);
  document.getElementById('percentageResult').innerText = `Percentage: ${percent}%`;
}

function areaCalc() {
  return {
    name: 'Area of Circle',
    resultId: 'areaResult',
    form: `
      <input id="radius" class="input" placeholder="Radius" type="number">
      <button onclick="calculateArea()" class="btn">Calculate</button>
    `
  };
}
function calculateArea() {
  const r = parseFloat(document.getElementById('radius').value);
  const area = (Math.PI * r * r).toFixed(2);
  document.getElementById('areaResult').innerText = `Area: ${area}`;
}

function unitConverterCalc() {
  return {
    name: 'Unit Converter (km to mi)',
    resultId: 'unitResult',
    form: `
      <input id="km" class="input" placeholder="Kilometers" type="number">
      <button onclick="calculateUnit()" class="btn">Convert</button>
    `
  };
}
function calculateUnit() {
  const km = parseFloat(document.getElementById('km').value);
  const miles = (km * 0.621371).toFixed(2);
  document.getElementById('unitResult').innerText = `Miles: ${miles}`;
}

function gpaCalc() {
  return {
    name: 'GPA Calculator',
    resultId: 'gpaResult',
    form: `
      <input id="gpa1" class="input" placeholder="Subject 1 GPA" type="number">
      <input id="gpa2" class="input" placeholder="Subject 2 GPA" type="number">
      <input id="gpa3" class="input" placeholder="Subject 3 GPA" type="number">
      <button onclick="calculateGPA()" class="btn">Calculate</button>
    `
  };
}
function calculateGPA() {
  const g1 = parseFloat(document.getElementById('gpa1').value);
  const g2 = parseFloat(document.getElementById('gpa2').value);
  const g3 = parseFloat(document.getElementById('gpa3').value);
  const avg = ((g1 + g2 + g3) / 3).toFixed(2);
  document.getElementById('gpaResult').innerText = `Average GPA: ${avg}`;
}

// --- Chat Calculators ---
function wordCountCalc() {
  return {
    name: 'Word Count Calculator',
    resultId: 'wordCountResult',
    form: `
      <textarea id="wordCountInput" class="input" placeholder="Enter text here..."></textarea>
      <button onclick="calculateWordCount()" class="btn">Calculate</button>
    `
  };
}
function calculateWordCount() {
  const text = document.getElementById('wordCountInput').value.trim();
  const count = text === '' ? 0 : text.split(/\s+/).length;
  document.getElementById('wordCountResult').innerText = `Words: ${count}`;
}

function readingTimeCalc() {
  return {
    name: 'Reading Time Calculator',
    resultId: 'readingTimeResult',
    form: `
      <textarea id="readingInput" class="input" placeholder="Enter text here..."></textarea>
      <button onclick="calculateReadingTime()" class="btn">Calculate</button>
    `
  };
}
function calculateReadingTime() {
  const text = document.getElementById('readingInput').value.trim();
  const words = text === '' ? 0 : text.split(/\s+/).length;
  const minutes = (words / 200).toFixed(2);
  document.getElementById('readingTimeResult').innerText = `Estimated reading time: ${minutes} minutes`;
}

function charCountCalc() {
  return {
    name: 'Character Count Calculator',
    resultId: 'charCountResult',
    form: `
      <textarea id="charCountInput" placeholder="Enter text here..." class="input"></textarea>
      <button onclick="calculateCharCount()" class="btn">Calculate</button>
    `
  };
}
function calculateCharCount() {
  const text = document.getElementById('charCountInput').value;
  document.getElementById('charCountResult').innerText = `Characters: ${text.length}`;
}

function lineCountCalc() {
  return {
    name: 'Line Count Calculator',
    resultId: 'lineCountResult',
    form: `
      <textarea id="lineCountInput" placeholder="Enter text here..." class="input"></textarea>
      <button onclick="calculateLineCount()" class="btn">Calculate</button>
    `
  };
}
function calculateLineCount() {
  const text = document.getElementById('lineCountInput').value;
  const lines = text.split(/\r?\n/).length;
  document.getElementById('lineCountResult').innerText = `Lines: ${lines}`;
}

function sentenceCountCalc() {
  return {
    name: 'Sentence Count Calculator',
    resultId: 'sentenceCountResult',
    form: `
      <textarea id="sentenceCountInput" placeholder="Enter text here..." class="input"></textarea>
      <button onclick="calculateSentenceCount()" class="btn">Calculate</button>
    `
  };
}
function calculateSentenceCount() {
  const text = document.getElementById('sentenceCountInput').value;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  document.getElementById('sentenceCountResult').innerText = `Sentences: ${sentences}`;
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
