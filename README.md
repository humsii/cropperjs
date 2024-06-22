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
We use Mocha as the testing framework. Mocha is a flexible framework for writing and running tests.

* <i>Files in testing environment</i>:
    - '__node_modules/chai/chai.js__': Chai is the assertion library.
    - '__src/index.js__': The JavaScript source file of the project.
    - '__test/specs/**/*.spec.js__': The file with the tests.

* <i>Preprocessors</i> <br>
We preprocess '__src/index.js__' for coverage. This means that before running the tests, Karma will check this file to measure how much of the code is covered by the tests.

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

The coverage result is shown in the below screenshot for the single source file, '__/src/index.js__'
![coverage_before](<TODO>)

### Your own coverage tool

<The following is supposed to be repeated for each group member>

<Group member name>

<Function 1 name>

<Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements>

<Provide a screenshot of the coverage results output by the instrumentation>

<Function 2 name>

<Provide the same kind of information provided for Function 1>

## Coverage improvement

### Individual tests

<The following is supposed to be repeated for each group member>

<Group member name>

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

## Statement of individual contributions

<Write what each group member did>
