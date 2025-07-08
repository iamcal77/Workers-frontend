import React, { useEffect, useState } from "react";
import { PieChart, Series, Label, Legend, Tooltip } from "devextreme-react/pie-chart";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Get API base URL from environment variables

const ApprovalStats = () => {
  const [paymentStats, setPaymentStats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE_URL}/api/workers/approval-stats`, { // Use the dynamic API base URL
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPaymentStats(response.data))
      .catch((error) => console.error("Error fetching payment stats:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <PieChart
        id="doughnut"
        dataSource={paymentStats}
        type="doughnut"
      >
        <Series
          argumentField="paymentStatus"
          valueField="count"
        >
          <Label visible={true} />
        </Series>
        <Legend horizontalAlignment="center" verticalAlignment="bottom" />
        <Tooltip enabled={true} />
      </PieChart>
    </div>
  );
};

export default ApprovalStats;
