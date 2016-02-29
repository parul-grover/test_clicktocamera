requirejs.config({
    baseUrl: "./",
    paths: {
        "materialize": "components/materialize/js/materialize.min",
        "jquery": "components/jquery/jquery.min",
		"angular":"js/angular.min",
		"app":"js/app/app",
		'sweet-alert':"js/sweetalert.min",
		'roposoService':"js/service/roposoService",
		'dataFactory' : 'js/factory/dataFactory',
		'contenteditableDirective': 'js/directives/contenteditableDirective',
		'bodyController': "js/controllers/bodyController"
    },
    shim: {
    	"materialize": {
    		deps: ['jquery']
    	},
		angular: {
			exports: 'angular'			
		}
    }
});