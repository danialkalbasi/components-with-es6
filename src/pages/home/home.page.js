import { HeaderComponent, SearchBoxComponent, CircleLabelComponent, PieChartComponent } from '../../components';
import { FeedbacksService, HttpMethodsService, AppService } from '../../services';
import { getDeviceType } from '../../functions';
import './home.page.scss';

const ELEMENTS_CLASSES = {
    FEEDBACKS: 'home-feedbacks-list-container',
    TOOLBAR_FILTERS: 'home-feedbacks-toolbar-filters',
    HOME_STATS: 'home-stats',
};

/**
 * Home page is a component that brings everything together and assembles a complete page
 * It uses other small components and calls relavant services.
 */
export default class HomePage {
    constructor() {
        this.setDefaults();
        this.subsribeToPageLoad();
    }

    render() {
        return `<section id='home'>
                <div class='home-header'>
                    <div class='container'>
                        ${new HeaderComponent({ title: 'Dashboard' }).render()}
                    </div>
                </div>
                <div class='home-feedbacks'>
                    <div class='container'>
                        ${this.createToolbar()}
                        <div class='${ELEMENTS_CLASSES.FEEDBACKS}'>
                            ${this.createFeedbackList([])}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Initialize the services & class fields to default values
     */
    setDefaults() {
        this.feedbacks = [];
        this.appService = new AppService();
        this.feedbacksService = new FeedbacksService(new HttpMethodsService());
        this.filtersState = this.createDefaultFiltersData();
    }

    /**
     * Create default toolbar filters based on a static list of numbers.
     * All filters are inactive as a default.
     */
    createDefaultFiltersData() {
        const filters = [1, 2, 3, 4, 5];
        const state = {};
        filters.forEach((filter) => {
            state[filter] = { filter, isActive: false };
        });

        return state;
    }

    /**
     * It subscribes to the page load event
     * Upon page load, it retrieves the feedbacks result and renders the feedbacks list
     */
    subsribeToPageLoad() {
        this.appService.pageLoaded(() => this.retrieveFeedbacksAndRender());
    }

    retrieveFeedbacksAndRender() {
        return this.feedbacksService.list().then((feedbacksResult) => {
            if (feedbacksResult && feedbacksResult.items) {
                this.feedbacks = feedbacksResult.items;
                this.renderFeedbacks(feedbacksResult.items);
                this.renderStatsChart();

                return feedbacksResult.items;
            }

            return false;
        });
    }

    /**
     * It creates the toolbar section
     */
    createToolbar() {
        const searchBoxComponent = new SearchBoxComponent({
            onTextChange: text => this.handleSearchInputChange(text),
            placeholder: 'Search here...',
        });

        return `
            <div class='home-feedbacks-toolbar'>
                <div>${searchBoxComponent.render()}</div>
                <div class='${ELEMENTS_CLASSES.TOOLBAR_FILTERS}'>${this.createFilters(this.filtersState)}</div>
                <div class='${ELEMENTS_CLASSES.HOME_STATS}'></div>
            </div>
        `;
    }

    /**
     * It handles the search input change.
     * Whenever there is a new input value, the feedback items are filtered based on the comment.
     * @param {String} text
     */
    handleSearchInputChange(text) {
        const filteredtItems = this.feedbacks.filter(feedback => feedback.comment.includes(text));
        this.filtersState = this.createDefaultFiltersData();
        this.renderFilters();
        this.renderFeedbacks(filteredtItems);
    }

    /**
     * It renders feedbacks list and feedback header based on the array of items
     * @param {Array} feedbacks
     */
    renderFeedbacks(feedbacks) {
        const feedbacksDom = this.createFeedbackList(feedbacks);
        document.querySelector(`.${ELEMENTS_CLASSES.FEEDBACKS}`).innerHTML = feedbacksDom;
    }

    /**
     * It creates feedback items. If there are no items, it will render a message.
     * @param {Array} feedbackItems
     * @returns list of feedback items dom
     */
    createFeedbackList(feedbackItems = []) {
        const feedbacksDom = feedbackItems
            .map(
                feedback => `<div class='home-feedbacks-list-row'>
                    <div class='list-col-item-rating'>
                        ${new CircleLabelComponent({ text: feedback.rating, isFilled: true }).render()}</div>
                    <p class='list-col-item-comment'>${feedback.comment || '-'}</p>
                    <p class='list-col-item-browser'>
                        <span>${feedback.computed_browser.Browser}</span>
                        <span>${feedback.computed_browser.Version}</span>
                    </p>
                    <p class='list-col-item-device'>${getDeviceType(feedback.screen.width)}</p>
                    <p class='list-col-item-platform'>${feedback.browser.platform}</p>
                </div>`,
            )
            .join(' ');

        return `<div class='home-feedbacks-list'>
                <div class='home-feedbacks-list-row header'>
                    <p class='list-col-item-rating'>Rating</p>
                    <p class='list-col-item-comment'>Comment</p>
                    <p class='list-col-item-browser'>Browser</p>
                    <p class='list-col-item-device'>Device</p>
                    <p class='list-col-item-platform'>Platform</p>
                </div>
                ${feedbacksDom.length ? feedbacksDom : this.createEmptyContentMessage()}
            </div>`;
    }

    /**
     * It filters the feedback items based on the filter values and return a new filtered array
     * @param {Array} feedbackItems
     * @param {Array} filterItems
     */
    filterFeedbackItems(feedbackItems, filterItems) {
        return feedbackItems.filter((feedback) => {
            let result = false;
            for (const key in filterItems) {
                if (filterItems.hasOwnProperty(key)) {
                    const item = filterItems[key];
                    if (item.isActive && item.filter === feedback.rating) {
                        result = true;
                        break;
                    }
                }
            }

            return result;
        });
    }

    createEmptyContentMessage() {
        return '<span class="home-feedbacks-list-not-found">Nothing Found!</span>';
    }

    /**
     * Render the filter section
     */
    renderFilters() {
        const filters = this.createFilters(this.filtersState);
        document.querySelector(`.${ELEMENTS_CLASSES.TOOLBAR_FILTERS}`).innerHTML = filters;
    }

    /**
     * It handles the filter click event.
     * Whenever user click on any of the filter items,
     * it will filter the list based on the filter value
     * @param {String} text
     */
    handleFilterClick(text) {
        this.filtersState[text].isActive = !this.filtersState[text].isActive;
        const filteredtItems = this.filterFeedbackItems(this.feedbacks, this.filtersState);
        this.renderFilters();
        this.renderFeedbacks(!filteredtItems.length ? this.feedbacks : filteredtItems);
    }

    /**
     * It creates the filter section dom
     */
    createFilters(filtersState) {
        const items = [];
        for (const key in filtersState) {
            if (filtersState.hasOwnProperty(key)) {
                const ele = new CircleLabelComponent({
                    text: filtersState[key].filter,
                    isFilled: filtersState[key].isActive,
                    onLabelClick: text => this.handleFilterClick(text),
                }).render();

                items.push(ele);
            }
        }

        return items.join(' ');
    }

    /**
     * It renders the chart based on user subject.
     * This chart is not re-render based on the feedbacks filters and it always shows the stats
     * for the whole feedback items.
     */
    renderStatsChart() {
        document.querySelector(`.${ELEMENTS_CLASSES.HOME_STATS}`).innerHTML = this.createStatsPieChart();
    }

    /**
     * It creates the chart component
     */
    createStatsPieChart() {
        return new PieChartComponent({
            id: 'comment-types-stat-chart',
            data: this.createChartData(this.feedbacks),
            labels: ['Compliment', 'Suggestion', 'Question', 'Bug'],
            backgrounds: ['#05a5c8', '#ff6384', '#36a2eb', '#c4ced6'],
        }).render();
    }

    /**
     * It creates the dataset for the feedback subjects chart
     */
    createChartData(feedbacks) {
        const commentTypes = {
            compliment: 0,
            suggestion: 0,
            question: 0,
            bug: 0,
        };
        feedbacks.forEach((feedback) => {
            if (feedback.labels.length) {
                const commentTypeProp = (feedback.custom.subject && feedback.custom.subject.toLowerCase()) || '';
                if (commentTypes.hasOwnProperty(commentTypeProp)) {
                    commentTypes[commentTypeProp] += 1;
                }
            }
        });

        return Object.values(commentTypes);
    }
}
