$(document).ready(function() {
  $('#summonerForm').on('submit', function(e) {
    e.preventDefault();
    $('#result').fadeOut(400);
    var $input = $('input[name="summonerName"]');
    var spincss = {
      'background-image': 'url(img/spinner.gif)',
      'background-position': '97% center',
      'background-repeat': 'no-repeat'
    }
    $input.css(spincss);
    var summoner = $input.val();
    $.post('search', $(this).serialize())
    .done(function(data) {
      $('#result').html(data).fadeIn(400);
    }).fail(function(xhr, status, error) {
      $('#result').html(xhr.responseText).show();
    }).always(function() {
      $input.css('background-image', '');
    });
  });
});
