const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.sidenav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('hamburger-menu--active')
  navbar.classList.toggle('sidenav--active')
})