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

/////////////////////////////////CART PART////////////////////////////////////////////////////////

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();



// ////end of selected items/////

var cartBtn = document.querySelector('.cart-btn');
var overlay = document.querySelector('.overlay');
var cartDiv = document.querySelector('.cart');
var closeCart = document.querySelector('.close-btn');
var addItemBtn = document.getElementById('open');
var respCartBtn = document.getElementById('resp-add-item-btn');


cartBtn.addEventListener('click', () => {
    overlay.classList.toggle('visibility');
    cartDiv.classList.toggle('visibility2');
});

closeCart.addEventListener('click', () => {
    overlay.classList.toggle('visibility');
    cartDiv.classList.toggle('visibility2');
});


// .addEventListener('click', () => {
//     overlay.classList.toggle('visibility');
//     cartDiv.classList.toggle('visibility2');

// });

addItemBtn.addEventListener('click', () => {
    overlay.classList.toggle('visibility');
    cartDiv.classList.toggle('visibility2');

});

respCartBtn.addEventListener('click', () => {
    overlay.classList.toggle('visibility');
    cartDiv.classList.toggle('visibility2');

});

///////////search/////////////

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;



        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

input = document.getElementById("myInput");
input.addEventListener('keyup', () => {
    if (document.querySelector('.input-data').value.length > 0) {
        document.querySelector('.ul-data').classList.remove('block');
    } if (document.querySelector('.input-data').value.length === 0) {
        document.querySelector('.ul-data').classList.add('block');
    };
});


document.querySelector('.input-data2').addEventListener('keyup', () => {
    if (document.querySelector('.input-data2').value.length > 0) {
        document.querySelector('.ul-data2').classList.remove('block');
    } if (document.querySelector('.input-data2').value.length === 0) {
        document.querySelector('.ul-data2').classList.add('block');
    };
});

///////////////SEARCH BAR///////////////////
document.querySelector('.search-button').addEventListener('click', () => {
    // document.querySelector('.search-product-full-screen').style.display = 'block';
    input.classList.toggle('block2');
    // document.getElementById('myUL').classList.toggle('display-some');
    if (input.classList.contains('block2') === false) {
        document.getElementById('myUL').classList.add('display-some');
    } else {
        document.getElementById('myUL').classList.remove('display-some');
    }
});


////switcer///////////
var imgWrapper = document.querySelector('.single-img');
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
console.log(imgWrapper, img1, img2, img3);

img1.addEventListener('click', () => {
    imgWrapper.style.backgroundImage = "url('glosses/peach-and-clear-glosses.jpg')";
});

img2.addEventListener('click', () => {
    imgWrapper.style.backgroundImage = "url('glosses/slider-img1.jpg')";
});

img3.addEventListener('click', () => {
    imgWrapper.style.backgroundImage = "url('glosses/slider-img3.jpg')";
});

