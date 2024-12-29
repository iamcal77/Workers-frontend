import React, { useEffect, useState } from "react";
import { PieChart, Series, Label, Legend, Tooltip } from "devextreme-react/pie-chart";
import axios from "axios";

const PaymentStatusDashboard = () => {
  const [paymentStats, setPaymentStats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://localhost:7050/api/workers/payment-stats", {
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

export default PaymentStatusDashboard;
