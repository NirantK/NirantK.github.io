/*
Name: 			Style Switcher Initializer
Written by: 	Crivos - (http://www.crivos.com)
Version: 		1.0
*/

var styleSwitcher = {

	initialized: false,

	initialize: function() {

		var $this = this;

		if (this.initialized) return;
		this.initialized = true;

		// Style Switcher CSS
		$("head").append($('<link rel="stylesheet">').attr("href", "master/style-switcher/style-switcher.css") );
		$("head").append($('<link rel="stylesheet/less">').attr("href", "master/less/skin.less") );
		$("head").append($('<link rel="stylesheet">').attr("href", "master/style-switcher/colorpicker/css/colorpicker.css") );

		$.getScript("master/style-switcher/colorpicker/js/bootstrap-colorpicker.js", function(data, textStatus, jqxhr) {

			less = {
				env: "development"
			};

			$.getScript("master/less/less.js", function(data, textStatus, jqxhr) {

				$this.build();
				$this.events();

				if($.cookie("skin") != null) {
					$this.setColor($.cookie("skin"));
				} else {
					$this.container.find("ul[data-type=colors] li:first a").click();
				}

				if($.cookie("layout") != null)
					$this.setLayoutStyle($.cookie("layout"));

				if($.cookie("pattern") != null)
					$this.setPattern($.cookie("pattern"));

				if($.cookie("initialized") == null) {
					$this.container.find("h4 a").click();
					$.cookie("initialized", true);
				}
					
			});
		});

		$.getScript("master/style-switcher/cssbeautify/cssbeautify.js", function(data, textStatus, jqxhr) {});

	},

	build: function() {

		var $this = this;

		// Base HTML
		var switcher = $("<div />")
			.attr("id", "styleSwitcher")
			.addClass("style-switcher hidden-phone")
			.append(
				$("<h4 />")
					.html("Style Switcher")
					.append(
						$("<a />")
							.attr("href", "#")
							.append(
								$("<i />")
									.addClass("icon-cogs")
							)
					),
				$("<div />")
					.addClass("style-switcher-wrap")
					.append(
						$("<h5 />")
							.html("Colors"),
						$("<ul />")
							.addClass("options")
							.attr("data-type", "colors"),
						$("<h5 />")
							.html("Layout Style"),
						$("<div />")
							.addClass("options-links layout")
							.append(
								$("<a />")
									.attr("href", "#")
									.attr("data-layout-type", "wide")
									.addClass("active")
									.html("Wide"),
								$("<a />")
									.attr("href", "#")
									.attr("data-layout-type", "boxed")
									.html("Boxed")
							),
						$("<div />")
							.hide()
							.addClass("patterns")
							.append(
								$("<h5 />")
									.html("Background Patterns"),
								$("<ul />")
									.addClass("options")
									.attr("data-type", "patterns")
							),
						$("<hr />"),
						$("<div />")
							.addClass("options-links")
							.append(
								$("<a />")
									.addClass("reset")
									.attr("href", "#")
									.html("Reset"),
								$("<a />")
									.addClass("get-css")
									.attr("href", "#getCSSModal")
									.html("Get Skin CSS")
							)
					)
			);
	
		$("body").append(switcher);

		var modalHTML = '<div id="getCSSModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cssModalLabel" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="cssModalLabel">Skin CSS</h3></div><div class="modal-body"><div class="alert alert-info fade in" id="addBoxedClassInfo">Please add the <strong>&quot;boxed&quot;</strong> class to the &lt;body&gt; element.</div><textarea id="getCSSTextarea" class="get-css" readonly></textarea></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button></div></div>';

		$("body").append(modalHTML);

		this.container = $("#styleSwitcher");

		// Colors Skins
		var colors = [ 
			{"Hex": "#0088CC", "colorName": "Blue"},
			{"Hex": "#4EB25C", "colorName": "Green"},
			{"Hex": "#4A5B7D", "colorName": "Navy"},
			{"Hex": "#E05048", "colorName": "Red"},
			{"Hex": "#B8A279", "colorName": "Beige"},
			{"Hex": "#c71c77", "colorName": "Pink"},
			{"Hex": "#734BA9", "colorName": "Purple"},
			{"Hex": "#2BAAB1", "colorName": "Cyan"}
		];

		var colorList = this.container.find("ul[data-type=colors]");

		$.each(colors, function(i, value) {

			var color = $("<li />")
							.append(
								$("<a />")
									.css("background-color", colors[i].Hex)
									.attr({
										"data-color-hex": colors[i].Hex,
										"data-color-name": colors[i].colorName,
										"href": "#",
										"title": colors[i].colorName
									})
							);

			colorList.append(color);

		});

		if($.cookie("skin") != null) {
			var currentSkinColor = $.cookie("skin");
		} else {
			var currentSkinColor = colors[0].Hex;
		}
		
		var colorPicker = $("<li />")
						.append(
							$("<div />")
								.attr("id", "colorSelector")
								.attr("data-color", currentSkinColor)
								.attr("data-color-format", "hex")
								.addClass("color-picker")
								.append(
									$("<a />")
										.css("background-color", currentSkinColor)
										.attr({
											"href": "#",
										}),
									$("<span />")
										.addClass("color-picker-icon")
								)
						);

		colorList.append(colorPicker);

		colorList.find("a").click(function(e) {
			e.preventDefault();
			$this.setColor($(this).attr("data-color-hex"));
		});

		$("#colorSelector").colorpicker().on('hide', function(ev) {
			$this.setColor(ev.color.toHex());
			$("#colorSelector").find("a").css("background-color", ev.color.toHex())
		});

		$("#colorSelector a").click(function(e) {
			e.preventDefault();
		});

		$(".colorpicker-saturation").mouseup(function() {
			$("#colorSelector").colorpicker("hide");
		});

		// Layout Styles
		this.container.find("div.options-links.layout a").click(function(e) {

			e.preventDefault();
			$this.setLayoutStyle($(this).attr("data-layout-type"), true);

		});

		// Background Patterns
		var patterns = ["gray_jean", "linedpaper", "az_subtle", "blizzard", "denim", "fancy_deboss", "honey_im_subtle", "linen", "pw_maze_white", "skin_side_up", "stitched_wool", "straws", "subtle_grunge", "textured_stripes", "wild_oliva", "worn_dots", "bright_squares", "random_grey_variations"];

		var patternsList = this.container.find("ul[data-type=patterns]");

		$.each(patterns, function(key, value) {

			var pattern = $("<li />")
							.append(
								$("<a />")
									.addClass("pattern")
									.css("background-image", "url(img/patterns/" + value + ".png)")
									.attr({
										"data-pattern": value,
										"href": "#",
										"title": value.charAt(0).toUpperCase() + value.slice(1)
									})
							);

			patternsList.append(pattern);

		});

		patternsList.find("a").click(function(e) {
			e.preventDefault();
			$this.setPattern($(this).attr("data-pattern"));
		});

		// Reset
		$this.container.find("a.reset").click(function(e) {
			e.preventDefault();
			$this.reset();
		});

		// Get CSS
		$this.container.find("a.get-css").click(function(e) {
			e.preventDefault();
			$this.getCss();
		});

	},

	events: function() {

		var $this = this;

		$this.container.find("h4 a").click(function(e){

			e.preventDefault();

			if($this.container.hasClass("active")) {

				$this.container.animate({
					left: "-195px"
				}, 300).removeClass("active");

			} else {

				$this.container.animate({
					left: "0"
				}, 300).addClass("active");

			}

		})

		if($.cookie("showSwitcher") != null) {
			$this.container.find("h4 a").click();
			$.removeCookie("showSwitcher");
		}

	},

	setColor: function(color) {

		less.modifyVars({ skinColor : color });
		$.cookie("skin", color);

		// Default Logo
		if(color == this.container.find("ul[data-type=colors] li:first a").attr("data-color-hex")) {
			$("h1.logo img").attr("src", "img/logo-default.png");
		} else {
			$("h1.logo img").attr("src", "img/logo.png");
		}

	},

	setLayoutStyle: function(style, refresh) {

		$.cookie("layout", style);

		if(refresh) {
			$.cookie("showSwitcher", true);
			window.location.reload();
			return false;
		}

		var layoutStyles = this.container.find("div.options-links.layout");
		var backgroundPatterns = this.container.find("div.patterns");

		layoutStyles.find("a.active").removeClass("active");
		layoutStyles.find("a[data-layout-type=" + style + "]").addClass("active");

		if(style == "wide") {
			backgroundPatterns.hide();
			$("body").removeClass("boxed");
			$("link[href*='bootstrap-responsive']").attr("href", "css/bootstrap-responsive.css");

			$.removeCookie("pattern");

		} else {
			backgroundPatterns.show();
			$("body").addClass("boxed");
			$("link[href*='bootstrap-responsive']").attr("href", "css/bootstrap-responsive-boxed.css");

			if($.cookie("pattern") == null)
				this.container.find("ul[data-type=patterns] li:first a").click();

		}

	},

	setPattern: function(pattern) {

		var isBoxed = $("body").hasClass("boxed");

		if(isBoxed) $("body").css("background-image", "url(img/patterns/" + pattern + ".png)")

		$.cookie("pattern", pattern);

	},

	reset: function() {

		$.removeCookie("skin");
		$.removeCookie("layout");
		$.removeCookie("pattern");

		$.cookie("showSwitcher", true);
		window.location.reload();

	},

	getCss: function() {

		raw = "";

		var isBoxed = $("body").hasClass("boxed");

		if(isBoxed) {
			raw = 'body { background-image: url("img/patterns/' + $.cookie("pattern") + '.png"); }';
			$("#addBoxedClassInfo").show();
		} else {
			$("#addBoxedClassInfo").hide();
		}

		$("#getCSSTextarea").text("");

		$("#getCSSTextarea").text($('style[id^="less:"]').text());

		$("#getCSSModal").modal("show");

		options = {
			indent: "\t",
			autosemicolon: true
		};

		raw = raw + $("#getCSSTextarea").text();

		$("#getCSSTextarea").text(cssbeautify(raw, options));

	}

};

styleSwitcher.initialize();