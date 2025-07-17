// 🌐 Default cities
const defaultCities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
];

// ⏰Format and display time for a city
function updateCityTime(cityElement, timezone) {
  const now = moment().tz(timezone);
  const date = now.format("MMMM DD, YYYY");
  const time = now.format("HH:mm");
  const dateElement = cityElement.querySelector(".date");
  const timeElement = cityElement.querySelector(".time");

  if (dateElement) dateElement.textContent = date;
  if (timeElement) timeElement.textContent = time;
}

// 🔀 Replace New York with selected timezone
function replaceNewYorkWithSelected() {
  const select = document.getElementById("timezone");
  const selectedTimezone = select.value;

  if (!selectedTimezone) {
    return;
  }

  // Get city name from the selected option text
  const selectedOption = select.options[select.selectedIndex];
  const cityName = selectedOption.textContent;

  // Get the New York city element
  const newYorkElement = document.getElementById("new-york");
  if (newYorkElement) {
    // Update the city name
    const cityNameElement = newYorkElement.querySelector("h2");
    if (cityNameElement) {
      cityNameElement.textContent = cityName;
    }

    // Update the data-timezone attribute
    newYorkElement.setAttribute("data-timezone", selectedTimezone);

    // Update the time for the new timezone
    updateCityTime(newYorkElement, selectedTimezone);
  }
}

// Update all cities
function updateAllDisplayedCities() {
  const allCities = document.querySelectorAll(".city");

  allCities.forEach((cityElement) => {
    const timezone = cityElement.getAttribute("data-timezone");
    if (timezone) {
      updateCityTime(cityElement, timezone);
    }
  });
}

// Initialize the application
function init() {
  defaultCities.forEach((city) => {
    const cityElement = document.getElementById(
      city.name.toLowerCase().replace(" ", "-")
    );
    if (cityElement) {
      cityElement.setAttribute("data-timezone", city.timezone);
    }
  });

  // Initial time update
  updateAllDisplayedCities();

  // Update time every second
  setInterval(updateAllDisplayedCities, 1000);

  // Add event listener to update button
  const updateButton = document.getElementById("update-time");
  if (updateButton) {
    updateButton.addEventListener("click", replaceNewYorkWithSelected);
  }

  // Add event listener to select dropdown
  const timezoneSelect = document.getElementById("timezone");
  if (timezoneSelect) {
    timezoneSelect.addEventListener("change", function () {
      if (this.value) {
        console.log("Selected timezone:", this.value);
      }
    });
  }
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
