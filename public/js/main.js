$(document).ready(function() {
  $('#summonerForm').on('submit', function(e) {
    e.preventDefault();
    $('#result').html('<img id="spinner" src="img/spinner.gif">');
    var summoner = $('input[name="summonerName"]').val();
    $.post('search', $(this).serialize())
    .done(function(data) {
      $('#result').html(data);
    }).fail(function(xhr, status, error) {
      $('#result').html(xhr.responseText);
    }).always(function() {
      $('#spinner').remove();
    });
  });
});
