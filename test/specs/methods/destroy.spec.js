import { destroyCoverage, printDestroyCoverage } from '../../../src/js/methods.js';
import Cropper from "../../../src/js/cropper";
import { NAMESPACE } from "../../../src/js/constants";

describe('destroy (method)', () => {
  // beforeEach(() => {
  //   destroyCoverage.elementIsNotNamespace = false;
  //   destroyCoverage.isImageAndReplaced = false;
  // });

  it('should destroy before ready', () => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect.fail(1, 0);
      },
    });

    expect(image.cropper).to.be.an.instanceof(Cropper);
    expect(cropper.xhr).to.be.an.instanceof(XMLHttpRequest);
    cropper.destroy();
    expect(cropper.xhr).to.be.not.exist;
    expect(image.cropper).to.be.not.exist;
  });

  it('should destroy after ready', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        expect(this.cropper).to.be.an.instanceof(Cropper);
        expect(window.getComputedStyle(image).display).to.equal('none');
        cropper.destroy();
        expect(this.cropper).to.be.not.exist;
        expect(window.getComputedStyle(image).display).to.not.equal('none');
        done();
      },
    });
  });

  // it('should cover branch where element is not namespace', () => {
  //   const image = window.createImage();
  //   const cropper = new Cropper(image);

  //   delete image[NAMESPACE];
  //   cropper.destroy();
  //   expect(destroyCoverage.elementIsNotNamespace).to.be.true;
  //   expect(image.cropper).to.be.not.exist;
  // });

  // it('should cover branch where image is replaced', (done) => {
  //   const image = window.createImage();
  //   const originalUrl = image.src;
  //   const cropper = new Cropper(image, {
  //     ready() {
  //       this.replaced = true;
  //       this.originalUrl = originalUrl;
  //       this.isImg = true;

  //       cropper.destroy();
  //       expect(destroyCoverage.isImageAndReplaced).to.be.true;
  //       expect(image.src).to.equal(originalUrl);
  //       expect(image.cropper).to.be.not.exist;
  //       done();
  //     },
  //   });

  //   cropper.replaced = true;
  //   cropper.isImg = true;
  //   cropper.originalUrl = originalUrl;
  // });

  after(() => {
    printDestroyCoverage();
  });
});
