const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// ================= GET ALL PROJECTS (Public) =================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= CREATE PROJECT (Protected) =================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;

    if (!title || !description || !techStack || !githubLink || !liveLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({
      title,
      description,
      techStack,
      githubLink,
      liveLink
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= UPDATE PROJECT (Protected) =================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        techStack,
        githubLink,
        liveLink
      },
      {
        returnDocument: "after",   // ✅ Mongoose 7+ way
        runValidators: true        // ✅ Ensures schema validation
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= DELETE PROJECT (Protected) =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;