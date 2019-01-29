import './search-box.component.scss';
import icon from './search-icon.png';

export default function SearchBoxComponent(props = { onTextChange: () => {}, placeholder: '' }) {
    /**
     * Handle input text change
     */
    function handleTextChange(text) {
        if (props.onTextChange) {
            props.onTextChange(text);
        }
    }

    /**
     * Attach input listener
     */
    function attachInputListener() {
        document
            .querySelector('#search-input')
            .addEventListener('input', input => handleTextChange(input.target.value));
    }

    /**
     * Initialize the search box component
     */
    (function init() {
        setTimeout(() => {
            attachInputListener();
        }, 500);
    }());

    function render() {
        return `
        <div class='search-box-container'>
            <input placeholder='${props.placeholder}' class='search-box' id='search-input' type='text' />
            <img src='${icon}' />
        </div>`;
    }

    return {
        render,
        attachInputListener,
        handleTextChange,
    };
}
