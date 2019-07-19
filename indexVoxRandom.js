'use strict';

const searchURL = 'https://cors-anywhere.herokuapp.com/https://librivox.org/api/feed/audiotracks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  console.log(typeof(responseJson));
  
  let randNum = function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(63));
  }(); 
  console.log(randNum);
  console.log(responseJson.sections[randNum]);
  $('#results-list').empty();

    $('#results-list').append(
      `<li>
      <h3>${responseJson.sections[randNum].title}</h3>
      </li>`
    );
  //display the results section  
  $('#results').removeClass('hidden');
  // listenAudio();
};

// function listenAudio(responseJson, STORE) {
//   console.log('ready to match' + typeof(responseJson.sections));
//   for(let i = 0; i < responseJson.sections.length; i++) {
//     arr1[i] = Object.assign(responseJson.sections[i], STORE[i]);
//   }
//   return responseJson.sections;
// }

function getYouTubeVideos() {  
  const params = {
    project_id: 6103,
    format: 'json'
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    // const searchTerm = $('#js-search-term').val();

    getYouTubeVideos();
  });
}

$(watchForm);