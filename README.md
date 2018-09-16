# Guitar Dashboard
An interactive music theory dashboard for guitarists. http://guitardashboard.com/

The aim is to provide a graphical representation of music theory elements (scales, modes, chords etc) mapped to a guitar fretboard.

## Developing with VS Code

Guitar Dashboard is written in Typescript using VS Code. Make all code changes in the src/*.ts files. Compilation outputs to the docs folder, do not edit the *.js or *.js.map files in this directory. They are included in the source repository because the website is hosted in GitHub pages which does not support Typescript compilation.

1. Clone or fork-and-clone this repository.
2. File -> Open folder at the root directory of the cloned repository.
4. To develop locally using lite-server:
    - npm install
    - npm dev
5. Browse to http://localhost:10001/
6. Edit the src/*.ts, index.html and gtr-cof.css files.
8. Commit, push to GitHub and create a pull request :)

## Developing with your browser

[Open in Gitpod](https://gitpod.io#https://github.com/mikehadlow/gtr-cof) - launches a cloud container, install dependencies, start a dev server and opens it in a VS-code like browser IDE.
