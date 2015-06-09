$(document).ready(function() {
  if (location.hash) {
    hashSearch();
  }

  $(window).on('hashchange', function() {
    hashSearch();
  });

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
    var summoner = $('input[name="summonerName"]').val();
    var region = $('#region').text().toLowerCase();
    location.hash = region + ':' + summoner;
  });

  function hashSearch() {
    var params = location.hash.replace('#', '').split(':');
    $('#region').text(params[0].toUpperCase());
    $('input[name="summonerName"]').val(params[1]);
    getData(params[0].toLowerCase(), params[1]);
  }

  function getData(region, summoner) {
    var $input = $('input[name="summonerName"]');
    var spincss = {
      'background-image': 'url(img/spinner.gif)',
      'background-position': '97% center',
      'background-repeat': 'no-repeat'
    }
    $input.css(spincss);

    post = 'region=' + region + '&summonerName=' + summoner;
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
      hash = '#' + region + ':' + summoner;
      $link = $('<a>').attr('href', hash).text('Permalink');
      $('#summoner h1').after($link);
      $('#killTable').tablesorter();
    }).fail(function(xhr, status, error) {
      $('#result').html(xhr.responseText).show();
    }).always(function() {
      $('input[name="summonerName"]').css('background-image', '');
    });
  }

});
