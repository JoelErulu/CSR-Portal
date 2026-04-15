import { useState } from "react";
import EmptyState from "../loading/EmptyState";

export default function PurchaseHistory({ history = [] }) {
  const [activeId, setActiveId] = useState(null);

  const placeholderData = [
    {
      id: "p1",
      plan: "Premium Plan",
      amount: 29.99,
      date: "2026-04-10",
      userId: "U123",
    },
    {
      id: "p2",
      plan: "Basic Plan",
      amount: 14.99,
      date: "2026-03-22",
      userId: "U123",
    },
  ];

  const displayHistory = history.length ? history : placeholderData;

  const toggleReceipt = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mt-5">
      <h5 className="fw-bold mb-3">Purchase History</h5>

      {!history.length && (
        <EmptyState text="Showing sample data." />
      )}

      <ul className="list-group">
        {displayHistory.map((item) => (
          <li
            key={item.id}
            className="list-group-item"
            style={{ cursor: "pointer" }}
            onClick={() => toggleReceipt(item.id)}
          >
            <div className="d-flex justify-content-between">
              <div>
                <div className="fw-semibold">{item.plan}</div>
                <small className="text-muted">{item.date}</small>
              </div>
              <div>${item.amount}</div>
            </div>

            {activeId === item.id && (
              <div className="mt-3 p-3 border rounded bg-light">
                <div className="fw-bold mb-2">Receipt</div>
                <div className="d-flex justify-content-between">
                  <span>Plan:</span>
                  <span>{item.plan}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Amount:</span>
                  <span>${item.amount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Date:</span>
                  <span>{item.date}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>User ID:</span>
                  <span>{item.userId}</span>
                </div>
                <div className="text-end mt-2">
                  <small className="text-muted">Transaction ID: {item.id}</small>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}