'use strict';



define(['MGallery'], function(mgallery){

  describe("MGallery", function() {

    // test case for the constructor

    describe("constructor", function() {

      it("should throw an error if no wrapper/HTML is passed in", function() {
        expect(function() {
          (new mgallery())
        }).to.throw(Error);
      });

    });



  });

});
