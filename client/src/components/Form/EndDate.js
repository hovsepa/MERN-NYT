import React from "react";

export const EndDate = props =>
    <div className="form-group">
        <label>End Date:</label>
        <input id="endDate" type="date" {...props} />
    </div>;
