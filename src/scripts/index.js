//index.js
import 'regenerator-runtime';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/footer.css';
import '../styles/dashboard/dashboard.css';
import App from './view/app';

const app = new App({
  button: document.querySelector('#menu-toggle'),
  drawer: document.querySelector('.navbar'),
  content: document.querySelector('#mainContent'),
  appBar: document.querySelector('.header'),
  footer: document.querySelector('footer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
