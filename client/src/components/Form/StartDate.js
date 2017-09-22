import React from "react";

export const StartDate = props =>
  <div className="form-group">
    <label>Start Date:</label>
    <input id="startDate" type="date" {...props} />
  </div>;
