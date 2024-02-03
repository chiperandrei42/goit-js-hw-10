// index.js
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

const toggleLoaderAndElements = (loaderVisible, catInfoVisible, errorVisible) => {
    loaderElement.style.display = loaderVisible ? 'block' : 'none';
    catInfoDiv.style.display = catInfoVisible ? 'block' : 'none';
    errorElement.style.display = errorVisible ? 'block' : 'none';
};
const toggleError = (errorVisible, message = '') => {
    const errorMessage = message || 'Oops! Something went wrong! Try reloading the page!';
    errorElement.textContent = errorMessage;
    toggleLoaderAndElements(false, false, false, errorVisible);
};

fetchBreeds()
    .then((breeds) => {
        toggleLoaderAndElements(false, false, false);
        const fragmentElement = document.createDocumentFragment();

        breeds.forEach((breed) => {
            const optionElement = document.createElement('option');
            optionElement.textContent = breed.name;
            optionElement.value = breed.id;
            fragmentElement.append(optionElement);
        });

        breedSelect.appendChild(fragmentElement);

        breedSelect.addEventListener('change', () => {
            toggleLoaderAndElements(true, false, false);
            const selectedBreedId = breedSelect.value;

            fetchCatByBreed(selectedBreedId)
                .then((catInformation) => {
                    const catBreed = catInformation[0].breeds.length > 0 ? catInformation[0].breeds[0] : null;

                    if (catBreed) {
                        catInfoDiv.innerHTML = `
                            <img src="${catInformation[0].url}" alt="Cat Image">
                            <p><strong>Breed:</strong> ${catBreed.name}</p>
                            <p><strong>Description:</strong> ${catBreed.description}</p>
                            <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
                        `;
                    } else {
                        console.error('No breed information found for the selected cat.');
                    }

                    toggleLoaderAndElements(false, true, false);
                })
                .catch((error) => {
                    console.error('Error fetching cat breeds:', error.response || error);
                    toggleLoaderAndElements(false, true, true);
                });
        });
    })
    .catch((error) => {
        console.error('Error fetching cat information:', error.response || error);
        toggleLoaderAndElements(false, true, true);
    });