$(document).ready(function() {
  $('#region').on('click', function(e) {
    $('#options').toggle();
  });
  $('.option').on('click', function() {
    $('#region').text($(this).text());
    $('#options').hide();
  });
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
    var post = $(this).serialize() + '&region=' + $('#region').text().toLowerCase();
    $.post('search', post)
    .done(function(data) {
      $('#result').html(data);
      $('#summoner').hide();
      $('#result table').hide();
      $('#result').show(0, function() {
        $('#summoner').fadeIn(400, function() {
          $('#result table').fadeIn(400);
        });
      });
    }).fail(function(xhr, status, error) {
      $('#result').html(xhr.responseText).show();
    }).always(function() {
      $input.css('background-image', '');
    });
  });
});
