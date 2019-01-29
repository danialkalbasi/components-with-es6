import './circle-label.component.scss';

export default function CircleLabelComponent(props = { text: '', isFilled: true, onLabelClick: () => {} }) {
    /**
     * Keeps the unique element id
     */
    let eleId = '';

    /**
     * Create a unique element id.
     * This is not a bulletproof solution,
     * specially when there are many of these components get generated
     */
    function createElementID() {
        return `circle-label-${props.text}-${Math.floor(Math.random() * 10)}`;
    }

    /**
     * Create set of class names based on the prop values
     */
    function createClassNames() {
        let classString = 'circle-label';
        classString += props.isFilled ? ' filled' : '';
        classString += props.onLabelClick ? ' clickable' : '';

        return classString;
    }

    function attachClickListener() {
        const ele = document.querySelector(`#${eleId}`);
        if (ele) {
            document.querySelector(`#${eleId}`).addEventListener('click', () => props.onLabelClick(props.text));
        }
    }

    /**
     * Initialize the component
     * Subscribing to the circle click event
     */
    (function init() {
        eleId = createElementID();

        if (props.onLabelClick) {
            setTimeout(() => {
                attachClickListener();
            }, 5);
        }
    }());

    /**
     * Render the circle label component
     */
    function render() {
        return `<div id='${eleId}' class='${createClassNames()}'>
            ${props.text || '-'}
        </div>`;
    }

    return {
        render,
        createElementID,
        createClassNames,
        attachClickListener,
    };
}
