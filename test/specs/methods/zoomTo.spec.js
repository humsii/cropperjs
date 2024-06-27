import Cropper from '../../../src/js/cropper';
import { printZoomToCoverage } from '../../../src/js/methods';

describe('zoomTo (method)', () => {

  it('should zoom to the certain ratio', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const imageData = cropper.zoomTo(1).getImageData();
        const canvasData = cropper.getCanvasData();

        expect(imageData.width).to.equal(imageData.naturalWidth);
        expect(canvasData.width).to.equal(canvasData.naturalWidth);
        expect(canvasData.naturalWidth).to.equal(imageData.naturalWidth);
        done();
      },
    });
  });

  it('should not be zoomed when it is not zoomable', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      zoomable: false,

      ready() {
        const imageData = cropper.zoomTo(1).getImageData();
        const canvasData = cropper.getCanvasData();

        expect(imageData.width).to.not.equal(imageData.naturalWidth);
        expect(canvasData.width).to.not.equal(canvasData.naturalWidth);
        expect(canvasData.naturalWidth).to.equal(imageData.naturalWidth);
        done();
      },
    });
  });

  it('should zoom to the given ratio with pivot', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const pivot = { x: 0, y: 0 };
        const initialCanvasData = cropper.getCanvasData();
        cropper.zoomTo(2, pivot);
        const canvasData = cropper.getCanvasData();
  
        const expectedWidth = initialCanvasData.naturalWidth * 2;
        const expectedHeight = initialCanvasData.naturalHeight * 2;
  
        expect(canvasData.width).to.equal(expectedWidth);
        expect(canvasData.height).to.equal(expectedHeight);
        done();
      },
    });
  });

  it('should zoom with _originalEvent', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const pivot = { x: 0, y: 0 };
        const originalEvent = {
          pageX: 0,
          pageY: 0,
        };

        const initialCanvasData = cropper.getCanvasData();
        cropper.zoomTo(2, pivot, originalEvent);
        const canvasData = cropper.getCanvasData();

        const expectedWidth = initialCanvasData.naturalWidth * 2;
        const expectedHeight = initialCanvasData.naturalHeight * 2;

        expect(canvasData.width).to.equal(expectedWidth);
        expect(canvasData.height).to.equal(expectedHeight);

        done();
      },
    });
  });
 
  after(() => {
    printZoomToCoverage();
  });
  
});
