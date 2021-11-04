export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {

        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=24183605-bf7aca68d7e367c79bb8460cd`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.incrementPage();
                return data.hits;
            });
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
}
