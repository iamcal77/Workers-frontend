import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, Series, Legend, ArgumentAxis, ValueAxis, Tooltip } from 'devextreme-react/chart';
import 'devextreme/dist/css/dx.light.css';
import { Title } from 'devextreme-react/cjs/circular-gauge';

function EmploymentStatsDashboard() {
  const [employmentStats, setEmploymentStats] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    const fetchEmploymentStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get('https://localhost:7050/api/workers/employment-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmploymentStats(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchEmploymentStats();
  }, []);

  

  return (
    <div className="container">
      {employmentStats.length > 0 ? (
        <Chart
          id="employmentStatsChart"
          dataSource={employmentStats}
        >
          <ArgumentAxis>
            <Title text="Employment Type" />
          </ArgumentAxis>
          <ValueAxis>
            <Title text="Count" />
          </ValueAxis>
          <Series
            valueField="count"
            argumentField="employmentType"
            name="Workers"
            type="bar"
            color="#4caf50"
          />
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
        </Chart>
      ) : (
        <p>No employment statistics available.</p>
      )}
    </div>
  );
}

export default EmploymentStatsDashboard;
