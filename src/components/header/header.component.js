import './header.component.scss';
import logo from './dashboard-icon.png';

export default function HeaderComponent(props = { title: '' }) {
    function render() {
        return `
            <div class='header'>
                <img src='${logo}' /> ${props.title || 'Page Title'}
            </div>
        `;
    }

    return {
        render,
    };
}
