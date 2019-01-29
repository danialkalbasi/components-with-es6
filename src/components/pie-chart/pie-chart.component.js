import Chart from 'chart.js';

export default function PieChartComponent(props = { id: '', data: [], labels: [], backgrounds: [] }) {
    function getCanvasSelector() {
        return `#${props.id} canvas`;
    }

    function isCanvasExist() {
        return !!document.querySelector(getCanvasSelector());
    }

    /**
     * It creates the canvas container to draw the chart
     */
    function createContainer() {
        if (!isCanvasExist()) {
            const htmlElement = document.createElement('canvas');
            const containerElement = document.querySelector(`#${props.id}`);
            containerElement.appendChild(htmlElement);
        }
    }

    /**
     * Return the container convas
     */
    function getCanvas() {
        return document.querySelector(getCanvasSelector()).getContext('2d');
    }

    function getChartData() {
        return {
            datasets: [
                {
                    data: props.data,
                    backgroundColor: props.backgrounds,
                },
            ],
            labels: props.labels,
        };
    }

    function createChart() {
        const node = getCanvas();
        const chartElement = new Chart(node, {
            type: 'doughnut',
            data: getChartData(),
            options: {
                responsive: true,
                legend: {
                    position: 'left',
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                },
                tooltips: {
                    titleMarginBottom: 9,
                    xPadding: 9,
                    yPadding: 9,
                    cornerRadius: 4,
                    backgroundColor: 'rgba(88, 88, 88, 0.9)',
                    displayColors: false,
                },
            },
        });

        return chartElement;
    }

    /**
     * We need to render the canvas after the container is created
     */
    function renderChart() {
        setTimeout(() => {
            createContainer();
            createChart();
        }, 300);
    }

    function render() {
        renderChart();

        return `<div id='${props.id}'></div>`;
    }

    return {
        render,
    };
}
