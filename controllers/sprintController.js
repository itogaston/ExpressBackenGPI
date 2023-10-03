const asyncHandler = require("express-async-handler");
const Sprint = require("../models/sprintModel");
const Project = require("../models/projectModel");

// @route GET sprints/:id
// @access Private
const getSprints = asyncHandler(async (req, res) => {
    const user = req.user;
    const project_id = req.params.id;
    const projects = await Project.find({ user_id: user._id }).select("_id");

    if (!allow_access(project_id, projects)) {
        res.status(400);
        throw new Error("Project not found");
    }

    const sprints = await Sprint.find({ project_id: project_id }).select(
        "number description start_date finish_date"
    )

    res.status(200).json(sprints);
});

// @route POST sprint
// @access Private
const setSprint = asyncHandler(async (req, res) => {
    const { project_id, number, description, start_date, finish_date } = req.body;
    const user = req.user;
    const projects = await Project.find({ user_id: user._id }).select("_id");

    if (!project_id || !number) {
        res.status(400);
        throw new Error("Missing project_id or number");
    }

    if (!allow_access(project_id, projects)) {
        res.status(400);
        throw new Error("Project not found");
    }

    const sprint = await Sprint.create({
        project_id: project_id,
        number: number,
        description: description,
        start_date: start_date,
        finish_date: finish_date
    });

    res.status(200).json({
        _id: sprint._id,
        number: sprint.number,
        description: sprint.description,
        start_date: sprint.start_date,
        finish_date: sprint.finish_date
    });
});

// @route PUT sprint
// @access Private
const updateSprint = asyncHandler(async (req, res) => {
    const { _id, number, description, start_date, finish_date } = req.body;
    const user = req.user;
    const projects = await Project.find({ user_id: user._id }).select("_id");
    const project_ids = projects.map(project => project._id);

    if (!_id || !number) {
        res.status(400);
        throw new Error("Missing _id or number");
    }

    if (!project_ids) {
        res.status(400);
        throw new Error("You don't have any projects active");
    }

    const filter = {
        _id: _id,
        project_id: { $in: project_ids }
    };
    const update = {
        number: number,
        description: description,
        start_date: start_date,
        finish_date: finish_date
    };
    const options = { "new": "false" };

    const sprint = await Sprint.findOneAndUpdate(
        filter,
        update,
        options
    ).catch((err) => {
        if (err.name == "CastError") {
            res.status(400).json("The id you enter was not valid");
        }
    })

    if (!sprint) {
        res.status(400).json("Unable to update sprint, make sure the id is correct");
    }

    res.status(200).json({
        _id: sprint._id,
        number: sprint.number,
        description: sprint.description,
        start_date: sprint.start_date,
        finish_date: sprint.finish_date
    });
});


// @route DELETE project
// @access Private
const deleteSprint = asyncHandler(async (req, res) => {
    const _id = req.body._id;
    const user = req.user;
    const projects = await Project.find({ user_id: user._id }).select("_id");
    const project_ids = projects.map(project => project._id);

    if (!_id) {
        res.status(400);
        throw new Error("Missing sprint id");
    }

    if (!project_ids) {
        res.status(400);
        throw new Error("You don't have any projects active");
    }

    const filter = {
        _id: _id,
        project_id: { $in: project_ids }
    };

    const sprint = await Sprint.findOneAndDelete(filter, {});

    if (!sprint) {
        res.status(400);
        throw new Error("Sprint not found");
    }

    res.status(200).json({ _id });
});

function allow_access(project_id, project_list) {
    const allow_access = project_list.filter(
        (project) => project._id.equals(project_id)
    ).length !== 0
    return allow_access;
}

module.exports = {
    getSprints,
    setSprint,
    updateSprint,
    deleteSprint
};
