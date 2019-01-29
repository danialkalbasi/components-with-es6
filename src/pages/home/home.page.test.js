import HomePage from './home.page';
import { AppServiceStub, FeedbacksServiceStub, HttpMethodsServiceStub } from '../../services/stubs';

describe('HomePage', () => {
    let component;
    let spyOnPageLoaded;
    const feedbacksResponseStub = {
        items: [
            {
                browser: {
                    product: 'Gecko',
                    appCodeName: 'Mozilla',
                    platform: 'MacIntel',
                },
                comment: 'belle offre de services',
                computed_browser: {
                    Browser: 'Chrome',
                    Version: '32.0',
                    Platform: 'MacOSX',
                    FullBrowser: 'Chrome',
                },
                custom: {
                    subject: 'compliment',
                },
                geo: {
                    country: 'FR',
                    region: 'A8',
                    city: 'Paris',
                    lat: 48.8667,
                    lon: 2.3333,
                },
                labels: ['compliment'],
                rating: 5,
                screen: {
                    availWidth: 1440,
                    availHeight: 874,
                    width: 1440,
                    height: 900,
                },
                id: '52efc552b6679cfe6ede406c',
            },
        ],
    };

    beforeAll(() => {
        component = new HomePage();
    });

    beforeEach(() => {
        component.appService = new AppServiceStub();
        component.feedbacksService = new FeedbacksServiceStub();
        component.httpMethodsService = new HttpMethodsServiceStub();
        spyOnPageLoaded = spyOn(component.appService, 'pageLoaded');

        global.document = {
            querySelector: () => ({ innerHTML: '', getContext: () => {} }),
        };
    });

    describe('Init', () => {
        it('should create the page', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });

    describe('createDefaultFiltersData', () => {
        it('should render 5 filters', () => {
            // Act
            const filters = component.createDefaultFiltersData();

            // Assert
            expect(Object.getOwnPropertyNames(filters).length).toBe(5);
        });
    });

    describe('subsribeToPageLoad', () => {
        it('should subscribe to pageLoaded event', () => {
            // Arrange
            spyOnPageLoaded.and.returnValue(() => {});

            // Act
            component.subsribeToPageLoad();

            // Assert
            expect(spyOnPageLoaded).toHaveBeenCalled();
        });
    });

    describe('retrieveFeedbacksAndRender', () => {
        let spyOnFeedbacksList;

        beforeEach(() => {
            spyOnFeedbacksList = spyOn(component.feedbacksService, 'list');
        });

        it('should return the feedbacks list', (done) => {
            // Arrange
            spyOnFeedbacksList.and.returnValue(Promise.resolve(feedbacksResponseStub));

            // Act
            component.retrieveFeedbacksAndRender().then((items) => {
                // Assert
                expect(items).toEqual(feedbacksResponseStub.items);
                done();
            });
        });

        it('should assign the feedbacks list', (done) => {
            // Arrange
            spyOnFeedbacksList.and.returnValue(Promise.resolve(feedbacksResponseStub));

            // Act
            component.retrieveFeedbacksAndRender().then(() => {
                // Assert
                expect(component.feedbacks).toEqual(feedbacksResponseStub.items);
                done();
            });
        });
    });

    describe('createFeedbackList', () => {
        it('should create rating col and its header title', () => {
            // Act
            const renderString = component.createFeedbackList(feedbacksResponseStub.items);
            const numberOfCols = renderString.match(/.list-col-item-rating/g || []).length;

            // Assert
            expect(numberOfCols).toBe(2);
        });

        it('should not create rating col when there is no item', () => {
            // Act
            const renderString = component.createFeedbackList([]);
            const numberOfCols = renderString.match(/.list-col-item-rating/g || []).length;

            // Assert
            expect(numberOfCols).toBe(1);
        });

        it('should create comment col and its header title', () => {
            // Act
            const renderString = component.createFeedbackList(feedbacksResponseStub.items);
            const numberOfCols = renderString.match(/.list-col-item-comment/g || []).length;

            // Assert
            expect(numberOfCols).toBe(2);
        });

        it('should create browser col and its header title', () => {
            // Act
            const renderString = component.createFeedbackList(feedbacksResponseStub.items);
            const numberOfCols = renderString.match(/.list-col-item-browser/g || []).length;

            // Assert
            expect(numberOfCols).toBe(2);
        });

        it('should create device col and its header title', () => {
            // Act
            const renderString = component.createFeedbackList(feedbacksResponseStub.items);
            const numberOfCols = renderString.match(/.list-col-item-device/g || []).length;

            // Assert
            expect(numberOfCols).toBe(2);
        });

        it('should create platform col and its header title', () => {
            // Act
            const renderString = component.createFeedbackList(feedbacksResponseStub.items);
            const numberOfCols = renderString.match(/.list-col-item-platform/g || []).length;

            // Assert
            expect(numberOfCols).toBe(2);
        });

        it('should create not found message when there is no items', () => {
            // Act
            const renderString = component.createFeedbackList([]);
            const numberOfCols = renderString.match(/.home-feedbacks-list-not-found/g || []).length;

            // Assert
            expect(numberOfCols).toBe(1);
        });
    });
});
