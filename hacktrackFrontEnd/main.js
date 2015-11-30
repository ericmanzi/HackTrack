$(document).ready(function() {
 	var owl = $("#owl-demo");
  	owl.owlCarousel({
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      navigation : true
 
  });
  $(".next").click(function(){
  	console.log("show next");
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
 console.log(owl);
});