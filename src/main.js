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
  event.preventDefault(); 

  galleryEl.innerHTML = '';
  loadMoreBtnEl.classList.add('is-hidden-load');
  
  searchedValue = searchFormEl.elements.user_query.value.trim();


  if (searchedValue === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Input field must not be empty',
      position: 'bottomCenter',
    });
    return;
  }

  try {
    showLoader();
    currentPage = 1;

    
    const response = await fetchPhotos(searchedValue, currentPage);

    if (response.data.total === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomCenter',
      });
      return;
    }

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryCardsTemplate;


    const galleryCardEl = galleryEl.querySelector('li');
    cardHeight = galleryCardEl.getBoundingClientRect().height;

    imageGallery.refresh();

   
    let totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage < totalPages) {
      loadMoreBtnEl.classList.remove('is-hidden-load');
    } else {
      iziToast.info({
        title: 'Info',
        message: 'We are sorry, but you have reached the end of search results',
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

const onLoadMoreBtnClick = async () => {
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
        message: 'We are sorry, but you have reached the end of search results',
      });
    }
  } catch (err){
    iziToast.error({
      message:
        'Sorry, there was an error loading the images. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
