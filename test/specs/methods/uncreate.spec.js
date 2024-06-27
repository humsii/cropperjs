import Cropper from '../../../src/js/cropper';
import { printUncreateCoverage } from '../../../src/js/cropper';

describe('uncreate (method)', () => {
  
  // default test
  it('should call unbuild and set ready, cropped to false if ready is true', () => {
    const image = window.createImage();
    const cropper = new Cropper(image, {});

    cropper.ready = true;
    cropper.cropped = true;

    cropper.unbuild = function() {
      this.ready = false;
      this.cropped = false;
    };

    cropper.unbuild = cropper.unbuild.bind(cropper);

    cropper.uncreate();

    expect(cropper.ready).to.be.false;
    expect(cropper.cropped).to.be.false;
  });

  after(() => {
    printUncreateCoverage();
  });

});
