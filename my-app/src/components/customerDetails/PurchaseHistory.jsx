import EmptyState from "../loading/EmptyState";

export default function PurchaseHistory({ history = [] }) {
  return (
    <div className="mt-5">
      <h5 className="fw-bold mb-3">Purchase History</h5>

      {!history.length && <EmptyState text="No purchases found." />}
    </div>
  );
}