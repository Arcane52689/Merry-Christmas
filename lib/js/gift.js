;(function() {
  var GiftBox = window.GiftBox = {};

  GiftBox.primaryGift = "unopened"

  GiftBox.bindEvents = function() {
    $(".gift-boxes").on("click", "li", function(event) {
      event.preventDefault();
      $li = $(event.currentTarget);
      var boxNumber = $li.data("box");
      if (boxNumber === 1) {
        GiftBox.primaryGift = "opened";
        GiftBox.openGift(1);
      } else {
        if (GiftBox.primaryGift === "unopened") {
          // display 'you can't do that'
        } else {
          GiftBox.openGift(boxNumber);
        }
      }
    })



  }


  GiftBox.openGift = function(boxNumber) {
    GiftBox.activeBox = "#gift-" + boxNumber;
    $(".outer-modal").toggleClass("inactive");
    $(GiftBox.activeBox).toggleClass("inactive");

    $(".close").one("click", function(event) {
      event.preventDefault();
      GiftBox.close();
    })
    $(document).one("keypress keyup keydown", function(event) {
      event.preventDefault();
      if (event.which === 27)  {
        GiftBox.close();
      }
    })

  }


  GiftBox.close = function() {
    if (GiftBox.activeBox) {
      $(GiftBox.activeBox).toggleClass("inactive");
      $(".outer-modal").toggleClass("inactive");
      GiftBox.activeBox = undefined;
    }
  }
}());
