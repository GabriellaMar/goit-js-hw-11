import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
import GalleryService from "./getImages.js";
// import LoadMoreBtn from "./getImages.js";

const refs = {
  searchForm: document.getElementById('search-form'),
  galleryWrapper: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
}

const galleryService = new GalleryService()
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more', 
//   isHidden: true})


refs.searchForm.addEventListener('submit', onSubmit)
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
// loadMoreBtn.button.addEventListener('click', onLoadMoreBtnClick)



async function onSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget;
  //  console.log(formEl)
  const value = formEl.elements.searchQuery.value.trim();
  //  console.log(value)
  if (value === "") {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  }

  try {
    galleryService.searchQuery = value

    galleryService.resetPage()

    formEl.reset()
    clearGalleryList()

    const data = await galleryService.getImages();

    if (data.hits.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      disableLoadMoreBtn()
      return;
    }
    else {
      await getPhotoMarkup()
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      refs.loadMoreBtn.classList.remove('hidden')

      enableLoadMoreBtn();
    }
  } catch (error) {
    console.log(error);
  }
}


async function onLoadMoreBtnClick() {
  try {
    // loadMoreBtn.disable()
    disableLoadMoreBtn();
    const data = await galleryService.getImages();

    await getPhotoMarkup()

    enableLoadMoreBtn();
  
  } catch (error) {
    console.log(error);
  }
}

function createPhotoMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `<div class="photo-card">
 <a class="gallery__link" href="${largeImageURL}">
 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
 </a>
 <div class="info">
   <p class="info-item">
     <b>Likes</b> ${likes}
   </p>
   <p class="info-item">
     <b>Views</b> ${views}
   </p>
   <p class="info-item">
     <b>Comments</b> ${comments}
   </p>
   <p class="info-item">
     <b>Downloads</b> ${downloads}
   </p>
 </div>
</div>
`
}

function clearGalleryList() {
  refs.galleryWrapper.innerHTML = '';
}

async function getPhotoMarkup() {
  const data = await galleryService.getImages(galleryService.searchQuery);
  const totalPages = Math.ceil(data.totalHits / galleryService.perPage);

  const photoMarkup = data.hits.reduce((markup, image) => markup + createPhotoMarkup(image), "")

  refs.galleryWrapper.insertAdjacentHTML("beforeend", photoMarkup);

  galleryService.incrementPage();
 

  if (galleryService.page === totalPages) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.classList.add('hidden');
  } else {
    refs.loadMoreBtn.classList.remove('hidden');
  }

  initLightbox()
}


function disableLoadMoreBtn() {
  refs.loadMoreBtn.setAttribute('disabled', true);
  refs.loadMoreBtn.textContent = 'Loading...';
}

function enableLoadMoreBtn() {
  refs.loadMoreBtn.removeAttribute('disabled');
  refs.loadMoreBtn.textContent = 'Load more';
}


function initLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    // captionPosition: 'bottom',
    caption: 'true',
  });
}