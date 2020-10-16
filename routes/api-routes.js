const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts",  ({ body}, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(params.id);
  console.log(body);
  
  Workout.findByIdAndUpdate(
    params.id,
    {$push: {exercises: body}},
    {new: true, runValidators: true}
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log(dbWorkout +"  ; dbworkout")
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find()
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
