
  // MGallery source

  (function (window, document, Math){

  var utils = window.IScroll.utils;

  function MGallery(/* element */wrapper, /*object*/ options){

    var mGallery = this;
    mGallery.isGalleryReady = false;


    mGallery.scroller = null;
    mGallery._events = {};
    mGallery.currentPageNo = 1;
    mGallery._galleryDom = wrapper;
    mGallery.options = {
      // default carousel settings for best/optimal performance
      carouselConfig: {
        'scrollX': true,
        'scrollY': false,
        'keyBindings': true,
        'snap': 'li',
        'snapSpeed': 500,
        'snapThreshold': 0.15,
        'momentum': false,
        'tap': 'scrollerTap',
        'zoom': true
      },

      autoplaygap: 5000,

      controlsGap: 3000,

      autoplaytimer: null,

      autoPlay: false,

      controlsTimer: null,

      noOfImages: null,

      isOpen: false,

      isCLosed: true

    };

    // This list holds all the images.
    mGallery.viewportList = mGallery._galleryDom.querySelectorAll('ul')[0];

    //list Items
    mGallery.listItems = mGallery.viewportList.querySelectorAll('li');

    // The close Button 'x' mark
    mGallery.closeButton = mGallery._galleryDom.querySelectorAll('.close')[0];

    //number of images based on number of list items
    mGallery.noOfImages = mGallery.listItems.length;

    //all the image tags
    mGallery.images = mGallery.viewportList.querySelectorAll('img');

    // get all the data
    mGallery.galleryData = [];

    //next button
    mGallery.nextButton =  mGallery._galleryDom.querySelectorAll('.next')[0];

    //previous button
    mGallery.prevButton =  mGallery._galleryDom.querySelectorAll('.prev')[0];

    utils.each(mGallery.images, function (img){
      mGallery.galleryData.push({
        'image': img,
        'mainSrc': utils.getAttr(img, 'mainSrc')
      });
    });


  }

  MGallery.prototype = {

    hideButton: function(button) {
      if(!utils.hasClass(button, 'hide')){
        utils.addClass(button, 'hide');
      }
    },

    showButton: function(button) {
      if(utils.hasClass(button, 'hide')){
        utils.removeClass(button, 'hide');
      }
    },

    determineViewPortWidth: function (){
      return document.documentElement.clientWidth;
    },

    on: function (type, fn){
      if (!this._events[type]){
        this._events[type] = [];
      }

      this._events[type].push(fn);
    },

    off: function (type, fn){
      if (!this._events[type]){
        return;
      }

      var index = this._events[type].indexOf(fn);

      if (index > -1){
        this._events[type].splice(index, 1);
      }
    },

    _execEvent: function (type){
      if (!this._events[type]){
        return;
      }

      var i = 0,
        l = this._events[type].length;

      if (!l){
        return;
      }

      for (; i < l; i++){
        this._events[type][i].apply(this, [].slice.call(arguments, 1));
      }
    },

    showControls: function (){
      var mGallery = this;
      // SLides the controls in from top and bottom
      utils.removeClass(mGallery._galleryDom, 'hide-controls');
      if (mGallery.controlsTimer !== null){
        clearTimeout(mGallery.controlsTimer);
      }
      mGallery.controlsTimer = setTimeout(function (){
        mGallery.hideControls();
      }, mGallery.options.controlsGap);
    },

    isControlsShowing: function (){
      var mGallery = this;
      return !utils.hasClass(mGallery._galleryDom, 'hide-controls');
    },

    hideControls: function (){
      var mGallery = this;
      utils.addClass(mGallery._galleryDom, 'hide-controls');
      clearTimeout(mGallery.controlsTimer);
    },

    stopAutoplay: function() {
      var mGallery = this;
      //domClass.remove(controls.playButton(), 'stop');
      clearInterval(mGallery.autoplaytimer);
      mGallery.showControls();
      mGallery.autoplaytimer = null;
      mGallery.autoPlay = false;
    },

    startAutoplay: function() {
      var mGallery = this;
      mGallery.autoPlay = true;
      //domClass.add(controls.playButton(), 'stop');
      mGallery.autoplaytimer = setInterval(function() {
        if(mGallery.noOfImages === mGallery.scroller.currentPage.pageX + 1){
          mGallery.stopAutoplay();
        } else {
          mGallery.scroller.next();
        }
      }, mGallery.autoplaygap);
      mGallery.showControls();
    },

    open: function (){
      var mGallery = this;
      // Open the Gallery
      utils.removeClass(mGallery._galleryDom, 'hide');
      utils.addClass(mGallery._galleryDom, 'show');
      mGallery.onOpen();
    },

    hide: function (){
      var mGallery = this;
      // Close the Gallery
      utils.addClass(mGallery._galleryDom, 'hide');
      utils.removeClass(mGallery._galleryDom, 'show');
      mGallery.onHide();
    },

    onHide: function (){
      this.isCLosed = true;
      this._execEvent('onHide');
    },

    onOpen: function (){
      this.isOpen = true;

      //Build the Gallery
      if (this.isGalleryReady === false){
        this.buildGallery();
      }
      this._execEvent('onOpen');
    },

    _attachEvents: function (){
      var mGallery = this;

      //attach all the events for controls
      utils.addEvent(mGallery.closeButton, 'click', function (){
        if (mGallery.isControlsShowing === true){
          mGallery.hideControls();
        }
        mGallery.hide();
      }, false);

      utils.addEvent(mGallery.nextButton, 'click', function (){
        if (!mGallery.autoPlay){
          mGallery.scroller.next();
          mGallery.showControls();
        } else {
          mGallery.stopAutoplay();
          mGallery.scroller.next();
          mGallery.showControls();
        }
      }, false);

      utils.addEvent(mGallery.prevButton, 'click', function (){
        if (!mGallery.autoPlay){
          mGallery.scroller.prev();
          mGallery.showControls();
        } else {
          mGallery.stopAutoplay();
          mGallery.scroller.prev();
          mGallery.showControls();
        }
      }, false);

      // Slides in/out the controls when user taps on the gallery
      utils.addEvent(mGallery._galleryDom, 'scrollerTap', function (){
        if (mGallery.isControlsShowing()){
          mGallery.hideControls();
        } else{
          mGallery.showControls();
        }
      }, false);


      // hide and show the next/previous button based on which page we are.
      mGallery.scroller.on('scrollEnd', function (){
        mGallery.currentPageNo = mGallery.scroller.currentPage.pageX + 1;

        if(mGallery.noOfImages > 1) {
          if(mGallery.currentPageNo === 1) {
            mGallery.hideButton(mGallery.prevButton);
            mGallery.showButton(mGallery.nextButton);
          }
          if(mGallery.currentPageNo > 1 && mGallery.currentPageNo < (mGallery.noOfImages)) {
            mGallery.showButton(mGallery.prevButton);
            mGallery.showButton(mGallery.nextButton);
          }
          if(mGallery.currentPageNo === mGallery.noOfImages) {
            mGallery.hideButton(mGallery.nextButton);
            mGallery.showButton(mGallery.prevButton);
          }
        }
        mGallery.loadImage(mGallery.currentPageNo);
      });

      // resize the list and refresh the iScroll object
      utils.onWindowResize(function() {
        if(mGallery.isOpen) {
          mGallery._resize();
        }
      });
    },


    positionList: function (){
      var mGallery = this;
      // position the the image list according to the screen size
      mGallery.viewportList.style.padding = '';
      var padding = Math.ceil(utils.position(mGallery._galleryDom).h / 2) - Math.ceil(utils.position(mGallery.viewportList).h / 2);
      if (padding < 0){
        padding = Math.ceil((utils.position(mGallery._galleryDom).h - utils.position(mGallery.viewportList).h) / 2);
      }
      mGallery.viewportList.style.padding = padding + 'px 0';
    },

    refreshList: function (){
      var mGallery = this;
      //set the width of each li based on screen size
      var viewPortWidth = mGallery.determineViewPortWidth();
      utils.each(mGallery.listItems, function (el){
        el.style.width = viewPortWidth + 'px';
      });
      var listWidth = utils.calculateCombinedWidth(mGallery.listItems);
      var numberOfWindows = Math.ceil(listWidth / viewPortWidth);
      mGallery.viewportList.style.width = listWidth + 'px';
      mGallery.noOfImages = numberOfWindows;
    },


    loadImage: function (n){
      var mGallery = this;
      //lazy loading the images only when they are required
      if(mGallery.images[n]) {
        var handler = function (){
          utils.removeClass(img, 'loading');
          utils.addClass(img, 'fade-in');
        };
        var img = mGallery.images[n];
        utils.addClass(img, 'loading');
        if (img instanceof HTMLImageElement && mGallery.images[n] && utils.getAttr(img, 'src') !== mGallery.galleryData[n].mainSrc){
          utils.setAttr(img, 'src', mGallery.galleryData[n].mainSrc);
          utils.addEvent(img, 'load', handler, false);
        }
      }
    },

    getViewPort: function (){
      return this._galleryDom.querySelectorAll('.viewport')[0];
    },

    _resize: function (){
      var mGallery = this;
      mGallery.refreshList();
      mGallery.positionList();
      if (mGallery.scroller === null){
        mGallery.scroller = new IScroll(mGallery.getViewPort(), mGallery.options.carouselConfig);
      } else{
        mGallery.scroller.refresh();
      }
      //load the second image.
      mGallery.loadImage(1);
      if(mGallery.noOfImages > 1 ){
        mGallery.showButton(mGallery.nextButton);
      }
    },

    buildGallery: function (){
      var mGallery = this;
      //load the first image then set the width of the rest of the li's based on the width of the first li
      var img = mGallery.images[0];
      var handler = function (){
        utils.removeEvent(img, 'load', this);
        setTimeout(function (){
          mGallery._resize();
          //mGallery.windowSlidedListener();
          utils.addClass(mGallery.getViewPort(), 'fade-in');

          mGallery._attachEvents();
        }, 1000);
      };
      utils.addEvent(img, 'load', handler, false);

      mGallery.loadImage(0);
      mGallery.isGalleryReady = true;
    }


  };


  window.MGallery = MGallery;

})(window, document, Math);
