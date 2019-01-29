import CircleLabelComponent from './circle-label.component';

describe('CircleLabelComponent', () => {
    let component;

    beforeEach(() => {
        global.document = {
            querySelector: () => ({ addEventListener: () => {} }),
        };
        component = CircleLabelComponent({ text: '4', isFilled: false, onLabelClick: () => {} });
    });

    describe('render', () => {
        it('should render the text prop', () => {
            // Act
            const renderString = component.render();
            const hasFound = renderString.search('4') > 0;

            // Assert
            expect(hasFound).toBeTruthy();
        });

        it('should render default title if there is no text', () => {
            // Act
            const renderString = component.render();
            const hasFound = renderString.search('-') > 0;

            // Assert
            expect(hasFound).toBeTruthy();
        });
    });

    describe('createElementID', () => {
        it('should include the circle-label class name always', () => {
            // Act
            const idString = component.createElementID();
            const hasFound = idString.includes('circle-label') > 0;

            // Assert
            expect(hasFound).toBeTruthy();
        });
    });
});
