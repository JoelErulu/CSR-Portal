export default function CustomerHeader({ onBack, onSave, saving }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
      <button className="btn btn-outline-secondary btn-sm" onClick={onBack}>
        ← Back
      </button>

      <button className="btn btn-primary px-4 fw-bold" onClick={onSave} disabled={saving}>
        {saving ? (
          <span className="spinner-border spinner-border-sm me-2" />
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}