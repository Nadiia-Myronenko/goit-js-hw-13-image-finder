import articlesTpl from './templates/articles.hbs';
import NewsApiService from './apiService';
import './sass/styles.scss';



const refs = {
    searchForm: document.querySelector('.search-form'),
    gallary: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('[data-action="load-more"]')
};

const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);



function onSearch(e) {
    e.preventDefault();
    clearGallary();
    if (newsApiService.query = '') {
        return alert('Enter something!');
    }
    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.elements.query.value;
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}
function onLoadMore() {
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}
function appendArticlesMarkup(articles) {
    refs.gallary.insertAdjacentHTML('beforeend', articlesTpl(articles));
}
function clearGallary() {
    refs.gallary.innerHTML = "";
}