AUI.add('aui-image-cropper', function(A) {
var L = A.Lang,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,

	NAME = "image-cropper",

	CSS_CROP = A.getClassName(NAME, "crop"),
	CSS_OVERLAY = A.getClassName(NAME, "overlay");

var ImageCropper = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			cropHeight: {
				value: 100,
				validator: isNumber
			},

			cropWidth: {
				value: 100,
				validator: isNumber
			},

			minWidth: {
				value: undefined
			},

			minHeight: {
				value: undefined
			},

			movable: {
				value: true,
				validator: isBoolean
			},

			node: {
				setter: A.one
			},

			preserveRatio: {
				value: true,
				validator: isBoolean
			},

			resizable: {
				value: true,
				validator: isBoolean
			},

			x: {
				value: 0,
				validator: isNumber
			},

			y: {
				value: 0,
				validator: isNumber
			}
		},

		EXTENDS: A.Widget,

		UI_ATTRS: [
			"cropHeight",
			"cropWidth",
			"minWidth",
			"minHeight",
			"movable",
			"resizable",
			"x",
			"y"
		],

		prototype: {
			bindUI: function() {
				var instance = this;

				instance._bindDrag();
				instance._bindResize();

				instance.cropNode.hover(
					A.bind(instance._showOverlay, instance),
					A.bind(instance._hideOverlay, instance)
				);
			},

			destructor: function() {
				var instance = this;

				instance._destroyDrag();
				instance._destroyResize();
			},

			getCropRegion: function() {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				return {
					"x": cropNode.getX() - imageNode.getX(),
					"y": cropNode.getY() - imageNode.getY(),
					"width": cropNode.width(),
					"height": cropNode.height()
				};
			},

			renderUI: function() {
				var instance = this;

				var boundingBox = instance.get("boundingBox");
				var imageNode = instance.get("srcNode");

				// Create crop
				var cropNode = A.Node.create('<div class="' + CSS_CROP + '"></div>');

				boundingBox.append(cropNode);

				instance.cropNode = cropNode;

				// Create overlay
				var topOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');
				var rightOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');
				var bottomOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');
				var leftOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');

				boundingBox.append(topOverlay);
				boundingBox.append(rightOverlay);
				boundingBox.append(bottomOverlay);
				boundingBox.append(leftOverlay);

				instance.topOverlay = topOverlay;
				instance.rightOverlay = rightOverlay;
				instance.bottomOverlay = bottomOverlay;
				instance.leftOverlay = leftOverlay;

				instance._renderDrag();
				instance._renderResize();

				instance._hideOverlay();
			},

			syncUI: function() {
				var instance = this;

				instance._uiSetX(instance.get("x"));
				instance._uiSetY(instance.get("y"));
				instance._uiSetCropWidth(instance.get("cropWidth"));
				instance._uiSetCropHeight(instance.get("cropHeight"));
				instance._uiSetPreserveRatio(instance.get("preserveRatio"));
				instance._uiSetMinWidth(instance.get("minWidth"));
				instance._uiSetMinHeight(instance.get("minHeight"));
				instance._uiSetMovable(instance.get("movable"));
				instance._uiSetResizable(instance.get("resizable"));
			},

			_bindDrag: function() {
				var instance = this;

				var drag = instance.drag;

				drag.on("drag:drag", function (event) {
					instance._positionOverlay();
				});

				drag.on("drag:start", function (event) {
					instance._showOverlay();
				});

				drag.on("drag:end", function (event) {
					instance._hideOverlay();
				});
			},

			_bindResize: function() {
				var instance = this;

				var resize = instance.resize;

				resize.on("resize:resize", function (event) {
					instance._positionOverlay();
				});

				resize.on("resize:start", function (event) {
					instance._showOverlay();
				});

				resize.on("resize:end", function (event) {
					instance._hideOverlay();
				});
			},

			_destroyDrag: function(object) {
				var instance = this;

				if (instance.drag) {
					instance.drag.destroy();
					delete instance.drag;
				}
			},

			_destroyResize: function(object) {
				var instance = this;

				if (instance.resize) {
					instance.resize.destroy();
					delete instance.resize;
				}
			},

			_hideOverlay: function () {
				var instance = this;

				if (instance._isDragging() || instance._isResizing()) {
					return;
				}

				instance.topOverlay.setStyle("visibility", "hidden");
				instance.rightOverlay.setStyle("visibility", "hidden");
				instance.bottomOverlay.setStyle("visibility", "hidden");
				instance.leftOverlay.setStyle("visibility", "hidden");
			},

			_isDragging: function () {
				var instance = this;

				var drag = instance.drag;

				if (drag) {
					return drag.get("dragging");
				} else {
					return false;
				}
			},

			_isResizing: function () {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					return resize.get("resizing");
				} else {
					return false;
				}
			},

			_positionOverlay: function (event) {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;
				var topOverlay = instance.topOverlay;
				var rightOverlay = instance.rightOverlay;
				var bottomOverlay = instance.bottomOverlay;
				var leftOverlay = instance.leftOverlay;

				var imageXY = imageNode.getXY();
				var imageX = imageXY[0];
				var imageY = imageXY[1];
				var imageWidth = imageNode.width();
				var imageHeight = imageNode.height();

				var cropXY = cropNode.getXY();
				var cropX = cropXY[0];
				var cropY = cropXY[1];
				var cropWidth = cropNode.width();
				var cropHeight = cropNode.height();

				// Top
				topOverlay.setXY([imageX, imageY]);
				topOverlay.width(imageWidth);
				topOverlay.height(cropY - imageY);

				// Right
				rightOverlay.setXY([cropX + cropWidth, cropY]);
				rightOverlay.width(imageWidth - (cropX + cropWidth - imageX));
				rightOverlay.height(cropHeight);

				// Bottom
				bottomOverlay.setXY([imageX, cropY + cropHeight]);
				bottomOverlay.width(imageWidth);
				bottomOverlay.height(imageHeight - (cropY + cropHeight - imageY));

				// Left
				leftOverlay.setXY([imageX, cropY]);
				leftOverlay.width(cropX - imageX);
				leftOverlay.height(cropHeight);
			},

			_renderDrag: function() {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				var drag = new A.DD.Drag({
					node: cropNode
				}).plug(A.Plugin.DDConstrained, {
					constrain2node: imageNode
				});

				instance.drag = drag;
			},

			_renderResize: function() {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				var resize = new A.Resize({
					node: cropNode,
					autoHide: true
				}).plug(A.Plugin.ResizeConstrained, {
					constrain: imageNode,
					preserveRatio: instance.get("preserveRatio"),
					minHeight: instance.get("minHeight"),
					minWidth: instance.get("minWidth")
				});

				instance.resize = resize;
			},

			_showOverlay: function () {
				var instance = this;

				if (instance._isDragging() || instance._isResizing()) {
					return;
				}

				instance.topOverlay.setStyle("visibility", "visible");
				instance.rightOverlay.setStyle("visibility", "visible");
				instance.bottomOverlay.setStyle("visibility", "visible");
				instance.leftOverlay.setStyle("visibility", "visible");
			},

			_uiSetCropHeight: function(value) {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				var imageY = imageNode.getY();
				var imageHeight = imageNode.height();
				var cropY = cropNode.getY();
				var cropHeight = cropNode.height();

				if (cropY + value > imageY + imageHeight) {
					value = imageY + imageHeight - cropY;
				}

				cropNode.height(value);

				if (instance.get("preserveRatio")) {
					var cropWidth = cropNode.width();
					var ratio = cropWidth/cropHeight;

					cropNode.width(value*ratio);
				}

				instance._positionOverlay();
			},

			_uiSetCropWidth: function(value) {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				var imageX = imageNode.getX();
				var imageWidth = imageNode.width();
				var cropX = cropNode.getX();
				var cropWidth = cropNode.width();

				if (cropX + value > imageX + imageWidth) {
					value = imageX + imageWidth - cropX;
				}

				cropNode.width(value);

				if (instance.get("preserveRatio")) {
					var cropHeight = cropNode.height();
					var ratio = cropHeight/cropWidth;

					cropNode.height(value*ratio);
				}

				instance._positionOverlay();
			},

			_uiSetMinHeight: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set("minHeight", value);
				}
			},

			_uiSetMinWidth: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set("minWidth", value);
				}
			},

			_uiSetMovable: function(value) {
				var instance = this;

				instance.drag.set("lock", !value);
			},

			_uiSetPreserveRatio: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set("preserveRatio", value);
				}
			},

			_uiSetResizable: function(value) {
				var instance = this;

				if (value) {
					if (instance.stopResize) {
						instance.stopResize.detach();
					}
				}
				else {
					if (!instance.stopResize) {
						instance.stopResize = instance.resize.on("resize:resize", function (event) {
							event.preventDefault();
							event.stopPropagation();
						});

						console.log(instance.stopResize);
					}
				}
			},

			_uiSetX: function(value) {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				var imageX = imageNode.getX();
				var imageWidth = imageNode.width();
				var cropWidth = cropNode.width();

				if (value + cropWidth > imageWidth) {
					value = imageWidth - cropWidth;
				}

				cropNode.setX(imageX + value);

				instance._positionOverlay();
			},

			_uiSetY: function(value) {
				var instance = this;

				var imageNode = instance.get("srcNode");
				var cropNode = instance.cropNode;

				var imageY = imageNode.getY();
				var imageHeight = imageNode.height();
				var cropHeight = cropNode.height();

				if (value + cropHeight > imageHeight) {
					value = imageHeight - cropHeight;
				}

				cropNode.setY(imageY + value);

				instance._positionOverlay();
			}
		}
	}
);

A.ImageCropper = ImageCropper;

}, '@VERSION@' ,{requires:['widget','aui-base','resize','dd-constrain'], skinnable:true});
