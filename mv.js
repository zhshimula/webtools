const omdbApiKey = '386d1b9a';

      // function to fetch movie details from OMDB API
      async function fetchMovieDetails(movieTitle, omdbId) {
  if (!movieTitle && !omdbId) {
    const errorMessage = 'Please provide either a movie title or an OMDB ID.';
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  const url = omdbId ? `https://www.omdbapi.com/?i=${omdbId}&apikey=${omdbApiKey}` : `https://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

      // function to generate HTML code for movie details post
      async function generateMovieDetailsPost() {
        const generateButton = document.getElementById('generateButton');
        const previewContainer = document.getElementById('previewContainer');
        const codeBox = document.querySelector('.codeBox');
        const htmlCode = document.getElementById('htmlCode');
        const copyButton = document.getElementById('copyButton');
        const screenshotInput = document.getElementById('screenshot');
        const screenshotFilesInput = document.getElementById('screenshotFiles');
        const downloadLink1Input = document.getElementById('downloadLink1');
        const downloadLink2Input = document.getElementById('downloadLink2');
        const downloadLink3Input = document.getElementById('downloadLink3');
        const showDownloadButton1Input = document.getElementById('showDownloadButton1');
        const showDownloadButton2Input = document.getElementById('showDownloadButton2');
        const showDownloadButton3Input = document.getElementById('showDownloadButton3');

        generateButton.addEventListener('click', async () => {
          const movieTitleInput = document.getElementById('movieTitle');
          const movieTitle = movieTitleInput.value;
          const omdbIdInput = document.querySelector('#omdb-id-input');
      const omdbId = omdbIdInput.value;
          const screenshotUrls = screenshotInput.value.split(',');
          const screenshotFiles = screenshotFilesInput.files;
          const downloadLink1Url = downloadLink1Input.value;
          const downloadLink2Url = downloadLink2Input.value;
          const downloadLink3Url = downloadLink3Input.value;
          const showDownloadButton1 = showDownloadButton1Input.checked;
          const showDownloadButton2 = showDownloadButton2Input.checked;
          const showDownloadButton3 = showDownloadButton3Input.checked;
          
          const videoUrlInput = document.getElementById('videoUrl');
      const videoUrl = videoUrlInput.value;
      const showVideoInput = document.getElementById('showVideo');
      const showVideo = showVideoInput.checked;

          const movieDetails = await fetchMovieDetails(movieTitle, omdbId);

          let screenshotsHtml = '';
          for (let i = 0; i < screenshotUrls.length; i++) {
            const imageUrl = screenshotUrls[i].trim();
            screenshotsHtml += `<img src="${imageUrl}" alt="Screenshot ${i + 1}"><br><br>`;
          }
          
          let screenshotFilesHtml = '';
      if (screenshotFiles.length > 0) {
        const screenshotFilePromises = Array.from(screenshotFiles).map((file) =>
          getBase64(file)
        );
        const base64Images = await Promise.all(screenshotFilePromises);
        screenshotFilesHtml = base64Images
          .map((base64) => `<img src="${base64}" alt="Screenshot">`)
          .join('\n');
      }

let downloadLinksHtml = '';
if (showDownloadButton1) {
downloadLinksHtml += `
<div id="mv-keywords" style="background: rgb(224, 224, 224); color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin-bottom: 20px; padding: 5px;">
<span style="background: 0px 0px; color: teal; font-family: arial; font-size: 16px;">
<span class="quality" style="background: rgb(34, 34, 34); border-radius: 3px; color: white; display: inline-block; margin-left: 2px; padding: 2px 5px; text-transform: uppercase;">
<b>📲 DOWNLOAD LINKS :-</b>
</span>
</span>
</div>

<div style="text-align: center;">
<b style="color: #6D00FF">
<p><strong>Download ${movieDetails.Title} (${movieDetails.Year}) ${movieDetails.Type} <br> {Hindi-English} ESubs [500 MB]</strong></p>
</b>

<a href="${downloadLink1Url}"><button class="download-button"><b>DOWNLOAD NOW &#10157; [480P]</b></button></a></div><br>
            `;
          }

if (showDownloadButton2) { downloadLinksHtml += `
<div style="text-align: center;">
<b style="color:#6D00FF">
<p><strong>Download ${movieDetails.Title} (${movieDetails.Year}) ${movieDetails.Type} <br> {Hindi-English} ESubs [1.0 GB]</strong></p>
</b>
<a href="${downloadLink2Url}"><button class="download-button"><b>DOWNLOAD NOW &#10157; [720P]</b></button></a></div><br>
            `;
          }

if (showDownloadButton3) { downloadLinksHtml += `
<div style="text-align: center;">
<b style="color:#6D00FF">
<p><strong>Download ${movieDetails.Title} (${movieDetails.Year}) ${movieDetails.Type} <br> {Hindi-English} ESubs [2.0 GB]</strong></p>
</b>
<a href="${downloadLink3Url}"><button class="download-button"><b>DOWNLOAD NOW &#10157; [1080P]</b></button></a></div>
<br>
            `;
          } 
          
let videoHtml = '';
if (showVideo && videoUrl.trim() !== '') {
videoHtml += `
<div id="mv-keywords" style="background: rgb(224, 224, 224); color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin-bottom: 20px; padding: 5px;">
<span style="background: 0px 0px; color: teal; font-family: arial; font-size: 16px;">
<span class="quality" style="background: #ff726f; border-radius: 3px; color: white; display: inline-block; margin-left: 2px; padding: 2px 5px; text-transform: uppercase;">
<b>🎦 WATCH ONLINE :-</b>
</span>
</span>
</div>

<iframe src="${videoUrl}" width="100%" height="auto" frameborder="0" allowfullscreen></iframe>
        `;
      }

const html = `<!DOCTYPE html>
<html>
<head>
	
<title>${movieDetails.Title} (${movieDetails.Year})</title>

<style>
.container2 {
  display: flex;
}

.posterContainer {
  margin-right: 20px;
  background-color: #000;
  padding: 20px;
  border-radius: 10px 10px 0px 0px;
}

.detailsContainer {
  margin-right: 20px;
  background-color: #000;
  padding: 20px;
  color: #fff;
  border-radius: 0px 0px 10px 10px;
}

.posterContainer img {
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius:10px;
}

.detailsContainer h2 {
  color: #fdcc0d;
  font-size: 24px;
  margin-top: 0;
}

.detailsContainer p {
  margin: 0;
}

.detailsContainer strong {
  color: #fdcc0d;
}

.detailsContainer span {
  color: #fff;
}

.detailsContainer span.rating {
  color: #fdcc0d;
  font-weight: bold;
}

.detailsContainer span.users {
  color: #888888;
}

.detailsContainer span.source {
  color: #E1A923;
}

/* Mobile view */
@media (max-width: 767px) {
  .container2 {
    flex-direction: column;
  }
  
  .posterContainer,
  .detailsContainer {
    margin-right: 0;
    margin-bottom: 0;
  }
}

/* Desktop view */
@media (min-width: 768px) {
  .container2 {
    flex-direction: row;
  }
  
  .posterContainer,
  .detailsContainer {
    margin-right: 0;
    margin-bottom: 0;
  }
}

.screenshotsContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.screenshotsContainer img {
  display: block;
  max-width: 100%;
  border-radius:5px;
  margin: 5px auto;
}
      
 .download-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

.download-button:hover {
  background-color: #8A00FF;
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.download-button:active {
  background-color: #8A00FF;
  transform: translateY(0px);
  box-shadow: none;
}
</style>

</head>
<body>
	
<h1 style="color: #202020" ><b>Download ${movieDetails.Title} ${movieDetails.Year} Dual Audio {Hindi-English} +EngSubtitle  480p [500MB]  720p [1.2 GB]  1080p [2.6GB]</b></h1>

<p>&#9989; Download <strong style="color:Green;">${movieDetails.Title} ${movieDetails.Year}</strong> This is a <strong style="color:orange;text-transform: uppercase;">${movieDetails.Type}</strong> and available in 1080p, 720p & 480p Qualities For Your Mobile/tablet/Computer. This Movie is based on <strong style="color:blue;">${movieDetails.Genre}</strong>. This movie is available in HD Print So You can Click on the Download button below to download ${movieDetails.Title} ${movieDetails.Year} HD Print Full Movie On Internet.</p>

<p><strong style="color:red;">ToToMovies</strong> Provide You Super Quality Of Movies Which You Download From This Website. MyMoviesClan is One OF The Best Platform For Downloading Latest Bollywood Movies, Hollywood HD Movies, And Web Series. We Provide <span style="color: lime;">Direct Google Drive Download Links</span> For Fast And Secure Download. We're Very Happy To Stay With You. Please Join Our Telegram Group.</p>

<div class="container2">
<div class="posterContainer">
<img src="${movieDetails.Poster}" alt="${movieDetails.Title} Poster">
</div>

<div class="detailsContainer">
<div style="color: #fdcc0d;"><h2>${movieDetails.Title} (${movieDetails.Year})</h2></div>

<p style="color: #fff;">${movieDetails.Runtime} | ${movieDetails.Genre} | ${movieDetails.Released} | (${movieDetails.Country})</p><br>

<p><strong style="color: #fff;">&#11088; Rating:</strong> <span style="color: #fdcc0d;">${movieDetails.imdbRating}</span> <span style="color: #fff;">/10</span> <span style="color: #888888;">from ${movieDetails.imdbVotes} users</span></p><br>

<p><strong style="color: #fff;">Director:</strong> <span style="color: #fdcc0d;">${movieDetails.Director}</span></p>

<p><strong style="color: #fff;">Writer:</strong> <span style="color: #fdcc0d;">${movieDetails.Writer}</span></p>

<p><strong style="color: #fff;">Stars:</strong> <span style="color: #fdcc0d;">${movieDetails.Actors}</span></p><br>

<p> <span style="color: #9D9D9D;">source:</span> <a style="color: #E1A923;" href="${movieDetails.imdburl}">imdb.com</a></p>
</div></div>
<br>

<div id="mv-keywords" style="background: rgb(224, 224, 224); color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin-bottom: 20px; padding: 5px;">
<span style="background: 0px 0px; color: teal; font-family: arial; font-size: 16px;">
    <span class="quality" style="background: rgb(249, 163, 2); border-radius: 3px; color: white; display: inline-block; margin-left: 2px; padding: 2px 5px; text-transform: uppercase;">
<strong>STORYLINE :</strong>
</span>
</span>
</div>
	
<p style="color: #474747;"><strong>${movieDetails.Plot}</strong></p>

<div id="mv-keywords" style="background: rgb(224, 224, 224); color: #333333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; margin-bottom: 20px; padding: 5px;">
<span style="background: 0px 0px; color: teal; font-family: arial; font-size: 16px;">
<span class="quality" style="background: rgb(34, 34, 34); border-radius: 3px; color: white; display: inline-block; margin-left: 2px; padding: 2px 5px; text-transform: uppercase;">
<strong>📷 SCREENSHOTS :-</strong>
</span>
</span>
</div>

<div class="screenshotsContainer">
${screenshotsHtml}
${screenshotFilesHtml}
</div>
<br>

${downloadLinksHtml}
${videoHtml}
                
</body>
</html>`;

          // create a div element to contain the preview content
          const previewContent = document.createElement('div');
          previewContent.innerHTML = html;

          // clear the preview container
          previewContainer.innerHTML = '';

          // append the preview content to the preview container
          previewContainer.appendChild(previewContent);

          // set the HTML code in the textarea
          htmlCode.value = html;

          // show the code box
          codeBox.style.display = 'block';
        }); 
        
        function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

        // add event listener to the "Copy HTML" button
        copyButton.addEventListener('click', () => {
          htmlCode.select();
          document.execCommand('copy');
          alert('HTML code copied to clipboard!');
        });
      }

      generateMovieDetailsPost();
