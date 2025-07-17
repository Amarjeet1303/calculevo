const calculators = [
  // Your original calculators...
  {
    id: "bmi",
    name: "BMI Calculator",
    category: "health",
    html: `
      <h3>BMI Calculator</h3>
      <label for="bmiHeight">Height (cm):</label>
      <input type="number" id="bmiHeight" min="0" step="any" placeholder="e.g., 170" />
      <label for="bmiWeight">Weight (kg):</label>
      <input type="number" id="bmiWeight" min="0" step="any" placeholder="e.g., 65" />
      <button id="bmiCalcBtn">Calculate</button>
      <p class="result" id="bmiResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const h = parseFloat(document.getElementById("bmiHeight").value) / 100;
      const w = parseFloat(document.getElementById("bmiWeight").value);
      const r = document.getElementById("bmiResult");
      if (!h || !w || h <= 0 || w <= 0) {
        r.textContent = "Please enter valid height and weight.";
        return;
      }
      const bmi = w / (h * h);
      r.textContent = `Your BMI is ${bmi.toFixed(2)}`;
    }
  },
  {
    id: "gst",
    name: "GST Calculator",
    category: "finance",
    html: `
      <h3>GST Calculator</h3>
      <label for="gstAmount">Amount:</label>
      <input type="number" id="gstAmount" min="0" step="any" placeholder="e.g., 1000" />
      <label for="gstRate">GST %:</label>
      <input type="number" id="gstRate" min="0" step="any" placeholder="e.g., 18" />
      <button id="gstCalcBtn">Calculate</button>
      <p class="result" id="gstResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const amount = parseFloat(document.getElementById("gstAmount").value);
      const rate = parseFloat(document.getElementById("gstRate").value);
      const r = document.getElementById("gstResult");
      if (!amount || !rate || amount < 0 || rate < 0) {
        r.textContent = "Please enter valid amount and GST rate.";
        return;
      }
      const gst = (amount * rate) / 100;
      const total = amount + gst;
      r.textContent = `GST: ₹${gst.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
    }
  },
  {
    id: "loan",
    name: "Loan EMI Calculator",
    category: "finance",
    html: `
      <h3>Loan EMI Calculator</h3>
      <label for="loanAmount">Loan Amount:</label>
      <input type="number" id="loanAmount" min="0" step="any" placeholder="e.g., 500000" />
      <label for="loanRate">Annual Interest Rate (%):</label>
      <input type="number" id="loanRate" min="0" step="any" placeholder="e.g., 7.5" />
      <label for="loanTenure">Tenure (years):</label>
      <input type="number" id="loanTenure" min="0" step="any" placeholder="e.g., 15" />
      <button id="loanCalcBtn">Calculate</button>
      <p class="result" id="loanResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const P = parseFloat(document.getElementById("loanAmount").value);
      const r = parseFloat(document.getElementById("loanRate").value) / 100 / 12;
      const n = parseFloat(document.getElementById("loanTenure").value) * 12;
      const res = document.getElementById("loanResult");
      if (!P || !r || !n || P <= 0 || r < 0 || n <= 0) {
        res.textContent = "Please enter valid loan details.";
        return;
      }
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      res.textContent = `EMI per month: ₹${emi.toFixed(2)}`;
    }
  },
  {
    id: "age",
    name: "Age Calculator",
    category: "datetime",
    html: `
      <h3>Age Calculator</h3>
      <label for="dob">Date of Birth:</label>
      <input type="date" id="dob" max="${new Date().toISOString().split('T')[0]}" />
      <button id="ageCalcBtn">Calculate</button>
      <p class="result" id="ageResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const dob = new Date(document.getElementById("dob").value);
      const res = document.getElementById("ageResult");
      if (!dob || dob == "Invalid Date") {
        res.textContent = "Please enter a valid date.";
        return;
      }
      const today = new Date();
      if (dob > today) {
        res.textContent = "Date of birth cannot be in the future.";
        return;
      }
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      res.textContent = `Your age is ${age} year${age !== 1 ? 's' : ''}.`;
    }
  },
  {
    id: "temp",
    name: "Temperature Converter",
    category: "conversion",
    html: `
      <h3>Temperature Converter</h3>
      <label for="tempInput">Temperature:</label>
      <input type="number" id="tempInput" step="any" placeholder="e.g., 32" />
      <select id="tempUnit">
        <option value="c">Celsius (°C)</option>
        <option value="f">Fahrenheit (°F)</option>
        <option value="k">Kelvin (K)</option>
      </select>
      <button id="tempCalcBtn">Convert</button>
      <p class="result" id="tempResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const val = parseFloat(document.getElementById("tempInput").value);
      const unit = document.getElementById("tempUnit").value;
      const res = document.getElementById("tempResult");
      if (isNaN(val)) {
        res.textContent = "Please enter a valid temperature.";
        return;
      }
      let c, f, k;
      switch (unit) {
        case 'c':
          c = val;
          f = (val * 9/5) + 32;
          k = val + 273.15;
          break;
        case 'f':
          c = (val - 32) * 5/9;
          f = val;
          k = c + 273.15;
          break;
        case 'k':
          c = val - 273.15;
          f = (c * 9/5) + 32;
          k = val;
          break;
      }
      res.textContent = `Celsius: ${c.toFixed(2)} °C | Fahrenheit: ${f.toFixed(2)} °F | Kelvin: ${k.toFixed(2)} K`;
    }
  },
  {
    id: "percent",
    name: "Percentage Calculator",
    category: "math",
    html: `
      <h3>Percentage Calculator</h3>
      <label for="percentTotal">Total Value:</label>
      <input type="number" id="percentTotal" min="0" step="any" placeholder="e.g., 500" />
      <label for="percentValue">Value:</label>
      <input type="number" id="percentValue" min="0" step="any" placeholder="e.g., 125" />
      <button id="percentCalcBtn">Calculate</button>
      <p class="result" id="percentResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const total = parseFloat(document.getElementById("percentTotal").value);
      const val = parseFloat(document.getElementById("percentValue").value);
      const res = document.getElementById("percentResult");
      if (!total || !val || total <= 0 || val < 0) {
        res.textContent = "Please enter valid values.";
        return;
      }
      const percent = (val / total) * 100;
      res.textContent = `${val} is ${percent.toFixed(2)}% of ${total}`;
    }
  },
  {
    id: "simple-int",
    name: "Simple Interest Calculator",
    category: "finance",
    html: `
      <h3>Simple Interest Calculator</h3>
      <label for="siPrincipal">Principal Amount:</label>
      <input type="number" id="siPrincipal" min="0" step="any" placeholder="e.g., 10000" />
      <label for="siRate">Interest Rate (% per annum):</label>
      <input type="number" id="siRate" min="0" step="any" placeholder="e.g., 5" />
      <label for="siTime">Time (years):</label>
      <input type="number" id="siTime" min="0" step="any" placeholder="e.g., 3" />
      <button id="siCalcBtn">Calculate</button>
      <p class="result" id="siResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const P = parseFloat(document.getElementById("siPrincipal").value);
      const r = parseFloat(document.getElementById("siRate").value);
      const t = parseFloat(document.getElementById("siTime").value);
      const res = document.getElementById("siResult");
      if (!P || !r || !t || P <= 0 || r < 0 || t <= 0) {
        res.textContent = "Please enter valid input values.";
        return;
      }
      const SI = (P * r * t) / 100;
      res.textContent = `Simple Interest = ₹${SI.toFixed(2)}`;
    }
  },
  {
    id: "time-diff",
    name: "Time Difference Calculator",
    category: "datetime",
    html: `
      <h3>Time Difference Calculator</h3>
      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" />
      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" />
      <button id="timeDiffCalcBtn">Calculate</button>
      <p class="result" id="timeDiffResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const start = document.getElementById("startTime").value;
      const end = document.getElementById("endTime").value;
      const res = document.getElementById("timeDiffResult");
      if (!start || !end) {
        res.textContent = "Please select both start and end times.";
        return;
      }
      const startDate = new Date(`1970-01-01T${start}:00`);
      const endDate = new Date(`1970-01-01T${end}:00`);
      let diff = (endDate - startDate) / 1000 / 60; // in minutes
      if (diff < 0) diff += 24 * 60; // next day
      const h = Math.floor(diff / 60);
      const m = Math.floor(diff % 60);
      res.textContent = `Difference is ${h} hour${h !== 1 ? 's' : ''} and ${m} minute${m !== 1 ? 's' : ''}.`;
    }
  },
  {
    id: "currency",
    name: "Currency Converter (Static Rates)",
    category: "finance",
    html: `
      <h3>Currency Converter</h3>
      <label for="amountCur">Amount:</label>
      <input type="number" id="amountCur" min="0" step="any" placeholder="e.g., 100" />
      <label for="fromCur">From:</label>
      <select id="fromCur">
        <option value="USD">USD</option>
        <option value="INR" selected>INR</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <label for="toCur">To:</label>
      <select id="toCur">
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <button id="curConvCalcBtn">Convert</button>
      <p class="result" id="curConvResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const amount = parseFloat(document.getElementById("amountCur").value);
      const from = document.getElementById("fromCur").value;
      const to = document.getElementById("toCur").value;
      const res = document.getElementById("curConvResult");
      if (!amount || amount < 0) {
        res.textContent = "Please enter a valid amount.";
        return;
      }
      if (from === to) {
        res.textContent = `Same currency selected: ${amount.toFixed(2)} ${to}`;
        return;
      }
      // Static exchange rates relative to USD (for demo)
      const rates = {
        USD: 1,
        INR: 82,
        EUR: 0.91,
        GBP: 0.79,
        JPY: 139,
      };
      const amountInUSD = amount / rates[from];
      const converted = amountInUSD * rates[to];
      res.textContent = `${amount.toFixed(2)} ${from} = ${converted.toFixed(2)} ${to}`;
    }
  },
  {
    id: "compound-int",
    name: "Compound Interest Calculator",
    category: "finance",
    html: `
      <h3>Compound Interest Calculator</h3>
      <label for="ciPrincipal">Principal Amount:</label>
      <input type="number" id="ciPrincipal" min="0" step="any" placeholder="e.g., 10000" />
      <label for="ciRate">Interest Rate (% per annum):</label>
      <input type="number" id="ciRate" min="0" step="any" placeholder="e.g., 5" />
      <label for="ciTime">Time (years):</label>
      <input type="number" id="ciTime" min="0" step="any" placeholder="e.g., 3" />
      <label for="ciFreq">Compounding Frequency:</label>
      <select id="ciFreq">
        <option value="1">Annually</option>
        <option value="4">Quarterly</option>
        <option value="12">Monthly</option>
        <option value="365">Daily</option>
      </select>
      <button id="ciCalcBtn">Calculate</button>
      <p class="result" id="ciResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const P = parseFloat(document.getElementById("ciPrincipal").value);
      const r = parseFloat(document.getElementById("ciRate").value) / 100;
      const t = parseFloat(document.getElementById("ciTime").value);
      const n = parseInt(document.getElementById("ciFreq").value);
      const res = document.getElementById("ciResult");
      if (!P || !r || !t || !n || P <= 0 || r < 0 || t <= 0) {
        res.textContent = "Please enter valid input values.";
        return;
      }
      const amount = P * Math.pow(1 + r / n, n * t);
      const ci = amount - P;
      res.textContent = `Compound Interest = ₹${ci.toFixed(2)} | Amount = ₹${amount.toFixed(2)}`;
    }
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    category: "health",
    html: `
      <h3>Calorie Calculator</h3>
      <label for="calWeight">Weight (kg):</label>
      <input type="number" id="calWeight" min="0" step="any" placeholder="e.g., 70" />
      <label for="calHeight">Height (cm):</label>
      <input type="number" id="calHeight" min="0" step="any" placeholder="e.g., 170" />
      <label for="calAge">Age (years):</label>
      <input type="number" id="calAge" min="0" step="any" placeholder="e.g., 25" />
      <label for="calGender">Gender:</label>
      <select id="calGender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button id="calCalcBtn">Calculate</button>
      <p class="result" id="calResult" aria-live="polite"></p>
    `,
    calcFunc: function () {
      const w = parseFloat(document.getElementById("calWeight").value);
      const h = parseFloat(document.getElementById("calHeight").value);
      const age = parseInt(document.getElementById("calAge").value);
      const gender = document.getElementById("calGender").value;
      const res = document.getElementById("calResult");
      if (!w || !h || !age || w
