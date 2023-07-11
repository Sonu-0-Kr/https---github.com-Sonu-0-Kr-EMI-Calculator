import './EmiCalculator.css';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const EmiCalculator = () => {
  const [principal, setPrincipal] = useState();
  const [interestRate, setInterestRate] = useState();
  const [loanTerm, setLoanTerm] = useState();
  const [emi, setEmi] = useState(0);
  const [chartData, setChartData] = useState(null);

  const calculateEmi = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (p && r && n) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiValue.toFixed(2));

      const emiChartData = {
        labels: ['Principal Amount', 'Interest'],
        datasets: [
          {
            data: [p, emiValue - n],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };

      setChartData(emiChartData);
    }
  };

  const resetCalculator = () => {
    setPrincipal(0);
    setInterestRate(0);
    setLoanTerm(0);
    setEmi(0);
    setChartData(null);
  };

  return (
    <div style={{ backgroundColor: 'rgb(110,228,232)' }}>
      <div className="emi-container card">
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <div>
            <h2 className="emi-border">EMI Calculator</h2>

            <div className="emi-input">
              <label>Loan Amount:</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="emi-input">
              <label>Interest Rate (% per annum):</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="emi-input">
              <label>Loan Term (in years):</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="form-control"
              />
            </div>
            <br />
            <button className="emi-button" onClick={calculateEmi}>
              Calculate EMI
            </button>
            <button className="emi-button" onClick={resetCalculator}>
              Reset
            </button>
            <h3 className="emi-result">MONTHLY EMI: {emi}</h3>
          </div>

          <div className="emi-chart" style={{ marginLeft: '300px', marginTop: '60px' }}>
            {chartData && <Pie data={chartData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
