const navBurger = document.querySelector('.nav-bar');
const closeIcon = document.querySelector('.close-bar')
//  opening and closing the bar from the burger
navBurger.addEventListener('click', function () {
    document.querySelector('.resp-header').classList.toggle('side-bar');
    navBurger.src = 'glosses/close-button.svg';
    // closeIcon.style.display = 'block';
    // navBurger.style.display = 'none';

    if (document.querySelector('.resp-header').classList.contains('side-bar') === false) {
        navBurger.src = 'glosses/Untitled-2.svg';
    }
});
// closeIcon.addEventListener('click', () => {
//     document.querySelector('.resp-header').classList.remove('side-bar');
//     document.querySelector('.resp-header').classList.add('unscroll');
//     closeIcon.style.display = 'none';
//     navBurger.style.display = 'block';

// });
//  closing the bar from the side bar itself
document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.resp-header').classList.remove('side-bar');
});
