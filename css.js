function minifyCSS() {
  var input = document.getElementById("input").value;
  var output = input;
  output = output.replace(/\/\*.*\*\//g, '');
  output = output.replace(/\s*{\s*/g, '{');
  output = output.replace(/\s*}\s*/g, '}');
  output = output.replace(/\s*:\s*/g, ':');
  output = output.replace(/\s*;\s*/g, ';');
  output = output.replace(/\s+/g, ' ');

  var inMedia = false;
  output = output.split('\n').map(function (line) {
    if (inMedia) {
      if (line.indexOf('}') >= 0) {
        inMedia = false;
      }
      return line.trim();
    } else {
      if (line.indexOf('@media') === 0) {
        inMedia = true;
        return line;
      }
      return line.trim();
    }
  }).join('\n');

  document.getElementById("output").value = output;
}


function copyOutput() {
  var output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
}  
