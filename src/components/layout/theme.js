import './theme.scss';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

const ES6TestFunction = () => `Alpine Version ${window.Alpine.version} loaded!`;
console.log(ES6TestFunction());
