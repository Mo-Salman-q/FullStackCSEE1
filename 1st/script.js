

function calculate() {
let name = document.getElementById("name").value.trim();
let m1Field = document.getElementById("m1");
let m2Field = document.getElementById("m2");
let m3Field = document.getElementById("m3");
if (// Empty field check
name === "" ||
m1Field.value === "" ||
m2Field.value === "" ||
m3Field.value === ""
) {
alert("Please fill all fields!");
return;
}
let m1 = Number(m1Field.value);
let m2 = Number(m2Field.value);
let m3 = Number(m3Field.value);
if ( // Range check
m1 < 0 || m1 > 100 ||
m2 < 0 || m2 > 100 ||
m3 < 0 || m3 > 100

) {
alert("Please enter marks between 0 and 100!");
return;
}
let total = m1 + m2 + m3;
let avg = total / 3;
let grade;
// Individual fail condition
if (m1 < 50 || m2 < 50 || m3 < 50) {
grade = "Fail ";
}
else if (avg >= 80) grade = "A ";
else if (avg >= 60) grade = "B ";
else grade = "C ";

document.getElementById("result").innerHTML =
"Hello " + name + "<br>" +
"Total: " + total + "<br>" +
"Average: " + avg.toFixed(2) + "<br>" +
"Result: " + grade;
}