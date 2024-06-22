import Cropper from '../../../src/js/cropper';
import { printUnbuildCoverage } from '../../../src/js/cropper';

describe('unbuild (method)', () => {
  let element; let
    cropperInstance;

  beforeEach(() => {
    element = document.createElement('img');
    document.body.appendChild(element);
    cropperInstance = new Cropper(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    cropperInstance = null;
  });

  after(() => {
    printUnbuildCoverage();
  });

  it('should return early if not ready', () => {
    cropperInstance.ready = false;
    cropperInstance.unbuild();
    expect(cropperInstance.ready).to.be.false;
  });
});
