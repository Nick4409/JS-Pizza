/**
 * Created by chaika on 02.02.16.
 */

    var Templates = require('../Templates');
    var PizzaCart = require('./PizzaCart');

    var api = require('../API');
    var Pizza_List= null;

//HTML едемент куди будуть додаватися піци
    var $pizza_list = $("#pizza_list");


    function showPizzaList(list) {
        //Очищаємо старі піци в кошику
        $pizza_list.html("");

        //Онволення однієї піци
        function showOnePizza(pizza) {
            var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

            var $node = $(html_code);

            $node.find(".buy-big").click(function () {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            });
            $node.find(".buy-small").click(function () {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            });

            $pizza_list.append($node);
        }

        list.forEach(showOnePizza);
    }

    var $allpizza = $(".all");
    var $meatpizza = $(".meat");
    var $pineapllepizza = $(".pineapple");
    var $mushroomspizza = $(".mushroom");
    var $oceanpizza = $(".ocean");
    var $vegapizza = $(".vega");
    $allpizza.click(function () {
        var $previous = $(".element-chosen");
        $previous.removeClass("element-chosen");
        $previous.addClass("element");
        $allpizza.addClass("element-chosen");
        $allpizza.removeClass("element");
        filterPizza("all", $allpizza.text());
    });
    $meatpizza.click(function () {
        var $previous = $(".element-chosen");
        $previous.removeClass("element-chosen");
        $previous.addClass("element");
        $meatpizza.addClass("element-chosen");
        $meatpizza.removeClass("element");
        filterPizza("meat", $meatpizza.text());
    });
    $pineapllepizza.click(function () {
        var $previous = $(".element-chosen");
        $previous.removeClass("element-chosen");
        $previous.addClass("element");
        $pineapllepizza.addClass("element-chosen");
        $pineapllepizza.removeClass("element");
        filterPizza("pineapple", $pineapllepizza.text());
    });
    $mushroomspizza.click(function () {
        var $previous = $(".element-chosen");
        $previous.removeClass("element-chosen");
        $previous.addClass("element");
        $mushroomspizza.addClass("element-chosen");
        $mushroomspizza.removeClass("element");
        filterPizza("mushrooms", $mushroomspizza.text());
    });
    $oceanpizza.click(function () {
        var $previous = $(".element-chosen");
        $previous.removeClass("element-chosen");
        $previous.addClass("element");
        $oceanpizza.addClass("element-chosen");
        $oceanpizza.removeClass("element");
        filterPizza("ocean", $oceanpizza.text());
    });
    $vegapizza.click(function () {
        var $previous = $(".element-chosen");
        $previous.removeClass("element-chosen");
        $previous.addClass("element");
        $vegapizza.addClass("element-chosen");
        $vegapizza.removeClass("element");
        filterPizza("vega", $vegapizza.text());
    });

    function filterPizza(filter, title) {
        var pizza_shown = [];
        var $chosenPizza = $(".chosen-pizza-title");
        var $amountOFChosenPizza = $(".left-row-amount-of-pizza");
        $chosenPizza.text(title);
        var amount = 0;
        Pizza_List.forEach(function (pizza) {

            if (filter == "all") {
                amount++;
                pizza_shown.push(pizza);
            }
            else if (filter == "meat") {
                if (pizza.content.meat || pizza.content.chicken) {
                    amount++;
                    pizza_shown.push(pizza);
                }
            }
            else if (filter == "pineapple") {
                if (pizza.content.pineapple) {
                    amount++;
                    pizza_shown.push(pizza);
                }
            }
            else if (filter == "mushrooms") {
                if (pizza.content.mushroom) {
                    amount++;
                    pizza_shown.push(pizza);
                }
            }
            else if (filter == "ocean") {
                if (pizza.content.ocean) {
                    amount++;
                    pizza_shown.push(pizza);
                }
            }
            else if (filter == "vega") {
                if (!(pizza.content.meat || pizza.content.chicken)) {
                    amount++;
                    pizza_shown.push(pizza);
                }
            }
            $amountOFChosenPizza.text(amount);

            //TODO: зробити фільтри
        });

        //Показати відфільтровані піци
        showPizzaList(pizza_shown);
    }

    function initialiseMenu(pizza_server) {
        Pizza_List=pizza_server;
        showPizzaList(Pizza_List);
    }

    exports.filterPizza = filterPizza;
    exports.initialiseMenu = initialiseMenu;
