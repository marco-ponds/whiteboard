export const COLORS = [
    {  key: '#3498db', name: 'peter river' },
    {  key: '#34495e', name: 'wet asphalt' },
    {  key: '#16a085', name: 'green sea' },
    {  key: '#27ae60', name: 'nephritis' },
    {  key: '#2980b9', name: 'belize hole' },
    {  key: '#8e44ad', name: 'wisteria' },
    {  key: '#f1c40f', name: 'sunflower' },
    {  key: '#e67e22', name: 'carrot' },
    {  key: '#c0392b', name: 'pomegranate' },
    {  key: '#bdc3c7', name: 'silver' },
    {  key: '#7f8c8d', name: 'asbestos' }
];

export const SIZES = [
    {  key: '2', name: '2pt' },
    {  key: '4', name: '4pt' },
    {  key: '6', name: '6pt' },
    {  key: '8', name: '8pt' },
    {  key: '10', name: '16pt' },
    {  key: '12', name: '32pt' },
    {  key: '14', name: '64pt' },
];

export const TOOLS = {
    DRAW: 'draw',
    TEXT: 'text',
    SQUARE: 'square',
    CIRCLE: 'circle',
    LINE: 'line',
    ARROW: 'arrow'
};

export const TOOLS_ICONS = {
    DRAW: 'edit',
    TEXT: 'font-size',
    SQUARE: 'border-outer',
    CIRCLE: 'minus-circle',
    LINE: 'stock',
    ARROW: 'arrow-right'
};

export const SOCKET_EVENTS = {
    NEW: 'new',
    DRAW: 'draw',
    TEXT: 'text',
    SQUARE: 'square',
    CIRCLE: 'circle',
    LINE: 'line',
    ARROW: 'arrow',
    DISCONNECT: 'user_disconnect'
};

export const getRandomColor = () => ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);