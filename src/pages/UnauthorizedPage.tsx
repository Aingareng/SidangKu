export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">401 - Unauthorized</h1>
      <p className="mt-4">You don't have permission to access this page.</p>
    </div>
  );
}
