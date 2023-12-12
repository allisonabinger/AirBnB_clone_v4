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

  $('button').on('click', function() {
    const data = {
      amenities: Object.keys(amenities)
    };
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: function (data) {
        const placesSection = $('.places');
        placesSection.empty(); // Clear the places section
        data.forEach(place => {
          const article = document.createElement('article');
          article.innerHTML = `
              <!-- Your place details here -->
              <h2>${place.name}</h2>
              <p>${place.description}</p>
          `;
          placesSection.append(article);
        });
      }
    })
    console.log('Button clicked!');
    // Add your code here
});

  // Request API status
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
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

  // Request places from the API
  fetch('http://0.0.0.0:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
})
.then(response => response.json())
.then(data => {
    // Loop through the result and create article tags
    const placesSection = document.querySelector('.places');
    data.forEach(place => {
        const article = document.createElement('article');
        article.innerHTML = `
            <!-- Your place details here -->
            <h2>${place.name}</h2>
            <p>${place.description}</p>
        `;
        placesSection.appendChild(article);
    });
})
.catch(error => console.error('Error fetching places:', error));

});
