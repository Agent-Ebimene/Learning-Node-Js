const Joi = require("joi"); // returns a class
const express = require("express");
const app = express();
// function to allow our app to accept data in json format
app.use(express.json());

// An example of default data from a database

const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

// sending a get http request to acces the home page
app.get("/", (req, res) => {
  res.send("Express web Service");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// sending a post http request to update data
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// sending a get http request
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

// Sending an http request Put request to update a data in the data base

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with the given ID was not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
  res.send(course);
  console.log("The course has been updated");
});

app.delete("/api/courses/:id", (req, res) => {
  //Look up the course
  // return 404 if course does not exist
  // Delete and return the deleted course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} now!`);
});
