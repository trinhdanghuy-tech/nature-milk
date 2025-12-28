export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
