const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @route GET projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  const user = req.user;
  const projects = await Project.find({ user_id: user._id }).select("name description _id context");

  if (!projects) {
    res.status(400);
    throw new Error("Projects not found");
  }
  res.status(200).json(projects);
});

// @route POST projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
  const { name, description, context } = req.body;
  const user = req.user;

  if (!name) {
    res.status(400);
    throw new Error("Missing project name");
  }

  const project = await Project.create({
    name: name,
    description: description,
    user_id: user._id,
    context: context
  });

  res.status(200).json({
    _id: project._id,
    description: project.description,
    name: project.name,
    context: project.context
  });
});

// @route PUT projects
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  const { _id, name, description, context } = req.body
  const user = req.user

  if (!_id) {
    res.status(400);
    throw new Error("Missing project id");
  }

  const filter = {
    _id: _id,
    user_id: user._id
  };
  const update = {
    name: name,
    description: description,
    context: context
  };
  const options = { "new": "false" };

  const project = await Project.findOneAndUpdate(
    filter,
    update,
    options
  ).catch((err) => {
    if (err.name == "CastError") {
      res.status(400).json("The id you enter was not valid");
    }
  })

  if (!project) {
    res.status(400).json("Unable to update project, make sure the id is correct");
  }

  res.status(200).json({
    _id: project._id,
    name: project.name,
    description: project.description,
    context: project.context
  });
});

// @route DELETE projects
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  const _id = req.body._id;
  const user = req.user;

  if (!_id) {
    res.status(400);
    throw new Error("Missing project id");
  }

  const filter = {
    _id: _id,
    user_id: user._id
  };

  const project = await Project.findOneAndDelete(filter, {});

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  res.status(200).json({ _id });
});

// @route GET projects/:id
// @access Private
const getProjectById = asyncHandler(async (req, res) => {
  const user = req.user;
  const projectId = req.params.id;
  const filter = { user_id: user._id, _id: projectId };
  const project = await Project.findOne(filter).select("name description _id context");

  if (!project) {
    res.status(400);
    throw new Error("Projects not found");
  }
  res.status(200).json(project);
});


module.exports = {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
  getProjectById
};
