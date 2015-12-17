angular.module('StudioApp').config(function($mdThemingProvider) {
		
	$mdThemingProvider.theme('layoutTheme')
		.primaryPalette('blue', {
		'default' : '500',
		'hue-1' : '200'
	}).accentPalette('blue-grey', {
		'default' : '900'
	}).warnPalette('red');
	
	
});	

	