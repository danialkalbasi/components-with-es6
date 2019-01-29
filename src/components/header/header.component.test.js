import HeaderComponent from './header.component';

describe('HeaderComponent', () => {
    let headerComponent;

    beforeEach(() => {
        headerComponent = HeaderComponent({ title: 'Dashboard' });
    });

    describe('render', () => {
        it('should render the title prop', () => {
            // Act
            const renderString = headerComponent.render();
            const hasFound = renderString.search('Dashboard') > 0;

            // Assert
            expect(hasFound).toBeTruthy();
        });

        it('should render default title if there is no title', () => {
            // Act
            const renderString = HeaderComponent().render();
            const hasFound = renderString.search('Page Title') > 0;

            // Assert
            expect(hasFound).toBeTruthy();
        });
    });
});
