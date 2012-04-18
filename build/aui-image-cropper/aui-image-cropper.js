AUI.add('aui-image-cropper', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	NAME = 'image-cropper',

	CSS_BORDER = A.getClassName(NAME, 'border'),
	CSS_CROP = A.getClassName(NAME, 'crop'),
	CSS_OVERLAY = A.getClassName(NAME, 'overlay');
	CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');

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

			preserveRatio: {
				value: false,
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

		UI_ATTRS: [
			'cropHeight',
			'cropWidth',
			'minWidth',
			'minHeight',
			'movable',
			'resizable',
			'x',
			'y'
		],

		prototype: {
			renderUI: function() {
				var instance = this;

				var boundingBox = instance.get('boundingBox');
				var imageNode = instance.get('srcNode');

				// Create crop

				instance.cropNode = A.Node.create('<div class="' + CSS_CROP + '"></div>');

				// Create overlay

				instance.topOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');
				instance.rightOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');
				instance.bottomOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');
				instance.leftOverlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');

				// Create border

				instance.borderNode = A.Node.create('<div class="' + CSS_BORDER + '"></div>');

				A.all([
					instance.cropNode,
					instance.topOverlay,
					instance.rightOverlay,
					instance.bottomOverlay,
					instance.leftOverlay,
					instance.borderNode
				]).appendTo(boundingBox);

				instance._boundingBox = boundingBox;

				instance._renderDrag();
				instance._renderResize();

				instance._unHoverOverlay();
			},

			bindUI: function() {
				var instance = this;

				instance.drag.addTarget(instance);
				instance.resize.addTarget(instance);

				instance.on(['drag:drag', 'resize:resize'], instance._positionOverlay);
				instance.on(['drag:start', 'resize:start'], instance._hoverOverlay);
				instance.on(['drag:end', 'resize:end'], instance._unHoverOverlay);

				instance.cropNode.hover(
					A.bind(instance._hoverOverlay, instance),
					A.bind(instance._unHoverOverlay, instance)
				);
			},

			syncUI: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var imageHeight = imageNode.height();
				var imageWidth = imageNode.width();

				var cropHeight = instance.get('cropHeight');
				var cropWidth = instance.get('cropWidth');
				var x = instance.get('x');
				var y = instance.get('y');

				// Find valid y

				if (y < 0) {
					y = 0;
				}

				if (y + cropHeight > imageHeight) {
					y = Math.max(imageHeight - cropHeight, 0);
				}

				instance.set('y', y);

				// Find valid cropHeight

				if (y + cropHeight > imageHeight) {
					cropHeight = Math.max(imageHeight - y, 0);
				}

				instance.set('cropHeight', cropHeight);

				// Find valid x

				if (x < 0) {
					x = 0;
				}

				if (x + cropWidth > imageWidth) {
					x = Math.max(imageWidth - cropWidth, 0);
				}

				instance.set('x', x);

				// Find valid cropWidth

				if (x + cropWidth > imageWidth) {
					cropWidth = Math.max(imageWidth - x, 0);
				}

				instance.set('cropWidth', cropWidth);

				instance._uiSetPreserveRatio(instance.get('preserveRatio'));
			},

			destructor: function() {
				var instance = this;

				instance._destroyDrag();
				instance._destroyResize();
			},

			getCropRegion: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				var imageWidth = imageNode.width();
				var imageHeight = imageNode.height();

				var cropWidth = cropNode.width();
				var cropHeight = cropNode.height();

				var x = cropNode.getX() - imageNode.getX();
				var y = cropNode.getY() - imageNode.getY();

				x = Math.round(x);
				y = Math.round(y);

				x = Math.max(0, x);
				y = Math.max(0, y);

				x = Math.min(x, imageWidth);
				y = Math.min(y, imageHeight);

				if (x + cropWidth > imageWidth) {
					cropWidth = imageWidth - x;
				}

				if (y + cropHeight > imageHeight) {
					cropHeight = imageHeight - y;
				}

				return {
					x: x,
					y: y,
					width: cropWidth,
					height: cropHeight
				};
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

			_hoverOverlay: function () {
				var instance = this;

				if (!instance._isDragging() && !instance._isResizing()) {
					instance._boundingBox.addClass(CSS_OVERLAY_HOVER);
				}
			},

			_isDragging: function () {
				var instance = this;

				var drag = instance.drag;

				return drag && drag.get('dragging');
			},

			_isResizing: function () {
				var instance = this;

				var resize = instance.resize;

				return resize && resize.get('resizing');
			},

			_positionOverlay: function (event) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var borderNode = instance.borderNode;
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

				var cropRegion = instance.getCropRegion();
				var relativeX = cropRegion.x;
				var relativeY = cropRegion.y;
				var absoluteX = relativeX + imageX;
				var absoluteY = relativeY + imageY;
				var cropWidth = cropRegion.width;
				var cropHeight = cropRegion.height;

				// Top

				topOverlay.setXY([imageX, imageY]);
				topOverlay.width(imageWidth);
				topOverlay.height(relativeY);

				// Right

				rightOverlay.setXY([absoluteX + cropWidth, absoluteY]);
				rightOverlay.width(imageWidth - (relativeX + cropWidth));
				rightOverlay.height(cropHeight);

				// Bottom

				bottomOverlay.setXY([imageX, absoluteY + cropHeight]);
				bottomOverlay.width(imageWidth);
				bottomOverlay.height(imageHeight - (relativeY + cropHeight));

				// Left

				leftOverlay.setXY([imageX, absoluteY]);
				leftOverlay.width(relativeX);
				leftOverlay.height(cropHeight);

				// Border

				borderNode.setXY([absoluteX - borderNode.getBorderWidth('l'), absoluteY - borderNode.getBorderWidth('t')]);
				borderNode.width(cropWidth);
				borderNode.height(cropHeight);
			},

			_renderDrag: function() {
				var instance = this;

				var drag = new A.DD.Drag(
					{
						node: instance.cropNode
					}
				).plug(
					A.Plugin.DDConstrained,
					{
						constrain2node: instance.get('srcNode')
					}
				);

				instance.drag = drag;
			},

			_renderResize: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				var resize = new A.Resize(
					{
						node: cropNode
					}
				).plug(
					A.Plugin.ResizeConstrained,
					{
						constrain: imageNode,
						preserveRatio: instance.get('preserveRatio'),
						minHeight: instance.get('minHeight'),
						minWidth: instance.get('minWidth')
					}
				);

				instance.resize = resize;
			},

			_uiSetCropHeight: function(value) {
				var instance = this;

				instance.cropNode.height(value);

				instance._positionOverlay();
			},

			_uiSetCropWidth: function(value) {
				var instance = this;

				instance.cropNode.width(value);

				instance._positionOverlay();
			},

			_uiSetMinHeight: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set('minHeight', value);
				}
			},

			_uiSetMinWidth: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set('minWidth', value);
				}
			},

			_uiSetMovable: function(value) {
				var instance = this;

				instance.drag.set('lock', !value);
			},

			_uiSetPreserveRatio: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set('preserveRatio', value);
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
						instance.stopResize = instance.resize.on(
							'resize:resize',
							function (event) {
								event.preventDefault();
								event.stopPropagation();
							}
						);
					}
				}
			},

			_uiSetX: function(value) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				var imageX = imageNode.getX();

				cropNode.setX(imageX + value);

				instance._positionOverlay();
			},

			_uiSetY: function(value) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				var imageY = imageNode.getY();

				cropNode.setY(imageY + value);

				instance._positionOverlay();
			},

			_unHoverOverlay: function () {
				var instance = this;

				if (!instance._isDragging() && !instance._isResizing()) {
					instance._boundingBox.removeClass(CSS_OVERLAY_HOVER);
				}
			}
		}
	}
);

A.ImageCropper = ImageCropper;

}, '@VERSION@' ,{skinnable:true, requires:['widget','aui-base','resize','dd-constrain']});
