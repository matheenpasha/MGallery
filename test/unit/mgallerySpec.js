'use strict';



define(['MGallery'], function(mgallery){

  describe("MGallery", function() {

    describe("constructor", function() {

      it("should throw if no wrapper/HTML is passed in", function() {
        expect(function() {
          (new mgallery())
        }).to.throw(Error);
      });

    });

  });

});
