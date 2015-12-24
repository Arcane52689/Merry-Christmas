;(function() {
  var GiftBox = window.GiftBox = {};

  GiftBox.primaryGift = "unopened"



  GiftBox.bindStart = function () {

    $(".start").on("click", function(event) {
      $(".outer-modal").toggleClass('inactive');
      $("#elf").toggleClass('inactive');
      $("#welcome").toggleClass("inactive");
      GiftBox.spinTheElf(function() {
        $("#selection").toggleClass("inactive");
        $("#elf").toggleClass('inactive');
        $(".outer-modal").toggleClass('inactive');
        GiftBox.bindSelect()

      });

    })
  }

  GiftBox.spinTheElf = function(callback) {
    $("#elf").one("transitionend", function(event) {
      callback && callback();
    })
    setTimeout(function() { $("#elf").toggleClass("spun"); })

  }

  GiftBox.moveTheReindeer = function(callback) {
    $("#reindeer").one("transitionend", function() {
      callback && callback();
    })
    $("#reindeer").toggleClass("moved")
  }


  GiftBox.bindSelect = function() {
    $(".choose-person").on("click", "li", function(event) {
      event.preventDefault();
      GiftBox.selectedPerson = $(event.currentTarget).data('name');
      $("#selection").toggleClass("inactive");
      GiftBox.moveTheReindeer(function() {
        $("#gifts").toggleClass("inactive");
        $("#"+GiftBox.selectedPerson).toggleClass("inactive");
        GiftBox.bindGifts();
    })
    })
  }



  GiftBox.bindGifts = function() {
    $("#greeting").html("Merry Christmas " + GiftBox.selectedPerson);
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

    GiftBox.user = "kelsey"



  }


  GiftBox.openGift = function(boxNumber) {
    GiftBox.activeBox = "#" + GiftBox.selectedPerson + "-" + boxNumber;
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
