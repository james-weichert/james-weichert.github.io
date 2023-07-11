
console.log("HERE");

document.body.style.setProperty('--scroll', 0);

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight));
  }, false);