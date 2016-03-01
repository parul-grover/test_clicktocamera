requirejs.config({
    baseUrl: "./",
    paths: {
        "materialize": "components/materialize/js/materialize.min",
        "jquery": "components/jquery/jquery.min",
		"angular":"js/angular.min",
		"app":"js/app/app",
		'ui-bootstrap':'js/ui-bootstrap-tpls-0.12.0',
		'sweet-alert':"js/sweetalert.min",
		'dataFactory' : 'js/factory/dataFactory',
		'filters' : 'js/filter/filters',
		'bodyController': "js/controllers/bodyController"
    },
    shim: {
    	"materialize": {
    		deps: ['jquery']
    	},
    	'ui-bootstrap': {
			deps: ['angular']
		},
		angular: {
			exports: 'angular'			
		}
    }
});