Introduction
-----
This project provides a one page showcase of all the components provided by Bootstrap 4 (beta) with any custom styles applied. This allows easy viewing of the effects of customisations, as well as providing a living styleguide.

Gulp has been used as the build tool for this project. Upon building, Gulp will create two directories:
1. /dist
2. /docs

### /dist
This directory will contain the main.css file that contains all of Bootstrap as well as our custom styles. This is the file that should be used in sites wishing to use our custom Bootstrap build.

### /docs
This directory contains a .html page that contains all of the Bootstrap components connected to our custom stylesheet. This allows us to view the alterations that we are making to Bootstrap all in one place.

Installation
----
This project uses the following tools and so they need to be installed before use.

* Gulp - https://gulpjs.com/
* Yarn - https://yarnpkg.com/lang/en/ (or you can use npm)
* Node - https://nodejs.org/en/

### Instructions
1. Clone repo
2. cd into folder and run the command ```yarn install```. This will install all of the dependencies from package.json.
3. Run command ```gulp```. This will run the default gulp task, which in this case will create a local server using BrowserSync.
4. A browser should launch displaying the styleguide page.
5. Upon changes of any .html, .scss or .css files in the /src directory, the page will refresh automatically to display the changes.

### Usage
Custom styles should go in the src/scss/custom folder. You should then ```@import``` them into the file ```_custom.scss```. This will ensure that the custom styles are then included in the compliation of the main.scss file.

Gulp tools used
---
### gulp-sass
Used for the compilation of the .css files from .scss files

### gulp-sourcemaps
This creates css sourcemaps duriing compilation to aid in development.

### gulp-autoprefixer
This adds vendor prefixes to our css automatically, meaning that we don't have to add them ourselves to the .scss.

### gulp-clean-css
This minifies our .css.

### browser-sync
This creates a local server for us to test the /docs directory. It will auto-refresh when changes are detected within the /src directory.

### gulp-file-include
This allows us to break up the index.html file into many smaller partial files. This is helpful as otherwise the html file was over 5000 lines of code which was difficult to work with.

### del
Used to clean out .css files from the /dist and /docs directories to ensure that deleted files are not left behind.
