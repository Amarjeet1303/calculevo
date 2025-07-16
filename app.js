// Assuming calculators.js defines a global `calculators` array with all calculators

const calcListEl = document.getElementById('calcList');
const calcContainer = document.getElementById('calcContainer');
const searchInput = document.getElementById('searchInput');

let activeCalcId = null;

// Utility: group calculators by category
function groupBy(array, key) {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
}

// Render the sidebar list grouped by category
function renderCalcMenu(calcs) {
  const grouped = groupBy(calcs, 'category');
  calcListEl.innerHTML = '';

  for (const [category, calcs] of Object.entries(grouped)) {
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category;
    calcListEl.appendChild(categoryTitle);

    calcs.forEach(calc => {
      const calcItem = document.createElement('div');
      calcItem.className = 'calc-item';
      calcItem.tabIndex = 0;
      calcItem.setAttribute('role', 'button');
      calcItem.setAttribute('aria-pressed', 'false');
      calcItem.setAttribute('data-id', calc.id);
      calcItem.innerHTML = `<span class="calc-icon" aria-hidden="true">${calc.icon}</span>${calc.name}`;
      calcListEl.appendChild(calcItem);

      calcItem.addEventListener('click', () => selectCalculator(calc.id));
      calcItem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCalculator(calc.id);
        }
      });
    });
  }
}

// Highlight active calculator in sidebar
function highlightActive() {
  document.querySelectorAll('.calc-item').forEach(item => {
    if(item.getAttribute('data-id') === activeCalcId) {
      item.classList.add('active');
      item.setAttribute('aria-pressed', 'true');
    } else {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    }
  });
}

// Select and render calculator by id
function selectCalculator(id) {
  if (activeCalcId === id) return; // already active
  activeCalcId = id;
  highlightActive();
  const calculator = calculators.find(c => c.id === id);
  if (calculator) {
    calculator.render(calcContainer);
    calcContainer.focus();
  }
}

// Filter calculators by search query
function filterCalculators() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = calculators.filter(c => 
    c.name.toLowerCase().includes(query) || c.category.toLowerCase().includes(query)
  );
  renderCalcMenu(filtered);
  if (filtered.length > 0) {
    selectCalculator(filtered[0].id);
  } else {
    calcContainer.innerHTML = '<p style="text-align:center; color:#888;">No calculators match your search.</p>';
  }
}

searchInput.addEventListener('input', filterCalculators);

// Initial render
renderCalcMenu(calculators);
if (calculators.length > 0) {
  selectCalculator(calculators[0].id);
}
