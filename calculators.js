const calculators = [
  // --- Finance Calculators ---
  {
    id: 'simple_interest',
    name: 'Simple Interest Calculator',
    icon: '💰',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>Simple Interest Calculator</h2>
        <label for="principal">Principal (₹):</label>
        <input type="number" id="principal" min="0" placeholder="e.g. 10000" />
        <label for="rate">Interest Rate (% per year):</label>
        <input type="number" id="rate" min="0" step="0.01" placeholder="e.g. 5" />
        <label for="time">Time (years):</label>
        <input type="number" id="time" min="0" step="0.01" placeholder="e.g. 3" />
        <button id="calcBtn">Calculate Interest</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const P = parseFloat(container.querySelector('#principal').value);
        const R = parseFloat(container.querySelector('#rate').value);
        const T = parseFloat(container.querySelector('#time').value);
        if (P <= 0 || R <= 0 || T <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const interest = (P * R * T) / 100;
        resultDiv.textContent = `Simple Interest = ₹${interest.toFixed(2)}`;
      };
    }
  },
  {
    id: 'compound_interest',
    name: 'Compound Interest Calculator',
    icon: '📈',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>Compound Interest Calculator</h2>
        <label for="principal">Principal (₹):</label>
        <input type="number" id="principal" min="0" placeholder="e.g. 10000" />
        <label for="rate">Interest Rate (% per year):</label>
        <input type="number" id="rate" min="0" step="0.01" placeholder="e.g. 5" />
        <label for="time">Time (years):</label>
        <input type="number" id="time" min="0" step="0.01" placeholder="e.g. 3" />
        <label for="n">Compounds per year:</label>
        <input type="number" id="n" min="1" step="1" placeholder="e.g. 4" />
        <button id="calcBtn">Calculate Amount</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const P = parseFloat(container.querySelector('#principal').value);
        const R = parseFloat(container.querySelector('#rate').value) / 100;
        const T = parseFloat(container.querySelector('#time').value);
        const n = parseInt(container.querySelector('#n').value);
        if (P <= 0 || R <= 0 || T <= 0 || n <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const A = P * Math.pow(1 + R / n, n * T);
        resultDiv.textContent = `Amount after ${T} years = ₹${A.toFixed(2)}`;
      };
    }
  },
  {
    id: 'loan_emi',
    name: 'Loan EMI Calculator',
    icon: '🏦',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>Loan EMI Calculator</h2>
        <label for="loanAmount">Loan Amount (₹):</label>
        <input type="number" id="loanAmount" min="0" placeholder="e.g. 500000" />
        <label for="interestRate">Annual Interest Rate (%):</label>
        <input type="number" id="interestRate" min="0" step="0.01" placeholder="e.g. 7.5" />
        <label for="loanTenure">Loan Tenure (years):</label>
        <input type="number" id="loanTenure" min="0" placeholder="e.g. 5" />
        <button id="calcBtn">Calculate EMI</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const P = parseFloat(container.querySelector('#loanAmount').value);
        const R = parseFloat(container.querySelector('#interestRate').value) / 1200;
        const N = parseFloat(container.querySelector('#loanTenure').value) * 12;
        if (P <= 0 || R <= 0 || N <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        resultDiv.textContent = `Monthly EMI = ₹${EMI.toFixed(2)}`;
      };
    }
  },
  {
    id: 'tip_calculator',
    name: 'Tip Calculator',
    icon: '💳',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>Tip Calculator</h2>
        <label for="billAmount">Bill Amount (₹):</label>
        <input type="number" id="billAmount" min="0" placeholder="e.g. 1000" />
        <label for="tipPercent">Tip Percentage (%):</label>
        <input type="number" id="tipPercent" min="0" placeholder="e.g. 10" />
        <button id="calcBtn">Calculate Tip</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const amount = parseFloat(container.querySelector('#billAmount').value);
        const percent = parseFloat(container.querySelector('#tipPercent').value);
        if (amount <= 0 || percent < 0) {
          resultDiv.textContent = 'Please enter valid values.';
          return;
        }
        const tip = amount * (percent / 100);
        const total = amount + tip;
        resultDiv.textContent = `Tip: ₹${tip.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
      };
    }
  },
  {
    id: 'gst_calculator',
    name: 'GST Calculator',
    icon: '🧾',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>GST Calculator</h2>
        <label for="amount">Amount (₹):</label>
        <input type="number" id="amount" min="0" placeholder="e.g. 1000" />
        <label for="gstRate">GST Rate (%):</label>
        <input type="number" id="gstRate" min="0" step="0.1" placeholder="e.g. 18" />
        <button id="calcBtn">Calculate GST</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const amount = parseFloat(container.querySelector('#amount').value);
        const gstRate = parseFloat(container.querySelector('#gstRate').value);
        if (amount <= 0 || gstRate < 0) {
          resultDiv.textContent = 'Please enter valid values.';
          return;
        }
        const gst = amount * gstRate / 100;
        const total = amount + gst;
        resultDiv.textContent = `GST: ₹${gst.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
      };
    }
  },

  // --- Health Calculators ---
  {
    id: 'bmi_calculator',
    name: 'BMI Calculator',
    icon: '⚖️',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>BMI Calculator</h2>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" min="0" placeholder="e.g. 70" />
        <label for="height">Height (cm):</label>
        <input type="number" id="height" min="0" placeholder="e.g. 175" />
        <button id="calcBtn">Calculate BMI</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const weight = parseFloat(container.querySelector('#weight').value);
        const height = parseFloat(container.querySelector('#height').value) / 100;
        if (weight <= 0 || height <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const bmi = weight / (height * height);
        resultDiv.textContent = `BMI = ${bmi.toFixed(2)}`;
      };
    }
  },
  {
    id: 'bmr_calculator',
    name: 'BMR Calculator',
    icon: '🔥',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>BMR Calculator</h2>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" min="0" placeholder="e.g. 70" />
        <label for="height">Height (cm):</label>
        <input type="number" id="height" min="0" placeholder="e.g. 175" />
        <label for="age">Age (years):</label>
        <input type="number" id="age" min="0" placeholder="e.g. 25" />
        <label for="gender">Gender:</label>
        <select id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="calcBtn">Calculate BMR</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const weight = parseFloat(container.querySelector('#weight').value);
        const height = parseFloat(container.querySelector('#height').value);
        const age = parseFloat(container.querySelector('#age').value);
        const gender = container.querySelector('#gender').value;
        if (weight <= 0 || height <= 0 || age <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        let bmr;
        if (gender === 'male') {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        resultDiv.textContent = `BMR = ${bmr.toFixed(2)} calories/day`;
      };
    }
  },
  {
    id: 'calorie_calculator',
    name: 'Calorie Calculator',
    icon: '🍎',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>Calorie Calculator</h2>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" min="0" placeholder="e.g. 70" />
        <label for="activity">Activity Level:</label>
        <select id="activity">
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="light">Lightly active (light exercise 1-3 days/week)</option>
          <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
          <option value="active">Active (hard exercise 6-7 days/week)</option>
          <option value="very_active">Very active (very hard exercise & physical job)</option>
        </select>
        <button id="calcBtn">Calculate Calories</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const weight = parseFloat(container.querySelector('#weight').value);
        const activity = container.querySelector('#activity').value;
        if (weight <= 0) {
          resultDiv.textContent = 'Please enter a valid weight.';
          return;
        }
        // Rough estimates of calories burned per kg by activity level (kcal/kg)
        const caloriesMap = {
          sedentary: 24,
          light: 28,
          moderate: 35,
          active: 40,
          very_active: 45
        };
        const calories = weight * caloriesMap[activity];
        resultDiv.textContent = `Estimated daily calories burned: ${calories.toFixed(0)} kcal`;
      };
    }
  },
  {
    id: 'water_intake',
    name: 'Water Intake Calculator',
    icon: '💧',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>Water Intake Calculator</h2>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" min="0" placeholder="e.g. 70" />
        <button id="calcBtn">Calculate Water Intake</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const weight = parseFloat(container.querySelector('#weight').value);
        if (weight <= 0) {
          resultDiv.textContent = 'Please enter a valid weight.';
          return;
        }
        // Water intake recommendation: 35 ml per kg of body weight
        const waterMl = weight * 35;
        const waterLiters = waterMl / 1000;
        resultDiv.textContent = `Recommended daily water intake: ${waterLiters.toFixed(2)} liters`;
      };
    }
  },

  // --- Math Calculators ---
  {
    id: 'percentage_calculator',
    name: 'Percentage Calculator',
    icon: '%',
    category: 'Math',
    render: container => {
      container.innerHTML = `
        <h2>Percentage Calculator</h2>
        <label for="part">Part:</label>
        <input type="number" id="part" min="0" placeholder="e.g. 25" />
        <label for="total">Total:</label>
        <input type="number" id="total" min="0" placeholder="e.g. 200" />
        <button id="calcBtn">Calculate Percentage</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const part = parseFloat(container.querySelector('#part').value);
        const total = parseFloat(container.querySelector('#total').value);
        if (part < 0 || total <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const percent = (part / total) * 100;
        resultDiv.textContent = `Percentage = ${percent.toFixed(2)}%`;
      };
    }
  },
  {
    id: 'age_calculator',
    name: 'Age Calculator',
    icon: '🎂',
    category: 'Math',
    render: container => {
      container.innerHTML = `
        <h2>Age Calculator</h2>
        <label for="birthdate">Birthdate:</label>
        <input type="date" id="birthdate" />
        <button id="calcBtn">Calculate Age</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.onclick = () => {
        const birthdateStr = container.querySelector('#birthdate').value;
        if (!birthdateStr) {
          resultDiv.textContent = 'Please select your birthdate.';
          return;
        }
        const birthdate = new Date(birthdateStr);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
          age--;
        }
        resultDiv.textContent = `Age: ${age} years`;
      };
    }
  },
  {
    id: 'area_calculator',
    name: 'Area Calculator',
    icon: '📐',
    category: 'Math',
    render: container => {
      container.innerHTML = `
        <h2>Area Calculator</h2>
        <label for="shape">Shape:</label>
        <select id="shape">
          <option value="rectangle">Rectangle</option>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
// Continuing the calculators array (items 26 to 40)

calculators.push(
  {
    id: 'bmr_calculator',
    name: 'BMR Calculator',
    icon: '🔥',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>BMR (Basal Metabolic Rate) Calculator</h2>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" min="0" placeholder="e.g. 70" />
        <label for="height">Height (cm):</label>
        <input type="number" id="height" min="0" placeholder="e.g. 175" />
        <label for="age">Age (years):</label>
        <input type="number" id="age" min="0" placeholder="e.g. 30" />
        <label for="gender">Gender:</label>
        <select id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="calcBtn">Calculate BMR</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const weight = parseFloat(container.querySelector('#weight').value);
        const height = parseFloat(container.querySelector('#height').value);
        const age = parseInt(container.querySelector('#age').value);
        const gender = container.querySelector('#gender').value;
        if (weight <= 0 || height <= 0 || age <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        let bmr;
        if (gender === 'male') {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        resultDiv.textContent = `BMR = ${bmr.toFixed(2)} kcal/day`;
      });
    }
  },

  {
    id: 'calorie_burn_calculator',
    name: 'Calorie Burn Calculator',
    icon: '🔥',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>Calorie Burn Calculator</h2>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" min="0" placeholder="e.g. 70" />
        <label for="mets">METs (Activity Level):</label>
        <input type="number" id="mets" min="0" step="0.1" placeholder="e.g. 8" />
        <label for="duration">Duration (minutes):</label>
        <input type="number" id="duration" min="0" placeholder="e.g. 60" />
        <button id="calcBtn">Calculate Calories Burned</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const weight = parseFloat(container.querySelector('#weight').value);
        const mets = parseFloat(container.querySelector('#mets').value);
        const duration = parseFloat(container.querySelector('#duration').value);
        if (weight <= 0 || mets <= 0 || duration <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        // Calories burned formula: calories = METs × weight(kg) × duration(hours)
        const calories = mets * weight * (duration / 60);
        resultDiv.textContent = `Calories burned = ${calories.toFixed(2)} kcal`;
      });
    }
  },

  {
    id: 'loan_emi_calculator',
    name: 'Loan EMI Calculator',
    icon: '🏦',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>Loan EMI Calculator</h2>
        <label for="principal">Loan Amount (₹):</label>
        <input type="number" id="principal" min="0" placeholder="e.g. 500000" />
        <label for="rate">Interest Rate (% per annum):</label>
        <input type="number" id="rate" min="0" step="0.01" placeholder="e.g. 8.5" />
        <label for="tenure">Tenure (years):</label>
        <input type="number" id="tenure" min="0" step="0.01" placeholder="e.g. 5" />
        <button id="calcBtn">Calculate EMI</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const P = parseFloat(container.querySelector('#principal').value);
        const R = parseFloat(container.querySelector('#rate').value) / 100 / 12;
        const N = parseFloat(container.querySelector('#tenure').value) * 12;
        if (P <= 0 || R <= 0 || N <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        resultDiv.textContent = `EMI = ₹${EMI.toFixed(2)}`;
      });
    }
  },

  {
    id: 'retirement_calculator',
    name: 'Retirement Calculator',
    icon: '⏳',
    category: 'Finance',
    render: container => {
      container.innerHTML = `
        <h2>Retirement Calculator</h2>
        <label for="current_age">Current Age:</label>
        <input type="number" id="current_age" min="0" placeholder="e.g. 30" />
        <label for="retirement_age">Retirement Age:</label>
        <input type="number" id="retirement_age" min="0" placeholder="e.g. 60" />
        <label for="current_savings">Current Savings (₹):</label>
        <input type="number" id="current_savings" min="0" placeholder="e.g. 200000" />
        <label for="monthly_savings">Monthly Savings (₹):</label>
        <input type="number" id="monthly_savings" min="0" placeholder="e.g. 10000" />
        <label for="annual_return">Annual Return Rate (%):</label>
        <input type="number" id="annual_return" min="0" step="0.01" placeholder="e.g. 8" />
        <button id="calcBtn">Calculate Retirement Savings</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const currentAge = parseInt(container.querySelector('#current_age').value);
        const retirementAge = parseInt(container.querySelector('#retirement_age').value);
        const currentSavings = parseFloat(container.querySelector('#current_savings').value);
        const monthlySavings = parseFloat(container.querySelector('#monthly_savings').value);
        const annualReturn = parseFloat(container.querySelector('#annual_return').value) / 100;
        if (currentAge < 0 || retirementAge <= currentAge || currentSavings < 0 || monthlySavings < 0 || annualReturn < 0) {
          resultDiv.textContent = 'Please enter valid numbers and ensure retirement age is greater than current age.';
          return;
        }
        const years = retirementAge - currentAge;
        let total = currentSavings;
        for (let i = 0; i < years * 12; i++) {
          total = total * (1 + annualReturn / 12) + monthlySavings;
        }
        resultDiv.textContent = `Estimated savings at retirement: ₹${total.toFixed(2)}`;
      });
    }
  },

  {
    id: 'body_fat_percentage',
    name: 'Body Fat Percentage Calculator',
    icon: '💪',
    category: 'Health',
    render: container => {
      container.innerHTML = `
        <h2>Body Fat Percentage Calculator</h2>
        <label for="waist">Waist circumference (cm):</label>
        <input type="number" id="waist" min="0" placeholder="e.g. 85" />
        <label for="hip">Hip circumference (cm):</label>
        <input type="number" id="hip" min="0" placeholder="e.g. 95" />
        <label for="neck">Neck circumference (cm):</label>
        <input type="number" id="neck" min="0" placeholder="e.g. 40" />
        <label for="height">Height (cm):</label>
        <input type="number" id="height" min="0" placeholder="e.g. 175" />
        <label for="gender">Gender:</label>
        <select id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="calcBtn">Calculate Body Fat %</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const waist = parseFloat(container.querySelector('#waist').value);
        const hip = parseFloat(container.querySelector('#hip').value);
        const neck = parseFloat(container.querySelector('#neck').value);
        const height = parseFloat(container.querySelector('#height').value);
        const gender = container.querySelector('#gender').value;
        if (waist <= 0 || neck <= 0 || height <= 0 || (gender === 'female' && hip <= 0)) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        let bodyFat;
        if (gender === 'male') {
          bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
          bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }
        resultDiv.textContent = `Body Fat Percentage = ${bodyFat.toFixed(2)}%`;
      });
    }
  },

  {
    id: 'triangle_area',
    name: 'Triangle Area Calculator',
    icon: '🔺',
    category: 'Geometry',
    render: container => {
      container.innerHTML = `
        <h2>Triangle Area Calculator</h2>
        <label for="base">Base (cm):</label>
        <input type="number" id="base" min="0" placeholder="e.g. 10" />
        <label for="height">Height (cm):</label>
        <input type="number" id="height" min="0" placeholder="e.g. 12" />
        <button id="calcBtn">Calculate Area</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const base = parseFloat(container.querySelector('#base').value);
        const height = parseFloat(container.querySelector('#height').value);
        if (base <= 0 || height <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const area = 0.5 * base * height;
        resultDiv.textContent = `Area of triangle = ${area.toFixed(2)} cm²`;
      });
    }
  },

  {
    id: 'circle_area',
    name: 'Circle Area Calculator',
    icon: '⚪',
    category: 'Geometry',
    render: container => {
      container.innerHTML = `
        <h2>Circle Area Calculator</h2>
        <label for="radius">Radius (cm):</label>
        <input type="number" id="radius" min="0" placeholder="e.g. 7" />
        <button id="calcBtn">Calculate Area</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const radius = parseFloat(container.querySelector('#radius').value);
        if (radius <= 0) {
          resultDiv.textContent = 'Please enter valid positive number.';
          return;
        }
        const area = Math.PI * radius * radius;
        resultDiv.textContent = `Area of circle = ${area.toFixed(2)} cm²`;
      });
    }
  },

  {
    id: 'rectangle_area',
    name: 'Rectangle Area Calculator',
    icon: '⬛',
    category: 'Geometry',
    render: container => {
      container.innerHTML = `
        <h2>Rectangle Area Calculator</h2>
        <label for="length">Length (cm):</label>
        <input type="number" id="length" min="0" placeholder="e.g. 15" />
        <label for="width">Width (cm):</label>
        <input type="number" id="width" min="0" placeholder="e.g. 8" />
        <button id="calcBtn">Calculate Area</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const length = parseFloat(container.querySelector('#length').value);
        const width = parseFloat(container.querySelector('#width').value);
        if (length <= 0 || width <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const area = length * width;
        resultDiv.textContent = `Area of rectangle = ${area.toFixed(2)} cm²`;
      });
    }
  },

  {
    id: 'square_area',
    name: 'Square Area Calculator',
    icon: '⬜',
    category: 'Geometry',
    render: container => {
      container.innerHTML = `
        <h2>Square Area Calculator</h2>
        <label for="side">Side length (cm):</label>
        <input type="number" id="side" min="0" placeholder="e.g. 10" />
        <button id="calcBtn">Calculate Area</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const side = parseFloat(container.querySelector('#side').value);
        if (side <= 0) {
          resultDiv.textContent = 'Please enter valid positive number.';
          return;
        }
        const area = side * side;
        resultDiv.textContent = `Area of square = ${area.toFixed(2)} cm²`;
      });
    }
  },

  {
    id: 'quadratic_solver',
    name: 'Quadratic Equation Solver',
    icon: '🧮',
    category: 'Algebra',
    render: container => {
      container.innerHTML = `
        <h2>Quadratic Equation Solver</h2>
        <p>Solve ax² + bx + c = 0</p>
        <label for="a">a:</label>
        <input type="number" id="a" placeholder="e.g. 1" />
        <label for="b">b:</label>
        <input type="number" id="b" placeholder="e.g. -3" />
        <label for="c">c:</label>
        <input type="number" id="c" placeholder="e.g. 2" />
        <button id="calcBtn">Solve</button>
        <div class="result" id="result" aria-live="polite"></div>
      `;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const a = parseFloat(container.querySelector('#a').value);
        const b = parseFloat(container.querySelector('#b').value);
        const c = parseFloat(container.querySelector('#c').value);
        if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
          resultDiv.textContent = 'Please enter valid numbers and a ≠ 0.';
          return;
        }
        const discriminant = b*b - 4*a*c;
        if (discriminant > 0) {
          const root1 = (-b + Math.sqrt(discriminant)) / (2*a);
          const root2 = (-b - Math.sqrt(discriminant)) / (2*a);
          resultDiv.textContent = `Roots are real and distinct: ${root1.toFixed(3)}, ${root2.toFixed(3)}`;
        } else if (discriminant === 0) {
          const root = -b/(2*a);
          resultDiv.textContent = `Roots are real and equal: ${root.toFixed(3)}`;
        } else {
          const realPart = (-b/(2*a)).toFixed(3);
          const imagPart = (Math.sqrt(-discriminant)/(2*a)).toFixed(3);
          resultDiv.textContent = `Roots are complex: ${realPart} + ${imagPart}i , ${realPart} - ${imagPart}i`;
        }
      });
    }
  },

  {
    id: 'percentage_calculator',
    name: 'Percentage Calculator',
    icon: '%',
    category: 'Basic Math',
    render: container => {
      container.innerHTML = `
        <h2>Percentage Calculator</h2>
        <label for="part">Part:</label>
        <input type="number" id="part" min="0" placeholder="e.g. 50" />
        <label for="whole">Whole:</label>
        <input type="number" id="whole" min="0" placeholder="e.g. 200" />
        <button id="calcBtn">Calculate Percentage</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const part = parseFloat(container.querySelector('#part').value);
        const whole = parseFloat(container.querySelector('#whole').value);
        if (part < 0 || whole <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const percentage = (part / whole) * 100;
        resultDiv.textContent = `Percentage = ${percentage.toFixed(2)}%`;
      });
    }
  },

  {
    id: 'speed_calculator',
    name: 'Speed Calculator',
    icon: '🚗',
    category: 'Basic Math',
    render: container => {
      container.innerHTML = `
        <h2>Speed Calculator</h2>
        <label for="distance">Distance (km):</label>
        <input type="number" id="distance" min="0" placeholder="e.g. 100" />
        <label for="time">Time (hours):</label>
        <input type="number" id="time" min="0" placeholder="e.g. 2" />
        <button id="calcBtn">Calculate Speed</button>
        <div class="result" id="result" aria-live="polite"></div>`;
      const btn = container.querySelector('#calcBtn');
      const resultDiv = container.querySelector('#result');
      btn.addEventListener('click', () => {
        const distance = parseFloat(container.querySelector('#distance').value);
        const time = parseFloat(container.querySelector('#time').value);
        if (distance < 0 || time <= 0) {
          resultDiv.textContent = 'Please enter valid positive numbers.';
          return;
        }
        const speed = distance / time;
        resultDiv.textContent = `Speed = ${speed.toFixed(2)} km/h`;
      });
    }
  }
);
