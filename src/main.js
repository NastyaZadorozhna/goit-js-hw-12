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

function showLoader() {
  loader.classList.remove('is-hidden');
}
function hideLoader() {
  loader.classList.add('is-hidden');
}

showLoader();
setTimeout(hideLoader, 300);

const onSearchFormSubmit = async event => {
  try {
    showLoader();
    event.preventDefault();

    currentPage = 1;

    const searchedValue = searchFormEl.elements.user_query.value.trim();

    const response = await fetchPhotos(searchedValue, currentPage);

    console.log(response);

    if (!response.data.hits.length || searchedValue === '') {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();

      return;
    }

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.innerHTML = galleryCardsTemplate;

    let imageGallery = new SimpleLightbox('.gallery a', {
      navText: ['<', '>'],
      captionsData: 'alt',
      captionDelay: 250,
      enableKeyboard: true,
    });
    imageGallery.refresh();

    loadMoreBtnEl.classList.remove('is-hidden-load');
  } catch (err) {
    console.log(err);
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


    if(Math.ceil(response.data.totalHits / 15) === currentPage);{
      LoadMoreBtnEl.classList.add('is-hidden-load');
    iziToast.info({
      position: 'topCenter',
      message: 'We are sorry,but you have reached the end of search results',
    });
  }
  } catch {
    console.log(err);
  } finally {
    hideLoader();
  }
  searchFormEl.reset();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
