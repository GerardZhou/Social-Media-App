import express from "express";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.json({
    data: "Hit the signup endpoint",
  });
});

router.get("/login", (req, res) => {
  res.json({
    data: "Hit the login endpoint",
  });
});

router.get("/logout", (req, res) => {
  res.json({
    data: "Hit the logout endpoint",
  });
});

export default router;
