const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.sidenav');

menuIcon.addEventListener('click', () => {
  if (navbar.classList.toggle('active')) {
    navbar.style.width = '300px';
  } else {
    navbar.style.width = '0';
  }
})