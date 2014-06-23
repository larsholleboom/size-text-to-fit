(function(){

  var HolleBMSizeTextToFit = function(elm, settings){
    this.elm = elm;
    this.initialFontSize = parseFloat(window.getComputedStyle(this.elm, null).getPropertyValue("font-size")); //in pixels
    this.elmInnerHtml = this.elm.innerHTML;

    this.options = this.helpers.extend({}, {
       minFontSize: 10,
       maxFontSize: 300
    }, settings || {});

    this.init();
  }

  HolleBMSizeTextToFit.prototype = {

    init: function(){
      // get inner width of this.elm to compare with fitTextContainer defined next
      this.elmInnerWidth = this.innerWidth(this.elm);
      // create container to be removed when font-size is found
      this.wrapInner();
      // remove user defined styles to divs inside this.elm
      this.removeUserDefinedStylesToFitTextContainer();
      // set necessary styles to calculate text size to fit container
      this.addStylesToFitTextContainer();
      // start calculating text size to fit container
      var calculatedFontSize = this.getFontSize(this.options.minFontSize, this.options.maxFontSize, this.initialFontSize);
      // set font-size of this.elm now font-size is found
      this.elm.style.fontSize = Math.round(calculatedFontSize) + 'px';
      // remove container now font-size is found
      this.elm.innerHTML = this.elmInnerHtml;
    },
    innerWidth: function(elm){
      var width = elm.offsetWidth;
      var innerWidth = width - 
        parseFloat(window.getComputedStyle(elm, null).getPropertyValue('padding-left')) - 
        parseFloat(window.getComputedStyle(elm, null).getPropertyValue('padding-right')) - 
        parseFloat(window.getComputedStyle(elm, null).getPropertyValue('border-left')) - 
        parseFloat(window.getComputedStyle(elm, null).getPropertyValue('border-right'));
      return Math.round(innerWidth);
    },
    wrapInner: function(){
      // create div and replace html of elm by div with that html
      this.fitTextContainer = document.createElement('div');
      this.fitTextContainer.innerHTML = this.elmInnerHtml;
      this.elm.innerHTML = '';
      this.elm.appendChild(this.fitTextContainer);
    },
    removeUserDefinedStylesToFitTextContainer: function(){
      this.fitTextContainer.style.fontSize = this.initialFontSize+'px';
      this.fitTextContainer.style.border = 0;
      this.fitTextContainer.style.margin = 0;
      this.fitTextContainer.style.padding = 0;
    },
    addStylesToFitTextContainer: function(){
      this.fitTextContainer.style.whiteSpace = 'nowrap';
      this.fitTextContainer.style.display = 'inline-block';
    },
    getFontSize: function(minFontSize, maxFontSize, lastFontSize){
      // console.log(minFontSize, maxFontSize, lastFontSize);
      // console.log(this.fitTextContainer.offsetWidth, this.elmInnerWidth);
      var newFontSize = (maxFontSize + minFontSize) / 2;
      // set calculatedFontSize
      this.fitTextContainer.style.fontSize = newFontSize + 'px';
      // check container
      if(this.fitTextContainer.offsetWidth == this.elmInnerWidth || (Math.abs(lastFontSize - newFontSize) <= 1)){
        // if container is too big even with a difference between lastFontSize and newFontSize of 1, the result should be lastFontSize - 1
        if(this.fitTextContainer.offsetWidth > this.elmInnerWidth){
          lastFontSize -= 1;
        }
        return lastFontSize;
      }else if(this.fitTextContainer.offsetWidth < this.elmInnerWidth){
        // if container is too small, try again with new range
        return this.getFontSize(newFontSize, maxFontSize, newFontSize);
      }else if(this.fitTextContainer.offsetWidth > this.elmInnerWidth){
        // if container is too big, try again with new range
        return this.getFontSize(minFontSize, newFontSize, newFontSize);
      }
    },
    helpers: {
      extend: function(out){
         out = out || {};
         for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
               continue;

            for (var key in arguments[i]) {
               if (arguments[i].hasOwnProperty(key))
                  out[key] = arguments[i][key];
            }
         }

         return out;
      }
    }


  }

  window.HolleBMSizeTextToFit = HolleBMSizeTextToFit;

})();