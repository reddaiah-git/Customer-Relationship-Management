require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
const employeeRoutes = require("./routes/employeeRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

app.use("/api/employees", employeeRoutes);
app.use("/api/enquiries", enquiryRoutes);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // ✅ Log all routes after server starts
  if (app._router && app._router.stack) {
    console.log("\n📋 Registered Routes:");
    app._router.stack
      .filter((r) => r.route)
      .forEach((r) => {
        const method = Object.keys(r.route.methods)[0].toUpperCase();
        console.log(`${method} ${r.route.path}`);
      });
  } else {
    console.log("⚠️ No routes registered yet or app._router undefined.");
  }
});
