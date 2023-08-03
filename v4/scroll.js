
console.log("HERE");

document.body.style.setProperty('--scroll', 0);

var prev_scroll = 0

window.addEventListener('scroll', () => {
   
    console.log(window.scrollY);

    var new_scroll = (window.scrollY / (document.body.offsetHeight - window.innerHeight)).toFixed(5);

    /*if (Math.abs(new_scroll - prev_scroll) > 0.01) {
      
        document.body.style.setProperty('--scroll', new_scroll);
    } */

    document.body.style.setProperty('--scroll', new_scroll);

    prev_scroll = new_scroll

  }, false);

