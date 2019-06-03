import React from 'react';
import {WIDTH, HEIGHT} from './constants';

class Grid extends React.Component {

    drawGrid = () => {
        const { gridSize } = this.props;

        this.ctx.beginPath();
        this.ctx.setLineDash([5, 10]);
        // this only works because it's a square
        for (let step = 0; step < WIDTH; step += gridSize ) {
            this.ctx.moveTo(step, 0);
            this.ctx.lineTo(step, HEIGHT);
            this.ctx.moveTo(0, step);
            this.ctx.lineTo(WIDTH, step);
        }

        this.ctx.strokeStyle = '#bbb';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    componentDidMount() {
        this.drawGrid();
    }

    handleRef = (element) => {
        this.canvas = element;
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
    }

    render() {
        return (
            <canvas
                className='canvas grid'
                height={HEIGHT}
                width={WIDTH}
                ref={this.handleRef} />)
    }
}

export default Grid;