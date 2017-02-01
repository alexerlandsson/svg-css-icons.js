// Settings
var input = 'svg/';
var output = 'css/';

// Base CSS
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
var iconCss = '';

function createSvgCss(className, svgData) {
  iconCss +=
    '.icon-' + className.replace(/\.[^/.]+$/, "") + ' {' +
    '\r\n\tbackground-image: url(data:image/svg+xml;base64,' + svgData + ');' +
    '\r\n}\r\n'
  ;
}

function createCss() {
  // Create file
  fs.writeFile(output + 'svg-icons.css', baseCss + iconCss, function (err) {
    if (err) return console.log(err);
    console.log(output + 'svg-icon.css successfully created.');
  });
}

function getSvgSource(item, index) {
  fs.readFile(input + item, 'base64', function (err, data) {
    if (err) {
      return console.log(err);
    }
    // Create SVG class
    // TODO: Only do this is it is a SVG file
    createSvgCss(item, data);
    itemsProcessed++;
    if(itemsProcessed === svgFiles.length) {
      createCss();
    }
  });
}

fs = require('fs');

// Loop through SVG files
var svgFiles = fs.readdirSync(input);
var itemsProcessed = 0;
svgFiles.forEach(getSvgSource);
