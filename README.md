# Guitar Dashboard
An interactive music theory dashboard for guitarists. http://guitardashboard.com/

The aim is to provide a graphical representation of music theory elements (scales, modes, chords etc) mapped to a guitar fretboard.

## Developing with VS Code

Guitar Dashboard is written in Typescript using VS Code. Make all code changes in the src/*.ts files. Compilation outputs to the docs folder, do not edit the *.js or *.js.map files in this directory. They are included in the source repository because the website is hosted in GitHub pages which does not support Typescript compilation.

1. Clone or fork-and-clone this repository.
2. File -> Open folder at the root directory of the cloned repository.
3. Build should just work (ctrl-shift-B).
4. To run locally using lite-server:
    - npm install 
    - npm start
5. Browse to http://localhost:10001/
6. Edit the src/*.ts, index.html and gtr-cof.css files.
7. Compile.
8. Commit, push to GitHub and create a pull request :)


## Developing without VS Code

First, make sure you have TypeScript installed. If not, `npm install -g typescript` will do the trick.

1. Clone the repo and go into it
2. Run `npm install`
3. Open a shell and run `tsc --watch` so that the sources are always rebuilt automatically on source changes
4. Open another shell and run `npm start` in it so that results will be visible in a browser
5. Browse to http://localhost:10001/
6. Edit the src/*.ts, index.html and gtr-cof.css files.
7. Commit, push to GitHub and create a pull request :)





