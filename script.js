document.addEventListener("DOMContentLoaded", () => {
  const calculators = [
    bmiCalc(), ageCalc(), emiCalc(), sipCalc(),
    bmrCalc(), percentCalc(), loanCalc(),
    unitConvCalc(), wordCountCalc(), taxCalc()
  ];

  const list = document.getElementById("calculator-list");
  const search = document.getElementById("search");

  function render(calcs) {
    list.innerHTML = '';
    calcs.forEach(calc => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h2>${calc.name}</h2>${calc.form}<div class="result" id="${calc.resultId}"></div>`;
      list.appendChild(card);
    });
  }

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    const filtered = calculators.filter(c => c.name.toLowerCase().includes(term));
    render(filtered);
  });

  render(calculators);
});

// ---------- CALCULATOR FUNCTIONS ----------

function bmiCalc() {
  return {
    name: "BMI Calculator",
    resultId: "bmiResult",
    form: `
      <input id="bmi-weight" type="number" placeholder="Weight (kg)">
      <input id="bmi-height" type="number" placeholder="Height (cm)">
      <button onclick="let w=parseFloat(bmiWeight.value), h=parseFloat(bmiHeight.value)/100, r=(w/(h*h)).toFixed(2);bmiResult.innerText='BMI: '+r;">Calculate</button>`
  };
}

function ageCalc() {
  return {
    name: "Age Calculator",
    resultId: "ageResult",
    form: `
      <input id="dob" type="date">
      <button onclick="let d=new Date(dob.value),t=new Date(),a=t.getFullYear()-d.getFullYear();ageResult.innerText='Age: '+a+' years';">Calculate</button>`
  };
}

function emiCalc() {
  return {
    name: "EMI Calculator",
    resultId: "emiResult",
    form: `
      <input id="emi-principal" type="number" placeholder="Principal">
      <input id="emi-rate" type="number" placeholder="Interest Rate (%)">
      <input id="emi-tenure" type="number" placeholder="Tenure (months)">
      <button onclick="
        let p=+emiPrincipal.value,r=+emiRate.value/12/100,n=+emiTenure.value,
        e=(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
        emiResult.innerText='EMI: ₹'+e.toFixed(2);">Calculate</button>`
  };
}

function sipCalc() {
  return {
    name: "SIP Calculator",
    resultId: "sipResult",
    form: `
      <input id="sip-amount" type="number" placeholder="Monthly Investment">
      <input id="sip-rate" type="number" placeholder="Annual Interest Rate (%)">
      <input id="sip-years" type="number" placeholder="Years">
      <button onclick="
        let a=+sipAmount.value,r=(+sipRate.value)/100/12,n=+sipYears.value*12,
        f=a*((Math.pow(1+r,n)-1)/r)*(1+r);
        sipResult.innerText='Maturity Value: ₹'+f.toFixed(2);">Calculate</button>`
  };
}

function bmrCalc() {
  return {
    name: "BMR Calculator (Mifflin-St Jeor)",
    resultId: "bmrResult",
    form: `
      <input id="bmr-weight" type="number" placeholder="Weight (kg)">
      <input id="bmr-height" type="number" placeholder="Height (cm)">
      <input id="bmr-age" type="number" placeholder="Age">
      <select id="bmr-gender">
        <option value="male">Male</option><option value="female">Female</option>
      </select>
      <button onclick="
        let w=+bmrWeight.value,h=+bmrHeight.value,a=+bmrAge.value,g=bmrGender.value,
        r=g==='male'? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
        bmrResult.innerText='BMR: '+r.toFixed(2)+' kcal/day';">Calculate</button>`
  };
}

function percentCalc() {
  return {
    name: "Percentage Calculator",
    resultId: "percentResult",
    form: `
      <input id="part" type="number" placeholder="Part">
      <input id="whole" type="number" placeholder="Whole">
      <button onclick="let p=+part.value,w=+whole.value,r=(p/w*100).toFixed(2);percentResult.innerText='Result: '+r+'%';">Calculate</button>`
  };
}

function loanCalc() {
  return {
    name: "Loan Calculator",
    resultId: "loanResult",
    form: `
      <input id="loan-amount" type="number" placeholder="Loan Amount">
      <input id="loan-rate" type="number" placeholder="Interest Rate (%)">
      <input id="loan-years" type="number" placeholder="Years">
      <button onclick="
        let p=+loanAmount.value,r=(+loanRate.value)/100/12,n=+loanYears.value*12,
        emi=(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1),
        total=emi*n;
        loanResult.innerText='Total Repayment: ₹'+total.toFixed(2);">Calculate</button>`
  };
}

function unitConvCalc() {
  return {
    name: "Unit Converter (cm <-> m)",
    resultId: "unitResult",
    form: `
      <input id="unit-value" type="number" placeholder="Value">
      <select id="unit-from">
        <option value="cm">Centimeter</option>
        <option value="m">Meter</option>
      </select>
      <select id="unit-to">
        <option value="cm">Centimeter</option>
        <option value="m">Meter</option>
      </select>
      <button onclick="
        let v=+unitValue.value,f=unitFrom.value,t=unitTo.value;
        let r = f==='cm'&&t==='m'?v/100:f==='m'&&t==='cm'?v*100:v;
        unitResult.innerText='Converted: '+r+' '+t;">Convert</button>`
  };
}

function wordCountCalc() {
  return {
    name: "Word Counter",
    resultId: "wordResult",
    form: `
      <textarea id="text" rows="4" placeholder="Enter text..."></textarea>
      <button onclick="let w=text.value.trim().split(/\\s+/).filter(a=>a).length;wordResult.innerText='Words: '+w;">Count</button>`
  };
}

function taxCalc() {
  return {
    name: "Tax Calculator (India 5%)",
    resultId: "taxResult",
    form: `
      <input id="income" type="number" placeholder="Income (₹)">
      <button onclick="let i=+income.value,t=(i*0.05).toFixed(2);taxResult.innerText='Tax (5%): ₹'+t;">Calculate</button>`
  };
}
