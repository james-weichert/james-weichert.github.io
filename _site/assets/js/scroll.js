function smoothScroll(elem){
            document.querySelector('#' + elem).scrollIntoView({
                behavior: 'smooth'
            });
        }