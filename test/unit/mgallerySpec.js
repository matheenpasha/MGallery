'use strict';

define(['IScroll', 'MGallery'], function(IScroll, mgallery){
  describe('Gallery', function () {

    // load the controller's module
    //beforeEach(angular.mock.module('tui'));

    it('should have a HomeCtrl controller', inject(function($controller) {
      should.exist($controller('HomeCtrl', {$scope: {}}));
    }));

  });
});