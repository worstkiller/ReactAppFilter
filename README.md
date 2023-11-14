Download the project and go inside the root folder **ReactAppFilter** for example like this.
<img width="691" alt="Screenshot 2023-11-14 at 1 03 49 PM" src="https://github.com/worstkiller/ReactAppFilter/assets/10533214/16cf3dc1-c743-42d9-9190-433a07731131">

Once you are inside the root project folder make sure npm is installed on your system if not installed go to here and install the nodejs installed which will install the nodejs and npm both.

https://nodejs.org/en/download/

Once the npm is installed, check by going to terminal and hit 
`npm --version`
if it gives the result then its installed.

Now move to next step and from inside the root project folder **ReactAppFilter** hit in terminal.
`npm start`

now your localhost project will be running on http://localhost:3000/ check in browser.

Now our project is running we need a proxy server in localhost to bypass the CORS issue in localhost.
hit this command in the terminal.

`npm install -g local-cors-proxy`

once installed run this command.

`lcp --proxyUrl https://play.google.com/store/apps/`

Now go to your http://localhost:3000/ and refresh it and start using it.

if you face any issues like port not matching etc.
 
go to src->MainComponent.js and change the value of **downLoadLink** as per proxy values.
by default its set to 8010, feel free to change to match the values returned by proxy command.
<img width="477" alt="Screenshot 2023-11-14 at 1 13 04 PM" src="https://github.com/worstkiller/ReactAppFilter/assets/10533214/d66e7fd0-2545-4153-a450-f1061c31a2d2">

`const downLoadLink = "http://localhost:8010/proxy/details?id=";`

Feel free to reach out if you face any issues.
