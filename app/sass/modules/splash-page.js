function splashPage() {
  if (sessionStorage.getItem('splash-page') == null){
    setTimeout(() => { dispHome(); }, 4000);
    sessionStorage.setItem('splash-page', 'false');
  } else{
    dispHome();
  }
}

function dispHome() {
  document.getElementById('splash-page').style.display = "none";
  document.getElementById('main').style.zIndex = -1;
  document.getElementById('main').style.background = "none";
  document.getElementById('home').style.display = "block";
}