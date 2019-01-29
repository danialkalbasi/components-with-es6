import FeedbacksService from './feedbacks.service';
import { HttpMethodsServiceStub } from './stubs';

describe('FeedbacksService', () => {
    let service;

    beforeEach(() => {
        const http = new HttpMethodsServiceStub();
        service = new FeedbacksService(http);
    });

    describe('list', () => {
        it('should call the http methods service get', () => {
            // Arrange
            const spyOnGet = spyOn(service.httpMethodsService, 'get').and.returnValue(Promise.resolve());

            // Act
            // Assert
            service.list().then(() => {
                expect(spyOnGet).toHaveBeenCalled();
            });
        });

        it('should return promise', () => {
            // Arrange
            spyOn(service.httpMethodsService, 'get').and.returnValue(Promise.resolve());

            // Act
            const returnType = service.list();

            // Assert
            expect(returnType instanceof Promise).toBeTruthy();
        });

        it('should return the get url for the first argument', () => {
            // Arrange
            const spyOnGet = spyOn(service.httpMethodsService, 'get').and.returnValue(Promise.resolve());

            // Act
            service.list();
            const [url, isCache] = spyOnGet.calls.allArgs()[0];

            // Assert
            expect(url).toBe('https://static.usabilla.com/recruitment/apidemo.json');
            expect(isCache).toBeTruthy();
        });
    });
});
