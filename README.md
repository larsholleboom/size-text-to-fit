Size text to fit
================

Use this plugin when one-line text should fit inside a container with or without a specific width.

A minimal and a maximal font size can be set.

No libraries required
---------------------

This plugin requires no jquery or any other library and is a stand alone script the can be included without any conflicts

Usage
-----

1.  ### Create a container with text in it

    This can be any DOM element

    ```html
<p class="any-class">This is text inside a DOM element</p>

    ```

2.  ### Include script at bottom of page
    ```html
      ...
      <script src="hollebm-size-text-to-fit.js"></script>
      <script>
      // initialize the plugin here...
      </script>
    </body>
    ```

3.  ### Initialize the plugin
    
    After script has been inluded the size-text-to-fit can be initated on the DOM element

    ```javascript
    var fitTextContainers = document.querySelectorAll('.any-class');
    for(var i = 0; i < fitTextContainers.length; i++){
      fitTextContainers[i].HolleBMSizeTextToFit = new HolleBMSizeTextToFit(fitTextContainers[i], {
        minFontSize: 10,
        maxFontSize: 300
      });
    }
    ```

    The min and max font size settings are optional and will override default settings of 10px and 300px resp. Only values in pixels can be used.