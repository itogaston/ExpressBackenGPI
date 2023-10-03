const { mongoose  } = require("mongoose");
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Sprint = require("../models/sprintModel");
const UserStory = require("../models/userStoryModel");

// @route GET userstories/:id
// @access Private
const getUserStories = asyncHandler(async (req, res) => {
    const project_id = req.params.id;

    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(project_id)){
        res.status(400);
        throw new Error("The project id is not valid")
    }
    const project = await Project.find(
        { 
            _id: mongoose.Types.ObjectId(project_id),
            user_id: user._id, 
        }
    );
    
    if (!project) {
        res.status(400);
        throw new Error("Project id not found");
    }
    
    const userstories = await UserStory.find({project_id: project_id});

    res.status(200).json(userstories);
});

// @route POST userstories
// @access Private
const setUserStory = asyncHandler(async (req, res) => {
    const user = req.user;
    const { 
        project_id, sprint_id, name, 
        priority, estimated, done,
        state, notes 
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(project_id)){
        res.status(400);
        throw new Error("The project id is not valid")
    }
    const project = await Project.find(
        { 
            _id: mongoose.Types.ObjectId(project_id),
            user_id: user._id, 
        }
    );
    
    if (!project) {
        res.status(400);
        throw new Error("Project id not found");
    }

    const doc = {
        project_id,
        sprint_id,
        name, 
        priority, 
        estimated, 
        done,
        state, 
        notes 
    }
    
    const userstory = await UserStory.create(doc);

    res.status(200).json(
        {
            _id: userstory._id,
            project_id: userstory.project_id,
            sprint_id: userstory.sprint_id,
            name: userstory.name, 
            priority: userstory.priority, 
            estimated: userstory.estimated, 
            done: userstory.done,
            state: userstory.state, 
            notes: userstory.notes, 
        }
    );
});

// @route PUT userstories
// @access Private
const updateUserStory = asyncHandler(async (req, res) => {
    const user = req.user;
    const { 
        _id, project_id, sprint_id, name, 
        priority, estimated, done,
        state, notes 
    } = req.body;

    if (!_id) {
        res.status(400);
        throw new Error("Missing user story id");
    }

    if (!mongoose.Types.ObjectId.isValid(project_id)){
        res.status(400);
        throw new Error("The project id is not valid")
    }

    const project = await Project.findOne(
        { 
            _id: mongoose.Types.ObjectId(project_id),
            user_id: user._id, 
        }
    );
    
    if (!project) {
        res.status(400);
        throw new Error("Project id not found");
    }

    const filter = {
        _id: _id,
        project_id: project._id
    };
    const update = {
        sprint_id: sprint_id, 
        name: name, 
        priority: priority, 
        estimated: estimated, 
        done: done,
        state: state, 
        notes : notes ,
    };
    const options = { "new": "false" };

    const userStory = await UserStory.findOneAndUpdate(
        filter,
        update,
        options
    ).catch((err) => {
        if (err.name == "CastError") {
            res.status(400).json("The id you enter was not valid");
        }
    })

    if (!userStory) {
        res.status(400).json("Unable to update user story, make sure the id is correct");
    }

    res.status(200).json(
        {
            _id: userStory._id,
            project_id: userStory.project_id,
            sprint_id: userStory.sprint_id,
            name: userStory.name, 
            priority: userStory.priority, 
            estimated: userStory.estimated, 
            done: userStory.done,
            state: userStory.state, 
            notes: userStory.notes, 
        }
    );
});

// @route DELETE userstories
// @access Private
const deleteUserStory = asyncHandler(async (req, res) => {
    const user = req.user;
    const _id = req.body;

    if (!_id) {
        res.status(400);
        throw new Error("Missing user story id");
    }

    if (!mongoose.Types.ObjectId.isValid(project_id)){
        res.status(400);
        throw new Error("The project id is not valid")
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

module.exports = {
    getUserStories,
    setUserStory,
    updateUserStory,
    deleteUserStory
};
