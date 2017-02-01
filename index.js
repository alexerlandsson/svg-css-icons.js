function svgCssIcons() {

  // Settings
  var input = 'svg/';
  var output = 'css/';

  // Base css
  var baseCss =
    '[class^="icon-"], ' +
    '\n[class*=" icon-"] {' +
      '\n\tdisplay: inline-block;' +
      '\n\tvertical-align: middle;' +
      '\n\twidth: 1em;' +
      '\n\theight: 1em;' +
      '\n\tbackground-position: 50% 50%;' +
      '\n\tbackground-repeat: no-repeat;' +
    '\n}\n\n'
  ;

  function createSvgCss(className, svgData) {
    // Create css class for each icon
    baseCss +=
      '.icon-' + className.replace(/\.[^/.]+$/, "") + ' {' +
      '\n\tbackground-image: url(data:image/svg+xml;base64,' + svgData + ');' +
      '\n}\n'
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
