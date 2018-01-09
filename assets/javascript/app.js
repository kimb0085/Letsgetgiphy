//let's add some buttons
$(function(){
  createButtons(topics, 'searchButton', '#buttonsGoHere');
  //console.log('page loaded');
});

//create topics/classes
var topics = ['Will and Grace', 'Friends', 'Home Improvement', 'TGIF', 'Spice Girls'];

function createButtons(topics,addClass,addClassTo){
  $(addClassTo).empty();
  for (var i = 0; i < topics.length; i++) {
    var j = $('<button>');
    j.addClass(addClass);
    j.attr('data-type', topics[i]);
    j.text(topics[i]);
    $(addClassTo).append(j);
  }
}

//create giphs!
$(document).on('click', '.searchButton', function(){
  $('#searches').empty();
  var type = $(this).data('type');
  // console.log('type');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=nGF9msfxWrGwjWpL80N5ar95n9BcdLEB&limit=10";
  $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done(function(response){
      for (var i = 0; i < data.length; i++) {
        var searchDiv = $('<div class="search-item">')
        var rating = response.data[i].rating;
        var p = $('<p>').text('Gif Rating Is: ' + rating);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr('src', still);
        image.attr('data-still', still);
        image.attr('data-animated', animated);
        image.attr('data-state', still);
        image.addClass('searchImage');
        searchDiv.append(p);
        searchDiv.append(image);
        $('#searches').append(searchDiv);
      }
    });

    $(document).on('click', function(){
      var state = $(this).attr('data-state');
      if(state === still) {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state' 'animated');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state' 'still');
      }
    });

    $('#searchButton').on('click', function(){
      var newSearch = $('input').eq(0).val();
      topics.push(newSearch);
      createButtons(topics, 'searchButton', '#buttonsGoHere');
      return false;
    });
});