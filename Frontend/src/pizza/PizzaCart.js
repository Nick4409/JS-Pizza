/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../Storage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

var $clearButton = $(".clear-button");
$clearButton.click(function () {
    Cart=[];
    updateCart();
});
var $amountOfElements=$(".amount-of-elements");
var $sum=$(".sum-number");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var exists=-1;
    for(var i=0; i<Cart.length; i++){

        if(Cart[i].pizza.title==pizza.title&&Cart[i].size==size) {
            var exists=i;
            break;
        }
    }
    if(exists>-1) {
        Cart[exists].quantity++;
    }
    else {
        //Приклад реалізації, можна робити будь-яким іншим способом
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }


    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(pizza) {
    var exists=-1;
    alert(size);
    for(var i=0; i<Cart.length; i++){
        if(Cart[i].pizza.title==pizza.title&&Cart[i].size==size) {
            var exists=i;
            break;
        }
    }
    if(exists>-1) {

    }

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    var saved_orders =	Storage.get('cart');
    if(saved_orders)	{
        Cart	=	saved_orders;
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    Storage.set("cart",	Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            cart_item.quantity += 1;
            updateCart();
        });
        $node.find(".minus").click(function(){
            if(cart_item.quantity>1)
                cart_item.quantity -= 1;
            updateCart();
        });
        $node.find(".delete").click(function () {
            for(var i=0; i<Cart.length; i++){
                // alert(Cart[i].pizza.title+" - "+cart_item.pizza.title+"; "+Cart[i].size+" - "+cart_item.size);
                if(Cart[i].pizza.title==cart_item.pizza.title&&Cart[i].size==cart_item.size) {
                    Cart.splice(i, i+1);
                    updateCart();
                    break;
                }
            }
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $amountOfElements.text(Cart.length);
    $sum.text(getSum());
}
function getSum() {
    var sum = 0;

    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].size == "big_size") {
            sum += Cart[i].pizza.big_size.price * Cart[i].quantity;
        }
        else {
            sum += Cart[i].pizza.small_size.price * Cart[i].quantity;
        }
    }

    return sum;
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;