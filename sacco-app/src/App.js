import React, { useState } from "react";

const members = [
  {
    id: "001",
    name: "John Doe",
    pin: "1234",
    balance: 1500,
    loans: [{ id: "LN001", amount: 500, status: "outstanding" }],
    transactions: [
      { date: "2025-05-01", type: "Deposit", amount: 500 },
      { date: "2025-05-10", type: "Withdrawal", amount: 200 }
    ]
  }
];

function App() {
  const [pin, setPin] = useState("");
  const [member, setMember] = useState(null);

  const handleLogin = () => {
    const m = members.find(mem => mem.pin === pin);
    if (m) setMember(m);
    else alert("Invalid PIN");
  };

  const downloadPDF = () => {
    import("jspdf").then(jsPDF => {
      const doc = new jsPDF.jsPDF();
      doc.text(`Account Statement for ${member.name}`, 10, 10);
      member.transactions.forEach((tx, i) => {
        doc.text(`${tx.date} - ${tx.type}: $${tx.amount}`, 10, 20 + i * 10);
      });
      doc.save(`${member.name}-statement.pdf`);
    });
  };

  if (!member) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Member Login</h2>
        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={e => setPin(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {member.name}</h2>
      <p>Balance: ${member.balance}</p>
      <p>Outstanding Loans: {member.loans.length}</p>
      <button onClick={downloadPDF}>Download Statement (PDF)</button>
    </div>
  );
}

export default App;
