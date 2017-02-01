function svgCssIcons() {

  // Settings
  var input = 'svg/';
  var output = 'css/';

  // Base css
  var baseCss =
    '[class^="icon-"], ' +
    '\r\n[class*=" icon-"] {' +
      '\r\n\tdisplay: inline-block;' +
      '\r\n\tvertical-align: middle;' +
      '\r\n\twidth: 1em;' +
      '\r\n\theight: 1em;' +
      '\r\n\tbackground-position: 50% 50%;' +
      '\r\n\tbackground-repeat: no-repeat;' +
    '\r\n}\r\n\r\n'
  ;

  function createSvgCss(className, svgData) {
    // Create css class for each icon
    baseCss +=
      '.icon-' + className.replace(/\.[^/.]+$/, "") + ' {' +
      '\r\n\tbackground-image: url(data:image/svg+xml;base64,' + svgData + ');' +
      '\r\n}\r\n'
    ;
  }

  function createCss() {
    // Writes the output to a css file
    fs.writeFile(output + 'svg-icons.css', baseCss, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(output + 'svg-icon.css successfully created.');
    });
  }

  function getSvgSource(item, index) {
    // Only create icon class if it is a svg
    var extension = item.substr(item.lastIndexOf('.') + 1);

    if (extension === 'svg') {
      // Get svg source code and encode it to base64
      fs.readFile(input + item, 'base64', function (err, data) {
        if (err) {
          return console.log(err);
        }

        createSvgCss(item, data);

        itemsProcessed++;
        if (itemsProcessed === svgFiles.length) {
          // Create css file when all files har been looped
          createCss();
        }
      });
    }
  }

  fs = require('fs');

  // Loop through svg files
  var svgFiles = fs.readdirSync(input);
  var itemsProcessed = 0;
  svgFiles.forEach(getSvgSource);

}
svgCssIcons();
