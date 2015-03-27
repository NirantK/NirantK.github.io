/*
Name: 			View - Home
Written by: 	Crivos - (http://www.crivos.com)
Version: 		1.0
*/

var Home = {

	initialized: false,

	initialize: function() {

		if (this.initialized) return;
		this.initialized = true;

		this.build();
		this.events();

	},

	build: function() {

		// Circle Slider
		if($("#fcSlideshow").get(0)) {
			$("#fcSlideshow").flipshow();
			
			setInterval( function() {
				$("#fcSlideshow div.fc-right span:first").click();
			}, 3000);
			
		}
	
		// Revolution Slider Initialize
		if($("#revolutionSlider").get(0)) {
			$("#revolutionSlider").revolution({
				delay:9000,
				startheight:500,
				startwidth:960,

				hideThumbs:10,

				thumbWidth:100,
				thumbHeight:50,
				thumbAmount:5,

				navigationType:"both",
				navigationArrows:"verticalcentered",
				navigationStyle:"round",

				touchenabled:"on",
				onHoverStop:"on",

				navOffsetHorizontal:0,
				navOffsetVertical:20,

				stopAtSlide:-1,
				stopAfterLoops:-1,

				shadow:1,
				fullWidth:"on"
			});
		}

		// Nivo Slider
		if($("#nivoSlider").get(0)) {
			$("#nivoSlider").nivoSlider();
		}
	
	},

	events: function() {

		this.moveCloud();

	},

	moveCloud: function() {

		var $this = this;

		$(".cloud").animate( {"top": "+=20px"}, 3000, "linear", function() {
			$(".cloud").animate( {"top": "-=20px"}, 3000, "linear", function() {
				$this.moveCloud();
			});
		});

	}

};

Home.initialize();