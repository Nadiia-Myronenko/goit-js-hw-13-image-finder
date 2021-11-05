import articlesTpl from './templates/articles.hbs';
import LoadMoreBtn from './load-more-button';
import NewsApiService from './apiService';
import './sass/styles.scss';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';



const refs = {
    searchForm: document.querySelector('.search-form'),
    gallary: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    clearGallary();
    loadMoreBtn.show();
    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.elements.query.value;
    if (newsApiService.query === '') {
        loadMoreBtn.hide();
        defaultModules.set(PNotifyMobile, {});
        return alert({
            text: '! Enter something!',
            addClass: 'notify',
            delay: 2000,
        });

    };
    newsApiService.fetchArticles()
        .then(appendArticlesMarkup)
        .catch(error => {/*
            defaultModules.set(PNotifyMobile, {});
            return alert({
                text: '! Information is not found!',
                addClass: 'notify',
                delay: 2000,
            });*/
            console.log(error);


        });
}
function onLoadMore() {
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}
function appendArticlesMarkup(articles) {
    if (articles.length < 12) {
        loadMoreBtn.hide();
    }
    refs.gallary.insertAdjacentHTML('beforeend', articlesTpl(articles));
}
function clearGallary() {
    refs.gallary.innerHTML = "";
}