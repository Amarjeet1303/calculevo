// ======= CALCULATOR DATA ===========
const calculators = [
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'Fitness',
    html: `
      <label>Height (cm): <input type="number" id="height" /></label>
      <label>Weight (kg): <input type="number" id="weight" /></label>
      <button onclick="calculateBMI()">Calculate</button>
      <p id="bmi-result"></p>
    `
  },
  {
    id: 'bmr',
    name: 'BMR Calculator',
    category: 'Fitness',
    html: `
      <label>Weight (kg): <input type="number" id="bmrWeight" /></label>
      <label>Height (cm): <input type="number" id="bmrHeight" /></label>
      <label>Age: <input type="number" id="bmrAge" /></label>
      <select id="bmrGender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onclick="calculateBMR()">Calculate</button>
      <p id="bmr-result"></p>
    `
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Weight Calculator',
    category: 'Fitness',
    html: `
      <label>Height (cm): <input type="number" id="idealHeight" /></label>
      <select id="idealGender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onclick="calculateIdealWeight()">Calculate</button>
      <p id="ideal-weight-result"></p>
    `
  },

  // 🔻 Add 37 more calculator objects here similarly
];

// ======= THEME TOGGLE ===========
document.querySelector('#themeSwitch').addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// ======= TOGGLE MENU FOR MOBILE ===========
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.navbar ul').classList.toggle('show');
});

// ======= RENDER CALCULATORS ===========
function renderCalculators(category = '') {
  const container = document.getElementById('calculatorContainer');
  container.innerHTML = '';

  const filtered = category
    ? calculators.filter(calc => calc.category === category)
    : calculators;

  if (filtered.length === 0) {
    container.innerHTML = '<p class="no-results">No calculators found.</p>';
    return;
  }

  filtered.forEach(calc => {
    const card = document.createElement('div');
    card.className = 'calculator-card';
    card.innerHTML = `<h3>${calc.name}</h3>${calc.html}`;
    container.appendChild(card);
  });
}

// ======= CATEGORY BUTTONS ===========
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    renderCalculators(category);
  });
});

// ======= SEARCH FILTER ===========
document.getElementById('searchBar').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const container = document.getElementById('calculatorContainer');
  const cards = container.querySelectorAll('.calculator-card');

  let visible = 0;
  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  if (visible === 0) {
    container.innerHTML = '<p class="no-results">No calculators found.</p>';
  }
});

// ======= DEFAULT RENDER ===========
renderCalculators(); // render all initially

// ======= CALCULATION FUNCTIONS ==========

// BMI Calculator
function calculateBMI() {
  const h = parseFloat(document.getElementById('height').value) / 100;
  const w = parseFloat(document.getElementById('weight').value);
  if (h && w) {
    const bmi = (w / (h * h)).toFixed(2);
    document.getElementById('bmi-result').innerText = `Your BMI is ${bmi}`;
  } else {
    document.getElementById('bmi-result').innerText = `Please enter valid values`;
  }
}

// BMR Calculator
function calculateBMR() {
  const weight = parseFloat(document.getElementById('bmrWeight').value);
  const height = parseFloat(document.getElementById('bmrHeight').value);
  const age = parseFloat(document.getElementById('bmrAge').value);
  const gender = document.getElementById('bmrGender').value;

  if (weight && height && age) {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    document.getElementById('bmr-result').innerText = `Your BMR is ${bmr.toFixed(2)} kcal/day`;
  } else {
    document.getElementById('bmr-result').innerText = `Please enter all values`;
  }
}

// Ideal Weight Calculator
function calculateIdealWeight() {
  const height = parseFloat(document.getElementById('idealHeight').value);
  const gender = document.getElementById('idealGender').value;

  if (height) {
    let idealWeight;
    if (gender === 'male') {
      idealWeight = 50 + 0.91 * (height - 152.4);
    } else {
      idealWeight = 45.5 + 0.91 * (height - 152.4);
    }
    document.getElementById('ideal-weight-result').innerText = `Your ideal weight is ${idealWeight.toFixed(2)} kg`;
  } else {
    document.getElementById('ideal-weight-result').innerText = `Please enter height`;
  }
}
