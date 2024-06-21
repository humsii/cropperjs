# Report for Assignment 1

## Project chosen

Name: CropperJS

URL: [Link to original repository](https://github.com/fengyuanchen/cropperjs)

Number of lines of code and the tool used to count it: nloc is 14,139 and Lizard was used to count

Programming language: Javascript

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

The coverage result is shown in the below screenshot for the single source file, '__/src/js__'
![coverage_before](/readme_files/cropper_coverage_before.jpg)

### Your own coverage tool

<!-- <The following is supposed to be repeated for each group member>

<Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements> -->
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

- Function 1 name
- Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements
- Provide a screenshot of the coverage results output by the instrumentation

- Function 2 name
- same info as above

<b>Hums Awan</b>

- Function 1 name
- Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements
- Provide a screenshot of the coverage results output by the instrumentation

- Function 2 name
- same info as above

<b>Aron Visser</b>

- Function 1 name
- Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements
- Provide a screenshot of the coverage results output by the instrumentation

- Function 2 name
- same info as above

## Coverage improvement

### Individual tests

<The following is supposed to be repeated for each group member>

<b>Yeliz Durmaz</b>

_replace() in methods.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/dc334a38072d85497c63379c1d0f32f08ac5e5d1)

- Previous coverage result (7/10 branches hit)
![instrumentation for replace().before](/readme_files/instrumentation_replace_before.jpg)
- New coverage result (10/10 branches hit)
![instrumentation for replace().after](/readme_files/instrumentation_replace_after.jpg)

The test suite covered 10 of 10 branches, covering 3 more branches compared to the previous test suite. It resulted in a ~43% increase of branch coverage in _replace()_.

_getCroppedCanvas() in methods.js_

[Link to commit with improved test suite](https://github.com/humsii/cropperjs/commit/dc334a38072d85497c63379c1d0f32f08ac5e5d1)

- Previous coverage result (12/16 branches hit)
![instrumentation for getCroppedCanvas().before](/readme_files/instrumentation_getcroppedcanvas_before.jpg)
- New coverage result (16/16 branches hit)

The test suite covered 16 of 16 branches, covering 4 more branches compared to the previous test suite. It resulted in a ~33% increase of branch coverage in _getCroppedCanvas()_.

<b>Duc Manh Nguyen</b>

<Test 1>

<Show a patch (diff) or a link to a commit made in your forked repository that shows the new/enhanced test>

<Provide a screenshot of the old coverage results (the same as you already showed above)>

<Provide a screenshot of the new coverage results>

<State the coverage improvement with a number and elaborate on why the coverage is improved>

<Test 2>

<Provide the same kind of information provided for Test 1>

<b>Hums Awan</b>

<Test 1>

<Show a patch (diff) or a link to a commit made in your forked repository that shows the new/enhanced test>

<Provide a screenshot of the old coverage results (the same as you already showed above)>

<Provide a screenshot of the new coverage results>

<State the coverage improvement with a number and elaborate on why the coverage is improved>

<Test 2>

<Provide the same kind of information provided for Test 1>

<b>Aron Visser</b>

<Test 1>

<Show a patch (diff) or a link to a commit made in your forked repository that shows the new/enhanced test>

<Provide a screenshot of the old coverage results (the same as you already showed above)>

<Provide a screenshot of the new coverage results>

<State the coverage improvement with a number and elaborate on why the coverage is improved>

<Test 2>

<Provide the same kind of information provided for Test 1>

### Overall

<Provide a screenshot of the old coverage results by running an existing tool (the same as you already showed above)>

<Provide a screenshot of the new coverage results by running the existing tool using all test modifications made by the group>

#### Coverage Before, Overall:
![coverage_before](/readme_files/cropper_coverage_before.jpg)

#### Coverage Before, Overall:
![coverage_before](/readme_files/cropper_coverage_after.jpg)


## Statement of individual contributions

<Write what each group member did>

- Aron Visser <br>
text
- Duc Manh Nguyen <br>
text
- Hums Awan <br>
text
- Yeliz Durmaz <br> 
I focused on improving the coverage of the replace() and getCroppedCanvas() methods in methods.js. I identified branches in it that were not covered (or not taken at all) and improved their coverage. As my teammates helped review some of my code I also did this for my teammates. This helped me understand and unify our implementation for code instrumentation and test creation.
