const getCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {

            const shuffled = data.sort(() => 0.5 - Math.random());
            const randomCountries = shuffled.slice(0, 100);

            displayCountries(randomCountries);
        })
        .catch(error => {
            console.error('Search Error:', error);
        });
};

const displayCountries = (countries) => {
    const countriesContainer = document.getElementById('countries-container');
    countriesContainer.innerHTML = '';

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';


        const flag = country.flags?.png || '';
        let currencyName = 'Não disponível';
        if (country.currencies) {
            const currencyKey = Object.keys(country.currencies)[0];
            if (currencyKey && country.currencies[currencyKey].name) {
                currencyName = country.currencies[currencyKey].name;
            }
        }

        let languages = 'Não disponível';
        if (country.languages) {
            languages = Object.values(country.languages).join(', ');
        }


        countryCard.innerHTML = `
            <img src="${flag}" alt="Flag of ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'Não disponível'}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Currencies: ${currencyName}</p>
            <p>Languages: ${languages}</p>
        `;


        countriesContainer.appendChild(countryCard);
    });
};

document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            const filteredCountries = data.filter(country =>
                country.name.common.toLowerCase().includes(query)
            );
            displayCountries(filteredCountries);
        })
        .catch(error => {
            console.error('Search error:', error);
        });
});

getCountries();
