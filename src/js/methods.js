import {
  CLASS_CROP,
  CLASS_DISABLED,
  CLASS_HIDDEN,
  CLASS_MODAL,
  CLASS_MOVE,
  DATA_ACTION,
  DRAG_MODE_CROP,
  DRAG_MODE_MOVE,
  DRAG_MODE_NONE,
  EVENT_ZOOM,
  NAMESPACE,
} from './constants';
import {
  addClass,
  assign,
  dispatchEvent,
  forEach,
  getAdjustedSizes,
  getOffset,
  getPointersCenter,
  getSourceCanvas,
  isNumber,
  isPlainObject,
  isUndefined,
  normalizeDecimalNumber,
  removeClass,
  setData,
  toggleClass,
} from './utilities';

export const destroyCoverage = {
  elementIsNotNamespace: false,
  isImageAndReplaced: false
};

export const setCropBoxDataCoverage = {
  widthChanged: false,
  heightChanged: false,
}

window.getCroppedCanvasCoverage = {
    "branch 1: !cropper.ready": false,
    "branch 2: cropper.ready": false,
    "branch 3: !cropper.cropped": false,
    "branch 4: cropper.cropped": false,
    "branch 5: ratio !== 1": false,
    "branch 6: ratio === 1": false,
    "branch 7: !imageSmoothingQuality": false,
    "branch 8: imageSmoothingQuality": false,
    "branch 9: srcX <= -initialWidth || srcX > sourceWidth": false,
    "branch 10: srcX <= 0": false,
    "branch 11: srcX <= sourceWidth": false,
    "branch 12: srcWidth <= 0 for srcY": false,
    "branch 13: srcY <= 0": false,
    "branch 14: srcY <= sourceHeight": false,
    "branch 15: dstWidth > 0 && dstHeight > 0": false,
    "branch 16: dstWidth <= 0 || dstHeight <= 0": false,
};

window.replaceCoverage = {
    "branch 1: !cropper.disabled": false,
    "branch 2: cropper.disabled": false,
    "branch 3: cropper.isImg": false,
    "branch 4: !cropper.isImg": false,
    "branch 5: hasSameSize": false,
    "branch 6: !hasSameSize": false,
    "branch 7: cropper.ready": false,
    "branch 8: !cropper.ready": false,
    "branch 9: cropper.isImg && !hasSameSize": false,
    "branch 10: !cropper.isImg && !hasSameSize": false,
}

window.destroyBranchCoverage = {
    "branch 1: element is not namespace": false,
    "branch 2: element is namespace": false,
    "branch 3: is image and replaced": false,
    "branch 4: is not image and replaced": false,
}

window.setCropBoxDataBranchCoverage = {
    "branch 1: widthChanged": false,
    "branch 2: heightChanged": false,
    "branch 3: aspectRatio && !widthChanged && !heightChanged": false,
}

window.zoomToCoverage = {
  "branch 1: canZoom": false,
  "branch 2: !dispatchEvent": false,
  "branch 3: _originalEvent": false,
  "branch 4: isPlainObject, areNumbers": false,
  "branch 5: zoomFromCenter": false,
  "branch 6: cannotZoom": false
}

function printGetCroppedCanvasCoverage() {
  console.log('getCroppedCanvas coverage:');
    for (const [branch, hit] of Object.entries(getCroppedCanvasCoverage)) {
      console.log(`${branch}: ${hit ? 'hit' : 'not hit'}`);
    }
}

function printReplaceCoverage() {
  console.log('replace coverage:');
    for (const [branch, hit] of Object.entries(replaceCoverage)) {
      console.log(`${branch}: ${hit ? 'hit' : 'not hit'}`);
    }
}

function printDestroyCoverage() {
  console.log('destroy coverage:');
    for (const [branch, hit] of Object.entries(destroyBranchCoverage)) {
      console.log(`${branch}: ${hit ? 'hit' : 'not hit'}`);
    }
}

function printSetCropBoxDataCoverage() {
  console.log('setCropBoxData coverage:');
    for (const [branch, hit] of Object.entries(setCropBoxDataBranchCoverage)) {
      console.log(`${branch}: ${hit ? 'hit' : 'not hit'}`);
    }
}

