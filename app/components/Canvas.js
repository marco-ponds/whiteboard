import React from 'react';
import './canvas.scss';
import {HEIGHT, TOOLS, WIDTH} from './constants';
import CanvasContext, {BASE_RUBBER_COLOR, BASE_SIZE} from './lib/CanvasContext';

const RUBBER_COLOR = { key: BASE_RUBBER_COLOR };
const RUBBER_SIZE = { key: BASE_SIZE };

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.pressing = false;
    this.dot_flag = false;

    this.previous = {
      x: 0,
      y: 0
    };

    this.current = {
      x: 0,
      y: 0
    };

    this.start = {
      x: 0,
      y: 0
    };

    this.canvas = null;
    this.autosave = null;

    this.state = {
      height: document.body.clientHeight,
      width: document.body.clientWidth,
      deleting: false
    }
  }

  componentDidUpdate(prevProps) {
    const { text, tool, color, size, user } = this.props;
    if (text.content && tool === TOOLS.TEXT) {
        this.drawText(text, color, size);
    }
    const { room } = user;

    if (room !== prevProps.user.room) {
      // we changed hash
      CanvasContext.clearAll();
      CanvasContext.restore(room);
    }
  }

  componentDidMount() {
    const { user } = this.props;
    const { room } = user;

    console.log(room);

    window.addEventListener('resize', this.handleResize, false);
    this.autosave = setInterval(this.save, 5000);
    CanvasContext.restore(room);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.autosave);
  }

  save = () => {
    // create blob from canvas and send it to be
    const { onSave } = this.props;

    CanvasContext.toBlob(onSave);
  }


  handleResize = () => {
    this.setState({
      height: document.body.clientHeight,
      width: document.body.clientWidth
    });
  }

  getMousePos = (evt) => {
    const rect = this.canvas.getBoundingClientRect(), // abs. size of element
        scaleX = this.canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = this.canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

  updatePositions = (mouse) => {
    this.previous.x = this.current.x;
    this.previous.y = this.current.y;

    this.current.x = mouse.x;
    this.current.y = mouse.y;
  }

  handleDotDrawing = (color, size) => {
    this.dot_flag = true;
    if (this.dot_flag) {
      CanvasContext.drawDot(this.current, color, size);
    }
  }

  handleMouseOut = () => {
    this.pressing = false;
  }

  handleMouseDown = (e) => {
    const { tool, color, size, onTextStart } = this.props;
    const mouse = this.getMousePos(e);
    this.updatePositions(mouse);
    this.pressing = true;

    // this is for free drawing
    switch (tool) {
      case TOOLS.DRAW:
        this.handleDotDrawing(color, size);
        break;
      case TOOLS.RUBBER:
        this.handleDotDrawing(RUBBER_COLOR, RUBBER_SIZE);
        this.onDeleteStart();
        break;
      case TOOLS.SQUARE:
      case TOOLS.CIRCLE:
      case TOOLS.LINE:
        this.start = mouse;
        break;
      case TOOLS.TEXT:
        onTextStart(mouse);
        break;
      default:
        break;
    }
  }

  handleMouseUp = (e) => {
    const { tool, color, size } = this.props;
    const mouse = this.getMousePos(e);

    switch(tool) {
      case TOOLS.SQUARE:
        this.pressing && this.drawRect(this.start, mouse, color, size);
        break;
      case TOOLS.CIRCLE:
        this.pressing && this.drawCircle(this.start, mouse, color, size);
        break;
      case TOOLS.LINE:
        this.pressing && this.drawLine(this.start, mouse, color, size);
        break;
      case TOOLS.RUBBER:
        this.onDeleteEnd();
        break;
      default:
        break;
    }

    this.pressing = false;
  }

  handleMouseMove = (e) => {
    const { tool, color, size } = this.props;
    const mouse = this.getMousePos(e);
    this.updatePositions(mouse);

    switch(tool) {
      case TOOLS.DRAW:
        this.pressing && this.drawLine(this.previous, this.current, color, size, true);
        break;
      case TOOLS.RUBBER:
        this.pressing && this.drawLine(this.previous, this.current, RUBBER_COLOR, RUBBER_SIZE, true);
        break;
      default:
        break;
    }
  }

  onDeleteStart = () => {
    this.setState({ deleting: true });
  }

  onDeleteEnd = () => {
    this.setState({ deleting: false });
  }

  drawLine = (_start, _stop, color, size, skipGrid) => {
      const { onDrawLine, grid } = this.props;
      let start = _start;
      let stop = _stop;

      if (!skipGrid) {
        start = CanvasContext.convertPositionToGrid(_start, grid);
        stop = CanvasContext.convertPositionToGrid(_stop, grid);
      }

      CanvasContext.drawLine(start, stop, color, size);

      onDrawLine({ start, stop, color, size });
  }

  drawRect = (_start, _stop, color, size) => {
    const { onDrawSquare, grid } = this.props;

    const start = CanvasContext.convertPositionToGrid(_start, grid);
    const stop = CanvasContext.convertPositionToGrid(_stop, grid);

    CanvasContext.drawSquare(start, stop, color, size);
    onDrawSquare({ start, stop, color, size });
  }

  drawCircle = (_start, _stop, color, size) => {
    const { onDrawCircle, grid } = this.props;

    const start = CanvasContext.convertPositionToGrid(_start, grid);
    const stop = CanvasContext.convertPositionToGrid(_stop, grid);

    CanvasContext.drawCircle(start, stop, color, size);
    onDrawCircle({ start, stop, color, size });
  }

  drawText = (_text, color, size) => {
    const { onTextDone, onDrawText, grid } = this.props;
    const text = {
      ..._text,
      position: CanvasContext.convertPositionToGrid(_text.position, grid)
    };

    CanvasContext.drawText(text, color, size);

    onTextDone();
    onDrawText({ text, color, size });
  }

  handleRef = (element) => {
      this.canvas = element;

      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        CanvasContext.start(this.canvas, this.ctx, HEIGHT, WIDTH);

        this.handleResize();
      }
  }
  
  render() {
    const deleting = this.state.deleting ? 'deleting' : '';
    return (
      <canvas
        className={`canvas board ${deleting}`}
        height={HEIGHT}
        width={WIDTH}
        ref={this.handleRef}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseOut={this.handleMouseOut} />)
  }
}
  
export default Canvas;