<h1 id="intro">MGallery</h1>
========

A mobile responsive gallery supported by almost all devices using <a href="http://iscrolljs.com">IScroll</a>.

<h2 id="getting-started">Getting started</h2>

You can have a look at the index.html file for demo

1. Include the HTML structure in the page:

    <div id="mobile-gallery" class="quadratic hide preview show-controls">
            <div class="title b"><span></span><i class="caret close b"></i></div>
            <a href="#" class="button transparent b close">Back</a>
            <div class="viewport">
                <ul>
                    <li class="b"><img src="build/images/p.gif" mainSrc="build/images/m_gallery_1.jpg" alt="Loading"/></li>
                    <li class="b"><img src="build/images/p.gif" mainSrc="build/images/m_gallery_2.jpg" alt="Loading"/></li>
                    <li class="b"><img src="build/images/p.gif" mainSrc="build/images/m_gallery_3.jpg" alt="Loading"/></li>
                    <li class="b"><img src="build/images/p.gif" mainSrc="build/images/m_gallery_4.jpg" alt="Loading"/></li>
                    <li class="b"><img src="build/images/p.gif" mainSrc="build/images/m_gallery_5.jpg" alt="Loading"/></li>
                    <li class="b"><img src="build/images/p.gif" mainSrc="build/images/m_gallery_6.jpg" alt="Loading"/></li>
                </ul>
            </div>
            <div class="controls b">
                <i class="caret b play"></i>
                <i class="caret prev b hide"></i>
                <i class="caret next b hide"></i>
            </div>
     </div>

2. Include the build/js/m-gallery-min.js in your page

3. Include the build/css/mgallery.css in your page

4. Finally build the Mgallery

     <script type="javascript/text">

         function init() {
           var container = document.querySelectorAll('#mobile-gallery')[0];
           var gallery = null;
           gallery = new MGallery(container, null);

           var button = document.getElementById('trigger');
           button.addEventListener('click', function(){
             if(gallery !== null) {
               gallery.open();
             }
           }, false);
         }

         window.addEventListener('load', function(){
           init();
         }, false);

     </script>