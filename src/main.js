import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

let currentPage = 1;
let searchedValue = '';
let cardHeight = 0;

function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}

hideLoader();
setTimeout(hideLoader, 300);

let imageGallery = new SimpleLightbox('.gallery a', {
  navText:  ['<','>'],
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
});

const onSearchFormSubmit = async event => {
  try {
    showLoader();
    event.preventDefault();

    currentPage = 1;
    searchedValue = searchFormEl.elements.user_query.value.trim();
    const response = await fetchPhotos(searchedValue, currentPage);

    console.log(response);

    if (searchedValue === '') {
      iziToast.warning({
        title: 'Caution',
        message: 'Input field must not be empty',
        position: 'bottomCenter',
      });

      return;
    }

    if (response.data.total === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomCenter',
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();

      return;
    }

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryCardsTemplate;

    const galleryCardEl = galleryEl.querySelector('li');
    cardHeight = galleryCardEl.getBoundingClientRect().height;

    imageGallery.refresh();

    loadMoreBtnEl.classList.remove('is-hidden-load');

    let totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage >= totalPages) {
      loadMoreBtnEl.classList.add('is-hidden-load');
      iziToast.info({
        title: 'Info',
        message: 'We are sorry,but you have reached the end of search results',
      });
    }
  } catch (err) {
    iziToast.error({
      message: err.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
  searchFormEl.reset();
};

const onLoadMoreBtnClick = async event => {
  try {
    showLoader();
    currentPage++;

    const response = await fetchPhotos(searchedValue, currentPage);
  
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
   
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    imageGallery.refresh();

    let totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage >= totalPages) {
      loadMoreBtnEl.classList.add('is-hidden-load');
      iziToast.info({
        position: 'topCenter',
        message: 'We are sorry,but you have reached the end of search results',
      });
  }
  } catch (err){
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
  searchFormEl.reset();

};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
