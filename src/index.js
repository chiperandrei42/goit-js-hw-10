import axios from "axios";
import { FetchBreeds } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_lPSfiLyqeoFVlFQExux2vYaNKyljUHGjBlXd30TIqOFJD6M8jNUK781Ruglw8OEQ";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const showLoader = document.querySelector(".loader");
const showError = document.querySelector(".error");
showError.style.visibility = "hidden";


FetchBreeds().then((parsedJSON) => {
        for (let i = 0; i < parsedJSON.length; i++) {
            const newOption = document.createElement('option');
            newOption.value = parsedJSON[i].id;
            newOption.textContent = parsedJSON[i].name;
            breedSelect.appendChild(newOption);
    }
}).catch((error) => {
      console.error('Error:', error);
      showError.style.visibility = "visible";
  }).finally(showLoader.style.visibility = "hidden")

const getCatDescription = async (breedId) => {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    catInfo.textContent = "";

    try {
      showLoader.style.visibility = "visible"
      const response = await axios.get(url);
      const data = await response.data;

        const breed = data[0].breeds[0];
      const newElem = document.createElement('img');
      newElem.src = data[0].url
        catInfo.appendChild(newElem);
        const newParagraph = document.createElement('p');
        newParagraph.textContent = breed.description;
        catInfo.appendChild(newParagraph);
    
  } catch (error) {
      console.error('Error:', error);
      showError.style.visibility = "visible";
    } finally {
        showLoader.style.visibility = "hidden"
  }
};

breedSelect.addEventListener('change', (e) => {
    const clicked = e.target.value;
    getCatDescription(clicked);
})