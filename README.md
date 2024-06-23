# Report for Assignment 1

## Project chosen

<b>Name</b>: CropperJS

<b>URL</b>: [Link to original repository](https://github.com/fengyuanchen/cropperjs)

<b>Number of lines of code and the tool used to count it</b>: nloc is 14,139 and Lizard was used to count

<b>Programming language</b>: Javascript

## Coverage measurement

### Existing tool

To measure the coverage of the tests, we used Karma with the ChromeHeadless browser and coverage reporter. The command was executed as follows:

``` javascript
npm test
```

This command corresponds to the below script in package.json:

``` json
"scripts": {
...
"test": "karma start",
...
}
```

***Karma Configuration Explanation***
* <i>Frameworks</i> <br>
We use Mocha as the testing framework for writing and running tests. 

* <i>Files in testing environment</i>:
    - '__node_modules/chai/chai.js__': Chai is the assertion library.
    - '__src/js__': The JavaScript source folder of the project.
    - '__test/specs/**/*.spec.js__': The files with the tests.

* <i>Preprocessors</i> <br>
We preprocess '__src/js__' for coverage. This means that before running the tests, Karma will check this folder its files recursively to measure how much of the code is covered by the tests.

* <i>Reporters</i> <br>
    - '__progress__': Reports the progress of the tests in the console.
    - '__coverage__': Generates a code coverage report.

* <i>Browsers</i> <br>
We use '__ChromeHeadless__', a headless browser, to run the tests. This allows for running the tests without needing a graphical user interface.

* <i>Coverage Reporter</i> <br>
    - type: '__html__': Generates the coverage report in HTML format.
    - dir: '__coverage/__': Outputs the coverage report to the coverage/ directory.


Of course, to be able to run these commands you must be sure you installed all dependencies of the project, which includes Karma, ChromeHeadless, Mocha, Chai, and other related packages in package.json. These required dependencies can all be installed at once by running the following command:

``` javascript
npm install
```

#### Coverage Result

The coverage result is shown in the below screenshot for the source folder, '__/src/js__':
![coverage_before](/readme_files/cropper_coverage_before.jpg)

### Your own coverage tool
<b>Yeliz Durmaz</b>

_Replace() in methods.js_

[Link to commit with instrumented code](https://github.com/humsii/cropperjs/commit/a69ef1ebcc604379442ec91869c850eeebb91864?diff=unified&w=0)

7/10 branches hit
![instrumentation for replace().before](/readme_files/instrumentation_replace_before.jpg)

_getCroppedCanvas in methods.js_

[Link to commit with instrumented code](https://github.com/humsii/cropperjs/commit/89865230dcba9f28bd1ee363ffa3e55ceb0c2f26)

12/16 branches hit
![instrumentation for getCroppedCanvas().before](/readme_files/instrumentation_getcroppedcanvas_before.jpg)

<b>Duc Manh Nguyen</b>

_destroy() in methods.js_

[Link to commit with instrumented code](https://github.com/humsii/cropperjs/commit/96ac02905d4a680ce7d91f22e799a6933f962c88)

2/4 branches hit

![instrumentation for destroy().before](/readme_files/instrumentation_destroy_before_v2.png)

_setCropBoxData() in methods.js_

[Link to commit with instrumented code](https://github.com/humsii/cropperjs/commit/96ac02905d4a680ce7d91f22e799a6933f962c88)

0/2 branches hit

![instrumentation for destroy().before](/readme_files/instrumentation_setCropBoxData_before_v2.png)

<b>Hums Awan</b>

_init() in cropper.js_

[Link to commit with instrumented code](https://github.com/humsii/cropperjs/commit/960fc91c70f11ef41fd1951b08f8df1f7ec80c21)

3/6 branches hit

![instrumentation for init().before](/readme_files/instrumentation_init_before.png)

_unbuild() in cropper.js_

[Link to commit with instrumented code](https://github.com/humsii/cropperjs/commit/960fc91c70f11ef41fd1951b08f8df1f7ec80c21)

2/3 branches hit

![instrumentation for unbuild().before](/readme_files/instrumentation_unbuild_before.png)

<b>Aron Visser</b>

- Function 1 name
- Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements
- Provide a screenshot of the coverage results output by the instrumentation (BEFORE TEST IMPROVEMENT!)

- Function 2 name
- same info as above

## Coverage improvement

### Individual tests
<b>Yeliz Durmaz</b>

_replace() in methods.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/dc334a38072d85497c63379c1d0f32f08ac5e5d1)

- Previous coverage result (7/10 branches hit)
![instrumentation for replace().before](/readme_files/instrumentation_replace_before.jpg)
- New coverage result (10/10 branches hit)
![instrumentation for replace().after](/readme_files/instrumentation_replace_after.jpg)

The test suite covered 10 of 10 branches, covering 3 more branches compared to the previous test suite. It resulted in a ~43% increase of branch coverage in _replace()_. The function coverage is now 100%.

_getCroppedCanvas() in methods.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/dc334a38072d85497c63379c1d0f32f08ac5e5d1)

- Previous coverage result (12/16 branches hit)
![instrumentation for getCroppedCanvas().before](/readme_files/instrumentation_getcroppedcanvas_before.jpg)
- New coverage result (16/16 branches hit)
![instrumentation for getCroppedCanvas().before](/readme_files/instrumentation_getcroppedcanvas_after.jpg)

The test suite covered 16 of 16 branches, covering 4 more branches compared to the previous test suite. It resulted in a ~33% increase of branch coverage in _getCroppedCanvas()_. The function coverage is now 100%.

<b>Duc Manh Nguyen</b>

_destroy() in methods.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/3cdabe15987060ee49967b9f4b9e14249eef46d5)

- Previous coverage result (2/4 branches hit)<br>
![instrumentation for replace().before](/readme_files/instrumentation_destroy_before_v2.png)
- New coverage result (4/4 branches hit)<br>
![instrumentation for replace().after](/readme_files/instrumentation_destroy_after_v2.png)

The test suite covered 4 of 4 branches, covering 2 more branches compared to the previous test suite. It resulted in a ~100% increase of branch coverage in _destroy()_. The function coverage is now 100%.

_setCropBoxData() in methods.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/3cdabe15987060ee49967b9f4b9e14249eef46d5)

- Previous coverage result (0/2 branches hit)<br>
![instrumentation for replace().before](/readme_files/instrumentation_setCropBoxData_before_v2.png)
- New coverage result (2/2 branches hit)<br>
![instrumentation for replace().after](/readme_files/instrumentation_setCropBoxData_after_v2.png)

The test suite covered 2 of 2 branches, covering 2 more branches compared to the previous test suite. It improved from covering no branches at all to covering all branches in _setCropBoxData()_. The function coverage is now 100%.

<b>Hums Awan</b>

_init() in cropper.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/960fc91c70f11ef41fd1951b08f8df1f7ec80c21)

- Previous coverage result (3/6 branches hit)<br>
![instrumentation for init().before](/readme_files/instrumentation_init_before.png)

- New coverage result (6/6 branches hit)<br>
![instrumentation for init().after](/readme_files/instrumentation_init_after.png)

The test suite covered 6 of 6 branches, covering 3 more branches compared to the previous test suite. It resulted in a ~100% increase of branch coverage in _init()_. The function coverage is now 100%.

_unbuild() in cropper.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/960fc91c70f11ef41fd1951b08f8df1f7ec80c21)

- Previous coverage result (2/3 branches hit)<br>
![instrumentation for unbuild().before](/readme_files/instrumentation_unbuild_before.png)
- New coverage result (3/3 branches hit)<br>
![instrumentation for unbuild().after](/readme_files/instrumentation_unbuild_after.png)

The test suite covered 3 of 3 branches, covering 1 more branch compared to the previous test suite. It resulted in a ~50% increase of branch coverage in _unbuild()_. The function coverage is now 100%.

<b>Aron Visser</b>

_function 1 name_

[Link to commit with improved test suite](putyourlinkhere)


- Previous coverage result (2/3 branches hit)<br>
![instrumentation results for functionName.before](/readme_files/screenshotbefore)
- New coverage result (3/3 branches hit)<br>
![instrumentation results for functionName.after](/readme_files/screenshotafter.png)

The test suite covered <numbranchesbefore> OF <numbranchestotal> branches, covering <numbranchesincrease> more branches compared to the previous test suite. It resulted in a <PERCENTAGE>% increase of branch coverage in _<functionName>()_. The function coverage is now <totalbranchcoverage>%.

_function 2 name_

[Link to commit with improved test suite](putyourlinkhere)

- Previous coverage result (2/3 branches hit)<br>
![instrumentation results for functionName.before](/readme_files/screenshotbefore)
- New coverage result (3/3 branches hit)<br>
![instrumentation results for functionName.after](/readme_files/screenshotafter.png)

The test suite covered <numbranchesbefore> OF <numbranchestotal> branches, covering <numbranchesincrease> more branches compared to the previous test suite. It resulted in a <PERCENTAGE>% increase of branch coverage in _<functionName>()_. The function coverage is now <totalbranchcoverage>%.

### Overall

#### Coverage Before, Overall:
![coverage_before](/readme_files/cropper_coverage_before.jpg)

#### Coverage After, Overall:
![coverage_after](/readme_files/cropper_coverage_after.jpg)


## Statement of individual contributions

<Write what each group member did>

- Aron Visser <br>
text
- Duc Manh Nguyen <br>
I focused on improving the coverage of the destroy() and setCropBoxData() methods in methods.js. I assisted in finding a valid repository and analyzing the initial coverage percentage of the code. I wrote the intrumentation and new tests for the methods I mentioned. I helped me teammates review their commits and vice versa. This provided insights for me regarding the best way to implement our coverage tool in the most effective way possible. 
- Hums Awan <br>
I focused on improving the coverage of the init() and unbuild() methods in cropper.js by identifying untested branches using our coverage tool. I wrote instrumentation for these functions and created new test suites (init.spec.js and unbuild.spec.js) in the test/specs/methods directory to cover the various conditional paths.
- Yeliz Durmaz <br> 
I focused on improving the coverage of the replace() and getCroppedCanvas() methods in methods.js. I identified branches in it that were not covered (or not taken at all) and improved their coverage. As my teammates helped review some of my code I also did this for my teammates. This helped me understand and unify our implementation for code instrumentation and test creation.
