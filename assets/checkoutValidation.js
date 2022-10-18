$(document).ready(function() {
  var checkoutButtons = $("#checkout");
  checkoutButtons.addClass("disabled-checkout");

  var additionalCheckoutButtons = $("#additional-checkouts");
  additionalCheckoutButtons.addClass("disabled-checkout");
});

$(window).on("load", function() {
  var checkoutButtons = $("#checkout");
  var additionalCheckoutButtons = $("#additional-checkouts");
  
  checkoutButtons.removeClass("disabled-checkout");
  additionalCheckoutButtons.removeClass("disabled-checkout");

  function runValidation() {
    var checkoutButtons = $("#checkout");
    var additionalCheckoutButtons = $("#additional-checkouts");
    checkoutButtons.removeClass("diabled-checkout");
    additionalCheckoutButtons.removeClass("disabled-checkout");

    var kombuchaCount = 0;
    var bottleDepositCount= 0;
    var bottleDepositVariantId = "42979635560699";
    var kombuchaKitVariantId = "42979635527931";
    var containsKombucha = false;
    var bottleDepositTotal = 0;
    var bottleDepositError = "Bottle deposit charges are missing";

    $(".cart-row").each(function( index ){
      var productType = $(this).data("product-type");
      var productId = $(this).data("product-id");
      var count = $(this).data("qty");

      if(productType == "Kombucha" && productId != bottleDepositVariantId && productId != kombuchaKitVariantId){
        kombuchaCount = kombuchaCount + parseInt(count);
      }

      if(productId == bottleDepositVariantId) {
        bottleDepositCount = bottleDepositCount + parseInt(count);
      }
    });

    bottleDepositTotal = bottleDepositCount * 300

    if (bottleDepositCount != kombuchaCount) {

      var items = {
        42979635560699: kombuchaCount
      };

      var params = {
        type: 'POST',
        url: '/cart/update.js',
        data: { updates: items },
        dataType: 'json',
        success: function(stuff) { 
          window.location.href = '/cart';
        }
      };
      $.ajax(params);

    }

    if (bottleDepositCount != kombuchaCount) {
      checkoutButtons.addClass("disabled-checkout");
    }

  }

  var quantityInput = $(".quantity__input");
  quantityInput.on('change', function() {
    setTimeout(function () {
      location.reload()
    }, 500);
    
  });

  $('#remove_button').on('click', function() {
    setTimeout(function () {
      location.reload()
    }, 500);
  });

  runValidation();

})