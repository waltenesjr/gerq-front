/** Diretiva para campos somente inteiros	 **/
angular.module('app').directive("integer", [function() {
   return {
     require: '?ngModel',
     scope : {
		min : "=min",
		max : "=max"
	 },
     link: function($scope, $element, attrs, modelCtrl) {
    	 var minValue = $scope.min ? parseInt($scope.min) : 0;
    	 var maxValue = $scope.max ? parseInt($scope.max) : 0;
    	 var maxLenght = (""+maxValue).length;
    	 modelCtrl.$parsers.push(function (inputValue) {
           if (inputValue == undefined) return '';
           var strInput = ''+inputValue;
           var transformedInput = strInput.replace(/[^0-9]/g, '');
           if (maxValue > 0 && parseInt(transformedInput) > maxValue)
        	   transformedInput = transformedInput.substring(0, transformedInput.length-1);
           if (transformedInput.length == maxLenght && parseInt(transformedInput) < minValue)
        	   transformedInput = transformedInput.substring(0, transformedInput.length-1);

           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }

           return transformedInput;
       });
     }
   };
}]);