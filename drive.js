const submitButton = document.getElementById("submit-button");
        submitButton.addEventListener("click", function(){
            // Get the value entered in the input field
            const driveLink = document.getElementById("drive-link").value;
          
          if(!driveLink.startsWith("https://drive.google.com/file/d/") || !driveLink) {
        alert("Please enter a valid Google Drive link in the format https://drive.google.com/file/d/.../view");
        return;
    }
          
            // Extract the file ID from the inputted link
            const fileId = driveLink.split("/")[5];
            // Use the file ID to generate the direct download link
            const downloadLink = `https://drive.google.com/u/0/uc?id=${fileId}&export=download`;
            // Display the new link on the page
            const output = document.getElementById("output");
            output.innerHTML = "";
            const linkElem = document.createElement("a");
            linkElem.href = downloadLink;
            linkElem.innerText = "Download Now";
            linkElem.classList.add("download-link");
            output.appendChild(linkElem);
            const copyButton = document.createElement("button");
            copyButton.innerHTML = "Copy Link";
            copyButton.classList.add("copy-button");
            output.appendChild(copyButton);
            copyButton.addEventListener("click", function(){
                // Create a hidden textarea element
                const copyTextArea = document.createElement("textarea");
                copyTextArea.value = downloadLink;
                document.body.appendChild(copyTextArea);
                copyTextArea.select();
                try {
                  // Copy the text inside the text area
                  document.execCommand('copy');
                  copyButton.innerHTML = "Copied!";
                } catch (err) {
                  console.log('Unable to copy');
                }
                // Remove the textarea element
                document.body.removeChild(copyTextArea);
            });
        });
