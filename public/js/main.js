$(document).ready(function() {
  $('#summonerForm').on('submit', function(e) {
    e.preventDefault();
    var $input = $('input[name="summonerName"]');
    var spincss = {
      'background-image': 'url(img/spinner.gif)',
      'background-position': '250px center',
      'background-repeat': 'no-repeat'
    }
    $input.css(spincss);
    var summoner = $input.val();
    $.post('search', $(this).serialize())
    .done(function(data) {
      $('#result').html(data);
    }).fail(function(xhr, status, error) {
      $('#result').html(xhr.responseText);
    }).always(function() {
      $input.css('background-image', '');
    });
  });
});
