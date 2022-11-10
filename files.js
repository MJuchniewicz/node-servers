const fs = require("fs");

// fs.readFile("./docs/blog1.txt", (err, data) => {
//  if (err) {
//    console.log(err);
//  }
//  console.log(data.toString());
// });

// fs.writeFile("./docs/blog1.txt", "hello", () => {
//   console.log("first");
// });

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("created first");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder deleted");
  });
}

if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File deleted");
  });
}
