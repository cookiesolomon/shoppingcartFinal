// an array with all of our cart items
var cart = [];
var id = 0;
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
}


var addItem = function (item) {
  // TODO: Write this function. Remember this function has nothing to do with display. 
  // It simply is for adding an item to the cart array, no HTML involved - honest ;-)

  cart.push(item);
}

var clearCart = function () {
  // TODO: Write a function that clears the cart ;-)
  cart.length = 0;
  $('.total').text(0);
  updateCart();
}

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  item = { name: $(this).closest('.card').data().name, price: $(this).closest('.card').data().price, id: id++};
  addItem(item);
  updateCart();
  // $('.shopping-cart').addClass('.show');
});

$('.clear-cart').on('click', function () {
  clearCart();
});

$('.cart-list').on('click', '.remove-item', function(currentItem){
var removeFromArray = $(currentItem).closest('.cart-list');

cart.splice(cart.indexOf(item), 1);
for(i = 0; i< cart.length; i++){
if($(this).closest('li').data().id.val() === cart[i].item.id){

  $(this).closest('li').remove();
}

}
// removeFromArray.remove();
// $(this).prev().remove();
updateCart();
});


// for(i = 0; i < cart.length; i++){
//   cart.splice(cart[i].item, 1);
//   // $(this).closest('li').remove();

// update the cart as soon as the page loads!
updateCart();



//Add a remove button beside each item in the cart and remove that item from the cart when it's clicked. Update the total accordingly.

//Don't allow "duplications" in the cart, but instead tally the number of each item like this: