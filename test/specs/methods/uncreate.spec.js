import Cropper from '../../../src/js/cropper';
import { printUncreateCoverage } from '../../../src/js/cropper';

describe('uncreate (method)', () => {
  
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

  it('should reset sizingImage onload, sizing, and sized when sizing is true', () => {
    const image = window.createImage();
    const cropper = new Cropper(image, {});

    cropper.sizing = true;
    cropper.sizingImage = {
      onload: () => {},
    };

    cropper.uncreate();

    expect(cropper.sizingImage.onload).to.be.null;
    expect(cropper.sizing).to.be.false;
    expect(cropper.sized).to.be.false;
  });

  it('should call stop if not ready, not sizing, and not reloading', () => {
    const image = window.createImage();
    const cropper = new Cropper(image, {});

    cropper.image = image;

    cropper.stop = function() {
      this.image = null;
    };

    cropper.stop = cropper.stop.bind(cropper);

    cropper.ready = false;
    cropper.sizing = false;
    cropper.sizingImage = null;
    cropper.sized = false;
    cropper.reloading = false;

    cropper.uncreate();

    expect(cropper.image).to.be.null;
  });

  it('should hit the nothing branch when ready, sizing, sized, reloading are false and sizingImage, image are null', () => {
    const image = window.createImage();
    const cropper = new Cropper(image, {});

    cropper.ready = false;
    cropper.sizing = false;
    cropper.sizingImage = null;
    cropper.sized = false;
    cropper.reloading = false;
    cropper.image = null;

    cropper.uncreate();

    expect(window.uncreateCoverage["branch 5: nothing"]).to.be.true;
  });

  after(() => {
    printUncreateCoverage();
  });

});
