<a name="readme-top"></a>
<div align="center">
  <h1 align="center">Faites passer une librairie jQuery vers React</h1>

  <p align="center">
    Open-Classroom, P14/14, Formation Développeur Front-End, Javascript React mars2022/mai2023
    <br />
    All Open-Classroom projects have a scenario to propose practise close to real work situation.
  </p>
</div>

<details>
  <summary>Table des matières</summary>
  <ol>
    <li><a href="# HRNet project for Wealth Health society">  HRNet project for Wealth Health society: scenario</a>
    <ul>
      <li><a href="#Conversion">Conversion/a></li>
      <li><a href="#Plugin">Plugin</a></li>
      <li><a href="#And performance tests">And performance tests</a></li>
    </ul></li>
    <li><a href="#General-information">General information</a>
    <ul>
        <li><a href="#Built-with">Built with</a></li>
        <li><a href="#Technologies">Technologies</a></li>
        <li><a href="#Structure">Structure</a></li>
      </ul></li>
      <li><a href="#Getting-start">Getting start</a>
      <ul>
        <li><a href="#Prerequisites">Prerequisites</a></li>
        <li><a href="#Database">Database</a></li>
        <li><a href="#Back-end">Back-end</a></li>
        <li><a href="#Front-end">Front-end</a></li>
      </ul></li>
      <li><a href="#Author">Author</a></li>
  </ol>
</details>

# HRNet project for Wealth Health society.

Wealth Health is a huge financial society which use an internal Web application that manage employees files.
This web application, called HRNet, currently use jQuery on the front-end ([HRNet jQuery version repository](https://github.com/OpenClassrooms-Student-Center/P12_Front-end)), which leads on numerous bugs.

### Conversion
**The main purpose of this project is to convert the HRNet jQuery project in React.**
### Plugin
Then, code the modal plugin in a react component as a library and import it in the HRNet project.
In the [HRNet jQuery version repository](https://github.com/OpenClassrooms-Student-Center/P12_Front-end), there is 4 issues highlighted, I choose the modal issue to settle and code the plugin from the [modal Jquery code](https://github.com/kylefox/jquery-modal) to [modal React component code in npm](https://www.npmjs.com/package/react-modal-tuv39) or [code in github](https://github.com/SuperSandrine/Project-14-HRNet-plugin/blob/main/README.md)

### And performance tests
At last, audit both web apps, in the new and old versions, with lighthouse performance tests.

Reports are available in the PROJECT-14-HRNet/Lighthouse reports/
There are four reports in .json extension that can be consulted with [lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/).

## General information

### Built with

- [![Vite in a badge][ViteBadge]](https://vitejs.dev/)
- ![React in a badge][ReactBadge]
- ![Redux in badge][ReduxBadge]
- [![MaterialUI in badge][MaterialUIBadge]](https://v4.mui.com/fr/getting-started/installation/)
- ![ VS in a badge][VisualStudioBadge]
- ![ Git in a badge][GitBadge]
- ![ GitHub in a badge][GitHubBadge]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Technologies

- ![html][HtmlBadge]
- ![css][CssBadge]
- ![JS][JsBadge]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Structure

```bash
PROJECT-14-HRNet/
|
|-HRNet-Front-end/
|  |- ...(package & config)
|  |
|  |- public/
|  |   |-favicon.svg
|  |
|  |- src/
|      |- layout/
|      |- components/
|      |      |-Component1
|      |            |- Component1.jsx
|      |            |- Sub-component1.jsx
|      |            |- Sub-component1.2.jsx
|      |            |- Sub-component1.data.jsx
|      |- pages/
|      |- utils/
|      |- main.jsx
|
|-Lighthouse reports/
|  |-report1.json
|
|-README.md 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting start

This repo contains all the front-end and back-end code to run the BankArgent web app. 
I'll provide the step by step to get start in an apple environment case.


### Prerequisites

- ![Node][NodeBadge]
- ![Npm][NpmBadge]

<p align="right">(<a href="#readme-top">back to top</a>)</p> 

#### Let's Go:
**1.** Fork the repository
**2.** Clone it on your computer
```sh
git clone https://github.com/SuperSandrine/Project-14-HRNet.git
```

**3.** then you can get in the HRNet-Front-end
```sh
 cd HRNet-Front-end
```

**4.** Install the dependencies with :
```sh
 npm install
```

**5.** Run the front
```sh
npm run dev
```

Wait for a second and you should see:

```console
VITE v4.1.3 ready in 289 ms
➜ Local: http://127.0.0.1:5173/
➜ Network: use --host to expose
➜ press h to show help
```

If the navigator window did not open, your can use the link provide in your terminal at 'local', which is your local port.


Enjoy !

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Author

![author][MeBadge]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[MeBadge]: https://img.shields.io/badge/Author-Sandrine%20Mestas-blue?style=for-the-badge
[JsBadge]: https://img.shields.io/badge/Language-JavaScript-yellow
[CssBadge]: https://img.shields.io/badge/Language-css-blue
[HtmlBadge]: https://img.shields.io/badge/Language-html-orange
[ReactBadge]: https://img.shields.io/badge/Library-React-mediumaquamarine
[ReduxBadge]: https://img.shields.io/badge/Library-Redux-blueviolet
[MaterialUIBadge]: https://img.shields.io/badge/Library-MaterialUI-dodgerblue
[VisualStudioBadge]: https://img.shields.io/badge/IDE-VisualStudio-steelblue
[ViteBadge]: https://img.shields.io/badge/Frontend%20Tooling-Vite-orchid
[GitBadge]: https://img.shields.io/badge/Versionning-Git-orangered
[GitHubBadge]: https://img.shields.io/badge/Versionning-GitHub-black
[NodeBadge]: https://img.shields.io/badge/Node-v%2014.21.3-forestgreen
[NpmBadge]: https://img.shields.io/badge/Npm-v%206.14.18-firebrick

