// import Lightbox from "./index.js";
// import MarkUp from "./createMarkUp.js";

// import GalleryService from "./getImages.js";
// const galleryService = new GalleryService()

// export default async function getPhotoMarkup() {
//     const data = await galleryService.getImages(galleryService.searchQuery);
//     const totalPages = Math.ceil(data.totalHits / galleryService.perPage);
  
//     const photoMarkup = data.hits.reduce((markup, image) => markup + MarkUp.createPhotoMarkup(image), "")
  
//     refs.galleryWrapper.insertAdjacentHTML("beforeend", photoMarkup);
  
//     galleryService.incrementPage();
   
  
//     if (galleryService.page === totalPages) {
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//       refs.loadMoreBtn.classList.add('hidden');
//     } else {
//       refs.loadMoreBtn.classList.remove('hidden');
//     }
  
//     Lightbox.initLightbox()
//   }