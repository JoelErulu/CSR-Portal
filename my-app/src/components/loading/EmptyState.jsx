export default function EmptyState({ text }) {
  return (
    <div className="card border-0 shadow-sm p-4 text-center bg-white">
      <p className="text-muted mb-0">{text}</p>
    </div>
  );
}