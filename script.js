const calculators = [
  // ... Your existing calculators unchanged (no code change here) ...
];

// Renders calculator list as accessible buttons with event delegation
function renderCalculatorList(calcList) {
  const container = document.getElementById("calculatorContainer");
  if (!container) return;

  if (calcList.length === 0) {
    container.innerHTML = `<p class="no-results">No calculators found.</p>`;
    return;
  }

  container.innerHTML = calcList
    .map(
      (calc) => `
      <button class="calc-list-btn" data-id="${calc.id}" aria-label="Open ${calc.name}" type="button">
        ${calc.name}
      </button>
    `
    )
    .join("");

  // Use event delegation on container instead of individual buttons
  container.onclick = (e) => {
    const btn = e.target.closest("button.calc-list-btn");
    if (btn) {
      loadCalculator(btn.dataset.id);
    }
  };

  // Optional: make container focusable for keyboard users
  container.tabIndex = 0;
}

// Load single calculator UI and attach its logic
function loadCalculator(calcId) {
  const container = document.getElementById("calculatorContainer");
  const calc = calculators.find((c) => c.id === calcId);
  if (!calc) return;

  container.innerHTML = `
    <button id="backToListBtn" aria-label="Back to calculator list" type="button">&larr; Back to list</button>
    <article class="calculator-card" role="region" aria-labelledby="${calc.id}-title" tabindex="0">
      ${calc.html.replace(/<h3>(.*?)<\/h3>/, `<h3 id="${calc.id}-title">$1</h3>`)}
    </article>
  `;

  const backBtn = document.getElementById("backToListBtn");
  backBtn.onclick = () => {
    const activeCategoryBtn = document.querySelector(".category-btn.active");
    const activeCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : "all";
    if (activeCategory === "all") {
      renderCalculatorList(calculators);
    } else {
      renderCalculatorList(calculators.filter((c) => c.category === activeCategory));
    }
    // Return focus back to container for accessibility
    container.focus();
  };

  // Attach calculator specific event listener for calculate button
  const btnId = `${calc.id}CalcBtn`;
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.onclick = calc.calcFunc;

    // Also trigger calculation on Enter key for accessibility
    btn.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        calc.calcFunc();
      }
    });
  }
}

// Show calculators filtered by category (renders list)
function showCategory(category) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    const pressed = btn.dataset.category === category;
    btn.classList.toggle("active", pressed);
    btn.setAttribute("aria-pressed", pressed ? "true" : "false");
  });

  if (category === "all") {
    renderCalculatorList(calculators);
  } else {
    renderCalculatorList(calculators.filter((c) => c.category === category));
  }
}

// Filter calculators by search input (on list of calculator buttons)
let searchTimeout;
function filterCalculators() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const input = document.getElementById("searchBar");
    if (!input) return;

    const term = input.value.trim().toLowerCase();
    if (!term) {
      // Show active category calculators list
      const activeBtn = document.querySelector(".category-btn.active");
      if (activeBtn) {
        showCategory(activeBtn.dataset.category);
      } else {
        renderCalculatorList(calculators);
      }
      return;
    }

    const filtered = calculators.filter((calc) =>
      calc.name.toLowerCase().includes(term)
    );
    renderCalculatorList(filtered);
  }, 300);
}

// Dark mode toggle
function initDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar ul");

  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
    navbar.classList.toggle("show");
  });
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderCalculatorList(calculators);

  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      showCategory(btn.dataset.category);
      document.getElementById("searchBar").value = "";
    })
  );

  document.getElementById("searchBar").addEventListener("input", filterCalculators);

  initDarkMode();
  initMobileMenu();
});
