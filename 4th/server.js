const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.urlencoded({ extended: true }));
// Show form
app.get("/", (req, res) => {
res.sendFile(__dirname + "/form.html");
});
// Save form data
app.post("/save", (req, res) => {
let data = [];
if (fs.existsSync("data.json")) {
data = JSON.parse(fs.readFileSync("data.json"));
}
data.push(req.body);
fs.writeFileSync("data.json", JSON.stringify(data));

res.send("Data Stored Successfully");
});
// Display stored data
app.get("/display", (req, res) => {
let data = [];
if (fs.existsSync("data.json")) {
data = JSON.parse(fs.readFileSync("data.json"));
}
res.send(data);
});
// Start server
app.listen(3000, () => {
console.log("Server running on port 3000"); });