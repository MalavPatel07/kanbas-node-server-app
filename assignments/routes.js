import Database from "../Database/index.js";
function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.json(assignments);
  });
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = Database.assignments.find(
      (assignment) => assignment._id === id
    );
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.json(assignment);
  });
  app.get("/api/courses/:id/assignments", (req, res) => {
    const { id } = req.params;
    const assignments = Database.assignments.filter(
      (assignment) => assignment.course === id
    );
    res.json(assignments);
  });

  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex(
      (assignment) => assignment._id === id
    );
    if (index === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    Database.assignments.splice(index, 1);
    res.json(204);
  });
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      course: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.unshift(newAssignment);
    res.json(newAssignment);
  });
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex(
      (assignment) => assignment._id === id
    );
    if (index === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    Database.assignments[index] = {
      ...Database.assignments[index],
      ...req.body,
    };
    res.json(200);
  });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = Database.assignments.filter(
        (assignment) => assignment.course === cid
        );
        res.json(assignments);
    });
}
export default AssignmentRoutes;