// ==========================================
// FRESHFIND MARKET DIRECTORY
// ==========================================

const markets = [

  {
    id: 1,
    name: "Green Basket Market",
    area: "Clifton",
    description: "Fresh fruits, vegetables and organic produce.",
    days: ["Monday", "Wednesday", "Friday", "Saturday"],
    time: "09:00 - 18:00",
    products: [
      "Mangoes",
      "Tomatoes",
      "Spinach",
      "Lettuce"
    ],
    icon: "🥬"
  },

  {
    id: 2,
    name: "Fresh Farm Shop",
    area: "DHA",
    description: "Local farm produce delivered fresh every morning.",
    days: ["Tuesday", "Thursday", "Saturday"],
    time: "08:00 - 17:00",
    products: [
      "Apples",
      "Potatoes",
      "Carrots",
      "Herbs"
    ],
    icon: "🥕"
  },

  {
    id: 3,
    name: "Karachi Fresh Market",
    area: "Gulshan",
    description: "A neighborhood market with seasonal fruits and vegetables.",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    time: "10:00 - 20:00",
    products: [
      "Mangoes",
      "Bananas",
      "Onions",
      "Cucumbers"
    ],
    icon: "🍎"
  },

  {
    id: 4,
    name: "Organic Corner",
    area: "PECHS",
    description: "Organic vegetables and locally grown seasonal produce.",
    days: ["Friday", "Saturday", "Sunday"],
    time: "09:00 - 19:00",
    products: [
      "Spinach",
      "Broccoli",
      "Lettuce",
      "Herbs"
    ],
    icon: "🌱"
  },

  {
    id: 5,
    name: "Farmers Fresh Hub",
    area: "North Nazimabad",
    description: "Fresh produce directly from local growers.",
    days: ["Wednesday", "Saturday", "Sunday"],
    time: "08:00 - 16:00",
    products: [
      "Tomatoes",
      "Mangoes",
      "Potatoes",
      "Peppers"
    ],
    icon: "🥦"
  }

];


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("year").textContent =
    new Date().getFullYear();

  setupVisitorCounter();

  setupFilters();

  populateAreaFilter();

  renderMarkets(markets);

  updateClock();

  setInterval(updateClock, 1000);

});


// ==========================================
// CLOCK
// ==========================================

function updateClock() {

  const clock = document.getElementById("clock");

  if (!clock) return;

  const now = new Date();

  clock.textContent = now.toLocaleTimeString();

}


// ==========================================
// VISITOR COUNTER
// ==========================================

function setupVisitorCounter() {

  let visitors =
    Number(localStorage.getItem("freshfindVisitors")) || 1247;

  visitors++;

  localStorage.setItem(
    "freshfindVisitors",
    visitors
  );

  document.getElementById("visitorCount").textContent =
    visitors.toLocaleString();

}


// ==========================================
// AREA FILTER
// ==========================================

function populateAreaFilter() {

  const select =
    document.getElementById("areaFilter");

  const areas = [
    ...new Set(
      markets.map(market => market.area)
    )
  ];

  areas.sort();

  areas.forEach(area => {

    const option =
      document.createElement("option");

    option.value = area;
    option.textContent = area;

    select.appendChild(option);

  });

}


// ==========================================
// FILTER SETUP
// ==========================================

function setupFilters() {

  document
    .getElementById("searchInput")
    .addEventListener(
      "input",
      filterMarkets
    );

  document
    .getElementById("areaFilter")
    .addEventListener(
      "change",
      filterMarkets
    );

  document
    .getElementById("dayFilter")
    .addEventListener(
      "change",
      filterMarkets
    );

  document
    .getElementById("sortFilter")
    .addEventListener(
      "change",
      filterMarkets
    );


  document
    .getElementById("clearFilters")
    .addEventListener(
      "click",
      clearFilters
    );

}


// ==========================================
// CHECK IF MARKET IS OPEN
// ==========================================

