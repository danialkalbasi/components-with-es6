import './index.scss';
import { HomePage } from './pages';
import { AppService } from './services';

/**
 * Instantiate the Home page and AppService
 */
const homePage = new HomePage();
const appService = new AppService();

/**
 * This function will notify the subscribers (pages) that dom is ready for manipulation
 */
appService.triggerWhenContentLoaded();

/**
 * Attach the component/page to the root dom
 */
document.getElementById('root').innerHTML = homePage.render();
