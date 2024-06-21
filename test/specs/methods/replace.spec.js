import { printReplaceCoverage } from "../../../src/js/methods";

describe('replace (method)', () => {
  it('should not do anything when url is null or cropper is disabled', (done) => {
    const image = window.createImage();
    const cropper = new Cropper(image, {
      ready() {
        let result = cropper.replace(null, true);
        expect(result).to.equal(cropper);
  
        cropper.disable();
        result = cropper.replace('/base/docs/images/picture-2.jpg', true);
        expect(result).to.equal(cropper);
  
        done();
      },
    });
  });
  
  it('should replace the image url with a new one and handle different size when this.isImg', (done) => {
    const image = window.createImage();
    const imageURL = '/base/docs/images/picture-2.jpg';
    const cropper = new Cropper(image, {
      ready() {
        cropper.options.ready = () => {
          expect(image.src).to.include(imageURL);
          done();
        };

        expect(image.src).to.not.include(imageURL);
        cropper.replace(imageURL);
      },
    });
  });

  it('should replace the image url with a new one and handle different size when !this.isImg', (done) => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const imageURL = '/base/docs/images/picture-2.jpg';
    const cropper = new Cropper(canvas, {
      ready() {
        cropper.options.ready = () => {
          done();
        };

        cropper.url = '';
        cropper.replace(imageURL);
        expect(cropper.url).to.equal(imageURL);
      },
    });
  });

  it('should replace the image url with a new one and handle same size when this.ready', (done) => {
    const image = window.createImage();
    const imageURL = '/base/docs/images/picture-2.jpg';
    const cropper = new Cropper(image, {
      ready() {
        cropper.url = imageURL;
        cropper.image = { src: '' };
        cropper.viewBoxImage = { src: '' };
        cropper.previews = [document.createElement('div')];
        cropper.previews[0].innerHTML = '<img src="">';
        cropper.ready = true;
        cropper.isImg = false;

        cropper.replace(imageURL, true);

        expect(cropper.url).to.include(imageURL);
        expect(cropper.image.src).to.include(imageURL);
        expect(cropper.viewBoxImage.src).to.include(imageURL);
        cropper.previews.forEach(preview => {
          expect(preview.getElementsByTagName('img')[0].src).to.include(imageURL);
        });

        done();
      },
    });
  });

  it('should replace the image url with a new one and handle same size when !this.ready', (done) => {
    const image = window.createImage();
    const imageURL = '/base/docs/images/picture-2.jpg';
    const cropper = new Cropper(image, {
      ready() {
        cropper.url = imageURL;
        cropper.image = { src: '' };
        cropper.viewBoxImage = { src: '' };
        cropper.previews = [document.createElement('div')];
        cropper.previews[0].innerHTML = '<img src="">';
        cropper.ready = false;
        cropper.isImg = false;

        cropper.replace(imageURL, true);

        expect(cropper.url).to.include(imageURL);
        expect(cropper.image.src).to.include(imageURL);

        done();
      },
    });
  });

  after(() => {
    printReplaceCoverage();
  });
});
