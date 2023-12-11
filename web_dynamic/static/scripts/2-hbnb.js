$(document).ready(function () {
  const amenities = {};

  // Checkbox change event listener
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    updateAmenities();
  });

  // Request API status
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
    error: function () {
      $('#api_status').removeClass('available');
    }
  });

  // Function to update the list of selected amenities
  function updateAmenities() {
    const amenityNames = Object.values(amenities);
    $('.amenities h4').text(amenityNames.join(', '));
  }
});
