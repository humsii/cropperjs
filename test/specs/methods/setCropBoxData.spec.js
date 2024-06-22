import { setCropBoxDataCoverage, printSetCropBoxDataCoverage } from '../../../src/js/methods.js';
import Cropper from '../../../src/js/cropper';

describe('setCropBoxData (method)', () => {
  // beforeEach(() => {
  //   setCropBoxDataCoverage.widthChanged = false;
  //   setCropBoxDataCoverage.heightChanged = false;
  // });

  it('should change the positions only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();
        const changedCropBoxData = cropper.setCropBoxData({
          left: 16,
          top: 9,
        }).getCropBoxData();

        expect(changedCropBoxData.left).to.not.equal(cropBoxData.left);
        expect(changedCropBoxData.top).to.not.equal(cropBoxData.top);
        expect(changedCropBoxData.width).to.equal(cropBoxData.width);
        expect(changedCropBoxData.height).to.equal(cropBoxData.height);
        done();
      },
    });
  });

  it('should change the sizes only', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        const cropBoxData = cropper.getCropBoxData();
        const changedCropBoxData = cropper.setCropBoxData({
          width: 320,
          height: 180,
        }).getCropBoxData();

        expect(changedCropBoxData.left).to.equal(cropBoxData.left);
        expect(changedCropBoxData.top).to.equal(cropBoxData.top);
        expect(changedCropBoxData.width).to.not.equal(cropBoxData.width);
        expect(changedCropBoxData.height).to.not.equal(cropBoxData.height);
        done();
      },
    });
  });

  // it('should cover branch where width is changed and height is not changed', (done) => {
  //   const image = window.createImage();
  //   const cropper = new Cropper(image, {
  //     ready() {
  //       cropper.cropped = true;
  //       cropper.cropBoxData = {
  //         width: 100,
  //         height: 100,
  //       };
  //       cropper.options.aspectRatio = 1;

  //       cropper.setCropBoxData({ width: 200 });

  //       expect(setCropBoxDataCoverage.widthChanged).to.be.true;
  //       expect(setCropBoxDataCoverage.heightChanged).to.be.false;
  //       done();
  //     },
  //   });
  // });

  // it('should cover branch where height is changed and width is not changed', (done) => {
  //   const image = window.createImage();
  //   const cropper = new Cropper(image, {
  //     ready() {
  //       cropper.cropped = true;
  //       cropper.cropBoxData = {
  //         width: 100,
  //         height: 100,
  //       };
  //       cropper.options.aspectRatio = 1;

  //       cropper.setCropBoxData({ height: 200 });

  //       expect(setCropBoxDataCoverage.heightChanged).to.be.true;
  //       expect(setCropBoxDataCoverage.widthChanged).to.be.false;
  //       done();
  //     },
  //   });
  // });

  after(() => {
    printSetCropBoxDataCoverage();
  });
});
