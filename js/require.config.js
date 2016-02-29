requirejs.config({
    baseUrl: "./",
    paths: {
        materialize: "components/materialize/js/materialize.min",
        "jquery": "components/jquery/jquery.min",
		"angular":"js/angular.min",
		"app":"js/app/app",
		'sweet-alert':"js/sweetalert.min",
		'roposoService':"js/service/roposoService",
		'contenteditableDirective': 'js/directives/contenteditableDirective',
        'headerController': "js/controllers/headerController",
		'bodyController': "js/controllers/bodyController"
    },
    shim: {
		angular: {
			exports: 'angular'			
		}
    }
});