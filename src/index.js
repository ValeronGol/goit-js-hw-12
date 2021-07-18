import './css/styles.css';
import API from './js/fetchCountries';
import Notiflix from "notiflix";
import _ from 'lodash';
import countryCard from './templates/country.hbs';
import countriesList from './templates/countriesList.hbs'



const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input',_.debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event){
  event.preventDefault();
    const countryName = event.target.value.trim();
   if(countryName ==''){
   return clearContainer();
   }else{API.fetchCountries(countryName)
    .then(response => {
      if (response.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.'); 
      }
      else if (response.length ==1) {
        renderCountry(response[0]);
      } 
      else{
        renderCountriesList(response);
      }
      
    })
    .catch(error => {
      console.log(error);
    }).finally(clearContainer());
  }
}


function renderCountry(country) {
  const lang = country.languages.map(l => l.name).join(', ');
  const markup = countryCard({country, lang});
  countryInfo.insertAdjacentHTML('beforeend', markup);
  }
  function renderCountriesList(countriesItem) {
    const markup = countriesList(countriesItem);
    countryList.insertAdjacentHTML('beforeend', markup);
  }
  
  function clearContainer() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }