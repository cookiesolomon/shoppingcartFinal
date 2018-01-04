// an array with all of our cart items
var STORAGE_ID = 'shoppingcart';

var saveToLocalStorage = function () {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
}
var getFromLocalStorage = function () {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

var cart = getFromLocalStorage();
var id = 0;

var _findPostById = function (id) {
  for (var i = 0; i < cart.length; i += 1) {
    if (cart[i].id === id) {
      return cart[i];
    }
  }
}

var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $('.cart-list').empty();
  var totalPrice = 0;
  var source = $('#cart-template').html();
  var template = Handlebars.compile(source);

  for (i = 0; i < cart.length; i++) {


    var newHTML = template(cart[i]);

    $('.cart-list').append(newHTML);
    $('.cart-list').append('<button class ="remove-item" name="remove" type="button">remove item</button>');

    // $('.cart-list').append("<ul class='list-of-items'><li>" + cart[i].name + " - $" + cart[i].price + "</li></ul>");

    var itemCost = cart[i].price;
    totalPrice += itemCost;
    $('.total').text(totalPrice);
  }

  saveToLocalStorage();
}

var addItem = function (item) {
  // TODO: Write this function. Remember this function has nothing to do with display. 
  // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
  duplicateItems(item)
  cart.push(item);
  saveToLocalStorage();
}

var clearCart = function () {
  // TODO: Write a function that clears the cart ;-)
  cart.length = 0;
  $('.total').text(0);
  updateCart();
  saveToLocalStorage();
}

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  item = { name: $(this).closest('.card').data().name, price: $(this).closest('.card').data().price, id: id++, quantity: 1 };
  addItem(item);
  updateCart();
  // $('.shopping-cart').addClass('.show');
});

$('.clear-cart').on('click', function () {
  clearCart();
});

$('.cart-list').on('click', '.remove-item', function (currentItem) {
  var removeFromArray = $(this).closest('.cart-list').find('.new-item');
  var id = removeFromArray.data().id;

  var item = _findPostById(id);

  cart.splice(cart.indexOf(item), 1);
  removeFromArray.remove();
  // $(this).closest('li').remove();
  updateCart();

});

var duplicateItems = function (item) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === item.name) {
      cart[i].quantity++;
    }
    
  }
  
}

updateCart();




