/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
   
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    var api = require('./API');
    api.getPizzaList(function (err, pizza_list) {
        if(err) { return console.error(err); }
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    });
    $make_order=$(".submit-btn");
    $make_order.click(function () {
        location.href = '/order.html';

    });
});