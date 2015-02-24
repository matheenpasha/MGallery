<h1 id="intro">MGallery</h1>
========

A mobile responsive gallery supported by almost all devices using <a href="http://iscrolljs.com">IScroll</a>.


##Usage

You can have a look at the index.html file for demo

Here is the basic configuation:



         <head>
         ...
         <link rel="stylesheet" href="gallery.css"/>
         </head>
         ...
         <body>
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
                         ...
                     </ul>
                 </div>
                 <div class="controls b">
                     <i class="caret b play"></i>
                     <i class="caret prev b hide"></i>
                     <i class="caret next b hide"></i>
                 </div>
          </div>
          <script type="text/javascript" src="mgallery-min.js"></script>
         </body>


Finally build the Mgallery

        ``` javascript
           gallery = new MGallery(container, options);

         ```


     To be continued...
