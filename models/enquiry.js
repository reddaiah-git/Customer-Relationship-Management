// models/enquiry.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employee = require("./employee");

const Enquiry = sequelize.define("Enquiry", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  courseInterest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Relationship — each Enquiry belongs to one Counselor (Employee)
Employee.hasMany(Enquiry, { foreignKey: "counselorId" });
Enquiry.belongsTo(Employee, { foreignKey: "counselorId" });

module.exports = Enquiry;
