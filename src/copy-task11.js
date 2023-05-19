// import Notiflix from 'notiflix';
// import GalleryService from "./getImages.js";
// import LoadMoreBtn from "./LoadMoreBtn.js";
// import createPhotoMarkup from './createPhotoMarkup.js';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const refs = {
//   searchForm: document.getElementById('search-form'),
//   galleryWrapper: document.querySelector('.gallery'),
// };

// const galleryService = new GalleryService();
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   isHidden: true,
// });

// refs.searchForm.addEventListener('submit', onSearchFormSubmit);
// loadMoreBtn.button.addEventListener('click', onLoadMoreBtnClick);


// async function onSearchFormSubmit(event) {
//   event.preventDefault();

//   const formEl = event.currentTarget;
//   const inputValue = formEl.elements.searchQuery.value.trim();

//   if (!inputValue === "") {
//     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//     loadMoreBtn.hide();
//   }
//   else {
//     try {
//       galleryService.searchQuery = inputValue;
//       galleryService.resetPage();
//       formEl.reset();
//       clearGalleryList();
//       await getPhotos();
//       loadMoreBtn.enable();
//       // loadMoreBtn.show();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// async function onLoadMoreBtnClick() {
//   loadMoreBtn.disable();

//   try {
//     await getPhotos();
//     loadMoreBtn.enable();

//   } catch (err) {
//     console.log(err);
//     // Notiflix.Notify.failure("Sorry, there's an error occurred while loading images.");
//     loadMoreBtn.enable();
//   }
// }

// async function getPhotos() {
//   const data = await galleryService.getImages();
//   const totalPages = Math.ceil(data.totalHits / galleryService.perPage);

//   if (data.hits.length === 0) {
//     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//     loadMoreBtn.hide()
//     return;
//   }
//   else {
//     Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
//     const markup = data.hits.map(image => createPhotoMarkup(image)).join('');
//     updateGalleryList(markup);
//   }

//   if (galleryService.page > 1) {
//     {
//       const { height: cardHeight } = document
//         .querySelector(".gallery")
//         .firstElementChild.getBoundingClientRect();

//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//       });
//     }
//   }
//   else {
//     loadMoreBtn.show();
//     //  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//   }

//   if (galleryService.page >= totalPages) {
//     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     loadMoreBtn.hide();
//   } else {
//     loadMoreBtn.show();
//   }

//   initLightbox();
// }


// function updateGalleryList(markup) {
//   refs.galleryWrapper.insertAdjacentHTML("beforeend", markup);
// }

// function clearGalleryList() {
//   refs.galleryWrapper.innerHTML = '';
// }


// function initLightbox() {
//   const lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//     // captionPosition: 'bottom',
//     caption: 'true',
//   });
// }