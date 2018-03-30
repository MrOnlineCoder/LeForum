# About
LeForum is simple forum engine, powered by Node.js and Vue.
LeForum can be used as a discussion board for your project, community or website.

# Features

* Frontend is powered by [Vue.js](https://vuejs.org/) - fast and lightweight Javascript framework.
* Meanwhile, backend is powered by popular Node.js web-server - [Express](http://expressjs.com/), combined with [mongoose](https://www.npmjs.com/package/mongoose) - object modeling tool for NoSQL database - the [MongoDB](https://www.mongodb.com/).
* Forum has simple and minimalistic UI, heavily powered by [Bootstrap 4](https://getbootstrap.com/).
* Powerful user groups and permissions system
* Built-in WYSIWYG posts editor - [Quill](https://quilljs.com/)
* and a lot of small other features!

# Getting Started

Installation of LeForum is fairly easy.

### Prerequisites
You need some things installed and setup on your target machine to get LeForum working:

1. [Node.js](https://nodejs.org/en/download/) (prefably latest stable version)
2. [MongoDB Server](https://www.mongodb.com/download-center?jmp=nav)

## Installation
* Download latest LeForum release.
* Extract archive contents
* Install LeForum dependencies
```bash
# browse to folder, where you have extracted LeForum sources
cd myforum
# install dependencies using npm
npm install
```
* **Optional.** By default, LeForum server will start listening for incoming connections on port 3000. This is useful when you use some type of proxy like nginx to redirect incoming connections. But you can change this value by setting **PORT** environment variable.

```bash
# Windows
set PORT=80

# Linux
export PORT=80
```
* Start LeForum server. You can also start it with [pm2](https://www.npmjs.com/package/pm2) or any other nodejs process manager to run LeForum forever.
```bash
# start leforum server using nodejs cli tool (or via nodemon, pm2 or any other management tool)
node server.js
```
6. Browse to [localhost:3000/#/install](http://localhost:3000/#/install) to finish installation process in browser (replace 3000 with your port)