function printZoomToCoverage() {
  console.log('zoomTo coverage:');
    for (const [branch, hit] of Object.entries(zoomToCoverage)) {
      console.log(`${branch}: ${hit ? 'hit' : 'not hit'}`);
    }
}

export { printGetCroppedCanvasCoverage };
export { printReplaceCoverage };
export { printDestroyCoverage };
export { printSetCropBoxDataCoverage };
export { printZoomToCoverage };

export default {
  // Show the crop box manually
  crop() {
    if (this.ready && !this.cropped && !this.disabled) {
      this.cropped = true;
      this.limitCropBox(true, true);

      if (this.options.modal) {
        addClass(this.dragBox, CLASS_MODAL);
      }

      removeClass(this.cropBox, CLASS_HIDDEN);
      this.setCropBoxData(this.initialCropBoxData);
    }

    return this;
  },

  // Reset the image and crop box to their initial states
  reset() {
    if (this.ready && !this.disabled) {
      this.imageData = assign({}, this.initialImageData);
      this.canvasData = assign({}, this.initialCanvasData);
      this.cropBoxData = assign({}, this.initialCropBoxData);
      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    }

    return this;
  },

  // Clear the crop box
  clear() {
    if (this.cropped && !this.disabled) {
      assign(this.cropBoxData, {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      });

      this.cropped = false;
      this.renderCropBox();
      this.limitCanvas(true, true);

      // Render canvas after crop box rendered
      this.renderCanvas();
      removeClass(this.dragBox, CLASS_MODAL);
      addClass(this.cropBox, CLASS_HIDDEN);
    }

    return this;
  },

  /**
   * Replace the image's src and rebuild the cropper
   * @param {string} url - The new URL.
   * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
   * @returns {Cropper} this
   */
  replace(url, hasSameSize = false) {
    if (!this.disabled && url) {
      window.replaceCoverage["branch 1: !cropper.disabled"] = true;

      if (this.isImg) {
        window.replaceCoverage["branch 3: cropper.isImg"] = true;
        this.element.src = url;
      }

      window.replaceCoverage["branch 4: !cropper.isImg"] = true;

      if (hasSameSize) {
        window.replaceCoverage["branch 5: hasSameSize"] = true;
        this.url = url;
        this.image.src = url;

        if (this.ready) {
          window.replaceCoverage["branch 7: cropper.ready"] = true;
          this.viewBoxImage.src = url;

          forEach(this.previews, (element) => {
            element.getElementsByTagName('img')[0].src = url;
          });
        }

        window.replaceCoverage["branch 8: !cropper.ready"] = true;
      } else {
        window.replaceCoverage["branch 6: !hasSameSize"] = true;

        if (this.isImg) {
          window.replaceCoverage["branch 9: cropper.isImg && !hasSameSize"] = true;
          this.replaced = true;
        }

        window.replaceCoverage["branch 10: !cropper.isImg && !hasSameSize"] = true;

        this.options.data = null;
        this.uncreate();
        this.load(url);
      }
    }

    window.replaceCoverage["branch 2: cropper.disabled"] = true;

    return this;
  },

  // Enable (unfreeze) the cropper
  enable() {
    if (this.ready && this.disabled) {
      this.disabled = false;
      removeClass(this.cropper, CLASS_DISABLED);
    }

    return this;
  },

  // Disable (freeze) the cropper
  disable() {
    if (this.ready && !this.disabled) {
      this.disabled = true;
      addClass(this.cropper, CLASS_DISABLED);
    }

    return this;
  },

  /**
   * Destroy the cropper and remove the instance from the image
   * @returns {Cropper} this
   */
  destroy() {
    const { element } = this;

    if (!element[NAMESPACE]) {
      window.destroyBranchCoverage["branch 1: element is not namespace"] = true;
      destroyCoverage.elementIsNotNamespace = true;
      return this;
    }

    window.destroyBranchCoverage["branch 2: element is namespace"] = true;
    element[NAMESPACE] = undefined;

    if (this.isImg && this.replaced) {
      window.destroyBranchCoverage["branch 3: is image and replaced"] = true;
      destroyCoverage.isImageAndReplaced = true;
      element.src = this.originalUrl;
    }
    window.destroyBranchCoverage["branch 4: is not image and replaced"] = true;

    this.uncreate();
    return this;
  },

  /**
   * Move the canvas with relative offsets
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
   * @returns {Cropper} this
   */
  move(offsetX, offsetY = offsetX) {
    const { left, top } = this.canvasData;

    return this.moveTo(
      isUndefined(offsetX) ? offsetX : (left + Number(offsetX)),
      isUndefined(offsetY) ? offsetY : (top + Number(offsetY)),
    );
  },

  /**
   * Move the canvas to an absolute point
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Cropper} this
   */
  moveTo(x, y = x) {
    const { canvasData } = this;
    let changed = false;

    x = Number(x);
    y = Number(y);

    if (this.ready && !this.disabled && this.options.movable) {
      if (isNumber(x)) {
        canvasData.left = x;
        changed = true;
      }

      if (isNumber(y)) {
        canvasData.top = y;
        changed = true;
      }

      if (changed) {
        this.renderCanvas(true);
      }
    }

    return this;
  },

  /**
   * Zoom the canvas with a relative ratio
   * @param {number} ratio - The target ratio.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoom(ratio, _originalEvent) {
    const { canvasData } = this;

    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    return this.zoomTo((canvasData.width * ratio) / canvasData.naturalWidth, null, _originalEvent);
  },

  /**
   * Zoom the canvas to an absolute ratio
   * @param {number} ratio - The target ratio.
   * @param {Object} pivot - The zoom pivot point coordinate.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoomTo(ratio, pivot, _originalEvent) {
    const { options, canvasData } = this;
    const {
      width,
      height,
      naturalWidth,
      naturalHeight,
    } = canvasData;

    ratio = Number(ratio);

    if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
      window.zoomToCoverage["branch 1: canZoom"] = true;
      const newWidth = naturalWidth * ratio;
      const newHeight = naturalHeight * ratio;

      if (dispatchEvent(this.element, EVENT_ZOOM, {
        ratio,
        oldRatio: width / naturalWidth,
        originalEvent: _originalEvent,
      }) === false) {
        window.zoomToCoverage["branch 2: !dispatchEvent"] = true;
        return this;
      }

      if (_originalEvent) {
        window.zoomToCoverage["branch 3: _originalEvent"] = true;
        const { pointers } = this;
        const offset = getOffset(this.cropper);
        const center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY,
        };

        // Zoom from the triggering point of the event
        canvasData.left -= (newWidth - width) * (
          ((center.pageX - offset.left) - canvasData.left) / width
        );
        canvasData.top -= (newHeight - height) * (
          ((center.pageY - offset.top) - canvasData.top) / height
        );
      } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
        window.zoomToCoverage["branch 4: isPlainObject, areNumbers"] = true;
        canvasData.left -= (newWidth - width) * (
          (pivot.x - canvasData.left) / width
        );
        canvasData.top -= (newHeight - height) * (
          (pivot.y - canvasData.top) / height
        );
      } else {
        window.zoomToCoverage["branch 5: zoomFromCenter"] = true;
        // Zoom from the center of the canvas
        canvasData.left -= (newWidth - width) / 2;
        canvasData.top -= (newHeight - height) / 2;
      }

      canvasData.width = newWidth;
      canvasData.height = newHeight;
      this.renderCanvas(true);
    }
    else {
      window.zoomToCoverage["branch 6: cannotZoom"] = true;
    }

    return this;
  },

  /**
   * Rotate the canvas with a relative degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotate(degree) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
  },

  /**
   * Rotate the canvas to an absolute degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotateTo(degree) {
    degree = Number(degree);

    if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
      this.imageData.rotate = degree % 360;
      this.renderCanvas(true, true);
    }

    return this;
  },

  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Cropper} this
   */
  scaleX(scaleX) {
    const { scaleY } = this.imageData;

    return this.scale(scaleX, isNumber(scaleY) ? scaleY : 1);
  },

  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scaleY(scaleY) {
    const { scaleX } = this.imageData;

    return this.scale(isNumber(scaleX) ? scaleX : 1, scaleY);
  },

  /**
   * Scale the image
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scale(scaleX, scaleY = scaleX) {
    const { imageData } = this;
    let transformed = false;

    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (this.ready && !this.disabled && this.options.scalable) {
      if (isNumber(scaleX)) {
        imageData.scaleX = scaleX;
        transformed = true;
      }

      if (isNumber(scaleY)) {
        imageData.scaleY = scaleY;
        transformed = true;
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }
    }

    return this;
  },

  /**
   * Get the cropped area position and size data (base on the original image)
   * @param {boolean} [rounded=false] - Indicate if round the data values or not.
   * @returns {Object} The result cropped data.
   */
  getData(rounded = false) {
    const {
      options,
      imageData,
      canvasData,
      cropBoxData,
    } = this;
    let data;

    if (this.ready && this.cropped) {
      data = {
        x: cropBoxData.left - canvasData.left,
        y: cropBoxData.top - canvasData.top,
        width: cropBoxData.width,
        height: cropBoxData.height,
      };

      const ratio = imageData.width / imageData.naturalWidth;

      forEach(data, (n, i) => {
        data[i] = n / ratio;
      });

      if (rounded) {
        // In case rounding off leads to extra 1px in right or bottom border
        // we should round the top-left corner and the dimension (#343).
        const bottom = Math.round(data.y + data.height);
        const right = Math.round(data.x + data.width);

        data.x = Math.round(data.x);
        data.y = Math.round(data.y);
        data.width = right - data.x;
        data.height = bottom - data.y;
      }
    } else {
      data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }

    if (options.rotatable) {
      data.rotate = imageData.rotate || 0;
    }

    if (options.scalable) {
      data.scaleX = imageData.scaleX || 1;
      data.scaleY = imageData.scaleY || 1;
    }

    return data;
  },

  /**
   * Set the cropped area position and size with new data
   * @param {Object} data - The new data.
   * @returns {Cropper} this
   */
  setData(data) {
    const { options, imageData, canvasData } = this;
    const cropBoxData = {};

    if (this.ready && !this.disabled && isPlainObject(data)) {
      let transformed = false;

      if (options.rotatable) {
        if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
          imageData.rotate = data.rotate;
          transformed = true;
        }
      }

      if (options.scalable) {
        if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
          imageData.scaleX = data.scaleX;
          transformed = true;
        }

        if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
          imageData.scaleY = data.scaleY;
          transformed = true;
        }
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }

      const ratio = imageData.width / imageData.naturalWidth;

      if (isNumber(data.x)) {
        cropBoxData.left = (data.x * ratio) + canvasData.left;
      }

      if (isNumber(data.y)) {
        cropBoxData.top = (data.y * ratio) + canvasData.top;
      }

      if (isNumber(data.width)) {
        cropBoxData.width = data.width * ratio;
      }

      if (isNumber(data.height)) {
        cropBoxData.height = data.height * ratio;
      }

      this.setCropBoxData(cropBoxData);
    }

    return this;
  },

  /**
   * Get the container size data.
   * @returns {Object} The result container data.
   */
  getContainerData() {
    return this.ready ? assign({}, this.containerData) : {};
  },

  /**
   * Get the image position and size data.
   * @returns {Object} The result image data.
   */
  getImageData() {
    return this.sized ? assign({}, this.imageData) : {};
  },

  /**
   * Get the canvas position and size data.
   * @returns {Object} The result canvas data.
   */
  getCanvasData() {
    const { canvasData } = this;
    const data = {};

    if (this.ready) {
      forEach([
        'left',
        'top',
        'width',
        'height',
        'naturalWidth',
        'naturalHeight',
      ], (n) => {
        data[n] = canvasData[n];
      });
    }

    return data;
  },

  /**
   * Set the canvas position and size with new data.
   * @param {Object} data - The new canvas data.
   * @returns {Cropper} this
   */
  setCanvasData(data) {
    const { canvasData } = this;
    const { aspectRatio } = canvasData;

    if (this.ready && !this.disabled && isPlainObject(data)) {
      if (isNumber(data.left)) {
        canvasData.left = data.left;
      }

      if (isNumber(data.top)) {
        canvasData.top = data.top;
      }

      if (isNumber(data.width)) {
        canvasData.width = data.width;
        canvasData.height = data.width / aspectRatio;
      } else if (isNumber(data.height)) {
        canvasData.height = data.height;
        canvasData.width = data.height * aspectRatio;
      }

      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Get the crop box position and size data.
   * @returns {Object} The result crop box data.
   */
  getCropBoxData() {
    const { cropBoxData } = this;
    let data;

    if (this.ready && this.cropped) {
      data = {
        left: cropBoxData.left,
        top: cropBoxData.top,
        width: cropBoxData.width,
        height: cropBoxData.height,
      };
    }

    return data || {};
  },

  /**
   * Set the crop box position and size with new data.
   * @param {Object} data - The new crop box data.
   * @returns {Cropper} this
   */
  setCropBoxData(data) {
    const { cropBoxData } = this;
    const { aspectRatio } = this.options;
    let widthChanged;
    let heightChanged;

    if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
      if (isNumber(data.left)) {
        cropBoxData.left = data.left;
      }

      if (isNumber(data.top)) {
        cropBoxData.top = data.top;
      }

      if (isNumber(data.width) && data.width !== cropBoxData.width) {
        widthChanged = true;
        cropBoxData.width = data.width;
      }

      if (isNumber(data.height) && data.height !== cropBoxData.height) {
        heightChanged = true;
        cropBoxData.height = data.height;
      }

      if (aspectRatio) {
        if (widthChanged) {
          window.setCropBoxDataBranchCoverage["branch 1: widthChanged"] = true;
          setCropBoxDataCoverage.widthChanged = true;
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else if (heightChanged) {
          window.setCropBoxDataBranchCoverage["branch 2: heightChanged"] = true;
          setCropBoxDataCoverage.heightChanged = true;
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
        window.setCropBoxDataBranchCoverage["branch 3: aspectRatio && !widthChanged && !heightChanged"] = true;
      }

      this.renderCropBox();
    }

    return this;
  },

  /**
   * Get a canvas drawn the cropped image.
   * @param {Object} [options={}] - The config options.
   * @returns {HTMLCanvasElement} - The result canvas.
   */
  getCroppedCanvas(options = {}) {
    if (!this.ready || !window.HTMLCanvasElement) {
      window.getCroppedCanvasCoverage["branch 1: !cropper.ready"] = true;
      return null;
    }

    window.getCroppedCanvasCoverage["branch 2: cropper.ready"] = true;

    const { canvasData } = this;
    const source = getSourceCanvas(this.image, this.imageData, canvasData, options);

    // Returns the source canvas if it is not cropped.
    if (!this.cropped) {
      window.getCroppedCanvasCoverage["branch 3: !cropper.cropped"] = true;
      return source;
    }

    window.getCroppedCanvasCoverage["branch 4: cropper.cropped"] = true;

    let {
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight,
    } = this.getData(options.rounded);
    const ratio = source.width / Math.floor(canvasData.naturalWidth);

    if (ratio !== 1) {
      window.getCroppedCanvasCoverage["branch 5: ratio !== 1"] = true;
      initialX *= ratio;
      initialY *= ratio;
      initialWidth *= ratio;
      initialHeight *= ratio;
    }

    window.getCroppedCanvasCoverage["branch 6: ratio === 1"] = true;

    const aspectRatio = initialWidth / initialHeight;
    const maxSizes = getAdjustedSizes({
      aspectRatio,
      width: options.maxWidth || Infinity,
      height: options.maxHeight || Infinity,
    });
    const minSizes = getAdjustedSizes({
      aspectRatio,
      width: options.minWidth || 0,
      height: options.minHeight || 0,
    }, 'cover');
    let {
      width,
      height,
    } = getAdjustedSizes({
      aspectRatio,
      width: options.width || (ratio !== 1 ? source.width : initialWidth),
      height: options.height || (ratio !== 1 ? source.height : initialHeight),
    });

    width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
    height = Math.min(maxSizes.height, Math.max(minSizes.height, height));

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);

    context.fillStyle = options.fillColor || 'transparent';
    context.fillRect(0, 0, width, height);

    const { imageSmoothingEnabled = true, imageSmoothingQuality } = options;

    context.imageSmoothingEnabled = imageSmoothingEnabled;

    if (imageSmoothingQuality) {
      context.imageSmoothingQuality = imageSmoothingQuality;
      window.getCroppedCanvasCoverage["branch 7: !imageSmoothingQuality"] = true;
    }

    window.getCroppedCanvasCoverage["branch 8: imageSmoothingQuality"] = true;

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
    const sourceWidth = source.width;
    const sourceHeight = source.height;

    // Source canvas parameters
    let srcX = initialX;
    let srcY = initialY;
    let srcWidth;
    let srcHeight;

    // Destination canvas parameters
    let dstX;
    let dstY;
    let dstWidth;
    let dstHeight;

    if (srcX <= -initialWidth || srcX > sourceWidth) {
      srcX = 0;
      srcWidth = 0;
      dstX = 0;
      dstWidth = 0;
      window.getCroppedCanvasCoverage["branch 9: srcX <= -initialWidth || srcX > sourceWidth"] = true;
    } else if (srcX <= 0) {
      dstX = -srcX;
      srcX = 0;
      srcWidth = Math.min(sourceWidth, initialWidth + srcX);
      dstWidth = srcWidth;
      window.getCroppedCanvasCoverage["branch 10: srcX <= 0"] = true;
    } else {
      dstX = 0;
      srcWidth = Math.min(initialWidth, sourceWidth - srcX);
      dstWidth = srcWidth;
      window.getCroppedCanvasCoverage["branch 11: srcX <= sourceWidth"] = true;
    }

    if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
      srcY = 0;
      srcHeight = 0;
      dstY = 0;
      dstHeight = 0;
      window.getCroppedCanvasCoverage["branch 12: srcWidth <= 0 for srcY"] = true;
    } else if (srcY <= 0) {
      dstY = -srcY;
      srcY = 0;
      srcHeight = Math.min(sourceHeight, initialHeight + srcY);
      dstHeight = srcHeight;
      window.getCroppedCanvasCoverage["branch 13: srcY <= 0"] = true;
    } else {
      dstY = 0;
      srcHeight = Math.min(initialHeight, sourceHeight - srcY);
      dstHeight = srcHeight;
      window.getCroppedCanvasCoverage["branch 14: srcY <= sourceHeight"] = true;
    }

    const params = [
      srcX,
      srcY,
      srcWidth,
      srcHeight,
    ];

    // Avoid "IndexSizeError"
    if (dstWidth > 0 && dstHeight > 0) {
      window.getCroppedCanvasCoverage["branch 15: dstWidth > 0 && dstHeight > 0"] = true;
      const scale = width / initialWidth;

      params.push(
        dstX * scale,
        dstY * scale,
        dstWidth * scale,
        dstHeight * scale,
      );
    }

    window.getCroppedCanvasCoverage["branch 16: dstWidth <= 0 || dstHeight <= 0"] = true;

    // All the numerical parameters should be integer for `drawImage`
    // https://github.com/fengyuanchen/cropper/issues/476
    context.drawImage(source, ...params.map((param) => Math.floor(normalizeDecimalNumber(param))));

    return canvas;
  },

  /**
   * Change the aspect ratio of the crop box.
   * @param {number} aspectRatio - The new aspect ratio.
   * @returns {Cropper} this
   */
  setAspectRatio(aspectRatio) {
    const { options } = this;

    if (!this.disabled && !isUndefined(aspectRatio)) {
      // 0 -> NaN
      options.aspectRatio = Math.max(0, aspectRatio) || NaN;

      if (this.ready) {
        this.initCropBox();

        if (this.cropped) {
          this.renderCropBox();
        }
      }
    }

    return this;
  },

  /**
   * Change the drag mode.
   * @param {string} mode - The new drag mode.
   * @returns {Cropper} this
   */
  setDragMode(mode) {
    const { options, dragBox, face } = this;

    if (this.ready && !this.disabled) {
      const croppable = mode === DRAG_MODE_CROP;
      const movable = options.movable && mode === DRAG_MODE_MOVE;

      mode = (croppable || movable) ? mode : DRAG_MODE_NONE;

      options.dragMode = mode;
      setData(dragBox, DATA_ACTION, mode);
      toggleClass(dragBox, CLASS_CROP, croppable);
      toggleClass(dragBox, CLASS_MOVE, movable);

      if (!options.cropBoxMovable) {
        // Sync drag mode to crop box when it is not movable
        setData(face, DATA_ACTION, mode);
        toggleClass(face, CLASS_CROP, croppable);
        toggleClass(face, CLASS_MOVE, movable);
      }
    }

    return this;
  },
};

