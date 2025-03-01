//drawer-initiator.js
const DrawerInitiator = {
  init({ button, drawer, content }) {
    if (!button || !drawer || !content) {
      console.error('Drawer elements are missing');
      return;
    }

    button.addEventListener('click', (event) => {
      drawer.classList.toggle('open');
      event.stopPropagation();
    });

    content.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  },
};

export default DrawerInitiator;