function isOpen(market) {

  const now = new Date();

  const day = now.toLocaleDateString(
    "en-US",
    {
      weekday: "long"
    }
  );

  if (!market.days.includes(day)) {
    return false;
  }

  const [openTime, closeTime] =
    market.time.split(" - ");


  const [openHour, openMinute] =
    openTime.split(":").map(Number);

  const [closeHour, closeMinute] =
    closeTime.split(":").map(Number);


  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();


  const openMinutes =
    openHour * 60 +
    openMinute;

  const closeMinutes =
    closeHour * 60 +
    closeMinute;


  return (
    currentMinutes >= openMinutes &&
    currentMinutes <= closeMinutes
  );

}


// ==========================================
// FILTER MARKETS
// ==========================================

function filterMarkets() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();


  const area =
    document.getElementById(
      "areaFilter"
    ).value;


  const day =
    document.getElementById(
      "dayFilter"
    ).value;


  let results =
    markets.filter(market => {

      const searchableText = [

        market.name,

        market.area,

        market.description,

        ...market.products

      ]
        .join(" ")
        .toLowerCase();


      const matchesSearch =
        !search ||
        searchableText.includes(search);


      const matchesArea =
        !area ||
        market.area === area;


      const matchesDay =
        !day ||
        market.days.includes(day);


      return (
        matchesSearch &&
        matchesArea &&
        matchesDay
      );

    });


  const sort =
    document.getElementById(
      "sortFilter"
    ).value;


  if (sort === "open") {

    results.sort(
      (a, b) =>
        Number(isOpen(b)) -
        Number(isOpen(a))
    );

  } else {

    results.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );

  }


  renderMarkets(results);

}


// ==========================================
// RENDER MARKETS
// ==========================================

function renderMarkets(list) {

  const grid =
    document.getElementById(
      "marketGrid"
    );

  const empty =
    document.getElementById(
      "emptyState"
    );


  document.getElementById(
    "marketCount"
  ).textContent = markets.length;


  document.getElementById(
    "produceCount"
  ).textContent = [
    ...new Set(
      markets.flatMap(
        market => market.products
      )
    )
  ].length;


  if (list.length === 0) {

    grid.innerHTML = "";

    empty.classList.remove("hidden");

    return;

  }


  empty.classList.add("hidden");


  grid.innerHTML =
    list.map(market => {

      const open = isOpen(market);


      return `

        <article class="market-card">

          <div class="market-icon">
            ${market.icon}
          </div>

          <div class="eyebrow ${
            open ? "open-text" : ""
          }">

            ${
              open
                ? "● OPEN NOW"
                : "FRESH MARKET"
            }

          </div>


          <h3>
            ${market.name}
          </h3>


          <div class="market-meta">
            📍 ${market.area}
            •
            🕒 ${market.time}
          </div>


          <p>
            ${market.description}
          </p>


          <div class="product-tags">

            ${market.products
              .map(product =>
                `<span class="tag">
                  ${product}
                </span>`
              )
              .join("")}

          </div>


          <div class="card-actions">

            <button
              class="primary"
              onclick="showMarket(${market.id})"
            >
              View Details
            </button>

          </div>

        </article>

      `;

    }).join("");

}


// ==========================================
// MARKET DETAILS
// ==========================================

function showMarket(id) {

  const market =
    markets.find(
      market => market.id === id
    );


  if (!market) return;


  alert(

    `${market.name}\n\n` +

    `📍 Area: ${market.area}\n` +

    `🕒 Hours: ${market.time}\n\n` +

    `Products:\n` +

    market.products.join(", ")

  );

}


// ==========================================
// CLEAR FILTERS
// ==========================================

function clearFilters() {

  document.getElementById(
    "searchInput"
  ).value = "";


  document.getElementById(
    "areaFilter"
  ).value = "";


  document.getElementById(
    "dayFilter"
  ).value = "";


  document.getElementById(
    "sortFilter"
  ).value = "name";


  renderMarkets(markets);

}
