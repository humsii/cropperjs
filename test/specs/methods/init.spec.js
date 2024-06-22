import Cropper from '../../../src/js/cropper';
import { printInitCoverage } from '../../../src/js/cropper';

describe('init (method)', () => {
  let element;

  beforeEach(() => {
    // create new image element for each test
    element = document.createElement('img');
    document.body.appendChild(element);
  });

  afterEach(() => {
    // remove created image element
    document.body.removeChild(element);
  });

  after(() => {
    printInitCoverage();
  });

  it('should not reinitialize if already initialized', () => {
    // verifies that init returns early if cropper is already attached to the element
    element.NAMESPACE = new Cropper(element);
    const cropper = new Cropper(element);
    expect(cropper).to.exist;
  });

  it('should return if img src is empty', () => {
    // verifies that init returns early if src attribute is empty
    const cropper = new Cropper(element);
    expect(cropper.originalUrl).to.equal('');
  });

  it('should initialize for canvas element', (done) => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const cropper = new Cropper(canvas, {
      ready() {
        cropper.options.ready = () => {
          expect(cropper.isImg).to.be.false;
          document.body.removeChild(canvas);
          done();
        }
      }
    })
  });
});
