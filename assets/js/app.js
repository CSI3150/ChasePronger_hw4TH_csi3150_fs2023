import usedCars from './usedCars.js';

window.onload = function() {
    displayCars(usedCars);
    populateFilters(usedCars);
    setupAccordionListeners();
}

function displayCars(cars) {
    const carListingsDiv = document.querySelector('.car-listings');
    carListingsDiv.innerHTML = '';

    if (!cars.length) {
        carListingsDiv.innerHTML = '<p>No cars match the filter criteria.</p>';
        return;
    }

    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.className = 'car-card';
        const randomImageNumber = Math.floor(Math.random() * 11) + 1;
        const imagePath = `./assets/images/car (${randomImageNumber}).webp`;

        carDiv.innerHTML = `
            <img src="${imagePath}" alt="Image of ${car.make} ${car.model}" style="width: 100%;">
            <h2>${car.make} ${car.model}</h2>
            <p>Year: ${car.year}</p>
            <p>Mileage: ${car.mileage}</p>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
        `;

        carListingsDiv.appendChild(carDiv);
    });
}

function populateFilters(cars) {
    const makesSet = new Set();
    const colorsSet = new Set();
    const yearsSet = new Set();

    cars.forEach(car => {
        makesSet.add(car.make);
        colorsSet.add(car.color);
        yearsSet.add(car.year);
    });

    const makeSelect = document.getElementById('make');
    const colorSelect = document.getElementById('color');
    const minYearSelect = document.getElementById('minYear');
    const maxYearSelect = document.getElementById('maxYear');

    makesSet.forEach(make => {
        const option = document.createElement('option');
        option.value = make;
        option.innerText = make;
        makeSelect.appendChild(option);
    });

    colorsSet.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.innerText = color;
        colorSelect.appendChild(option);
    });

    const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);
    sortedYears.forEach(year => {
        const optionMin = document.createElement('option');
        optionMin.value = year;
        optionMin.innerText = year;
        minYearSelect.appendChild(optionMin);

        const optionMax = document.createElement('option');
        optionMax.value = year;
        optionMax.innerText = year;
        maxYearSelect.appendChild(optionMax);
    });
}

function applyFilters() {
    const minYear = parseInt(document.getElementById('minYear').value) || 0;
    const maxYear = parseInt(document.getElementById('maxYear').value) || Number.MAX_SAFE_INTEGER;
    const selectedMakes = Array.from(document.getElementById('make').selectedOptions).map(option => option.value);
    const maxMileage = parseInt(document.getElementById('maxMileage').value) || Number.MAX_SAFE_INTEGER;
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Number.MAX_SAFE_INTEGER;
    const selectedColors = Array.from(document.getElementById('color').selectedOptions).map(option => option.value);

    const filteredCars = usedCars.filter(car => {
        const makeFilter = !selectedMakes.includes("") ? selectedMakes.includes(car.make) : true;
        const colorFilter = !selectedColors.includes("") ? selectedColors.includes(car.color) : true;

        return (car.year >= minYear) &&
               (car.year <= maxYear) &&
               makeFilter &&
               (car.mileage <= maxMileage) &&
               (car.price >= minPrice) &&
               (car.price <= maxPrice) &&
               colorFilter;
    });

    displayCars(filteredCars);
}

function setupAccordionListeners() {
    const accordions = document.querySelectorAll('.accordion-toggle');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            const parentAccordion = this.parentElement;
            parentAccordion.classList.toggle('accordion-open');
        });
    });
}

function setupFilterListeners() {
    const filterElements = document.querySelectorAll('#make, #color, #minYear, #maxYear, #maxMileage, #minPrice, #maxPrice');

    filterElements.forEach(element => {
        element.addEventListener('change', applyFilters);
    });
}

window.onload = function() {
    populateFilters(usedCars);
    setupFilterListeners();
    applyFilters();
    setupAccordionListeners();
}