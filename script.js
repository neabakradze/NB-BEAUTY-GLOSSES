///////////////////////////SIDE BAR//////////////////////////////
const navBurger = document.querySelector('.nav-bar');
const closeIcon = document.querySelector('.close-bar')
//  opening and closing the bar from the burger
navBurger.addEventListener('click', function () {
    document.querySelector('.resp-header').classList.toggle('side-bar');
    navBurger.style.display = 'none';
});
document.querySelector('.second-box').addEventListener('click', function () {
    document.querySelector('.resp-header').classList.toggle('side-bar');
    navBurger.style.display = 'block';
    navBurger.classList.add('fade-click');
});
//  closing the bar from the side bar itself
document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.resp-header').classList.remove('side-bar');
    navBurger.style.display = 'block';
    navBurger.classList.add('display-block-none')
});

///////////////SEARCH BAR///////////////////
document.querySelector('.search-button').addEventListener('click', () => {
    // document.querySelector('.search-product-full-screen').style.display = 'block';
    document.querySelector('.search-product-full-screen').classList.toggle('display-block-search-bar');
});

///////////product drop down bar////////////////
document.querySelector('.drop-down').addEventListener('click', () => {
    // document.querySelector('.search-product-full-screen').style.display = 'block';
    document.querySelector('.dropdown-bar').classList.toggle('display');
});
// document.querySelector('.arrow').addEventListener('click', () => {
//     // document.querySelector('.search-product-full-screen').style.display = 'block';
//     document.querySelector('.dropdown-bar').classList.toggle('display');
// });
document.getElementById('product-drop-bar').addEventListener('click', () => {
    document.querySelector('.resp-drop').classList.toggle('display');

});