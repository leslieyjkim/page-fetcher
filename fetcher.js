// arg from command line
const url = process.argv[2]; // must include 'http://www.example.com';
const filePath = process.argv[3];

// 1. HTTP request
const request = require("request");

request(url, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error("Error in the HTTP request:", error);
    return; //void
  } else {
    console.log(response);
  } //this is where I have access to the body of the response
});

// 2. download as file/ file writing

let body;
const fs = require("fs");

const fetchAndSave = function (url, filePath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Failed to download resource: ", error);
      return;
    }

    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.log("Failed to write to filaPath: ", filePath);
      } else {
        console.log(
          `Downloaded and saved ${
            Buffer.from(body).length
          } bytes to ${filePath}`
        );
      }
    });
  });
};
