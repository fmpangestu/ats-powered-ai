import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [confirm, setConfirm] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
    setConfirm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Kembali ke Homepage
          </span>
        </Link>
      </nav>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Wipe App Data</h1>
        <p className="mb-4 text-gray-600">
          Authenticated as:{" "}
          <span className="font-semibold">{auth.user?.username}</span>
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Existing Files:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {files.length === 0 ? (
              <div className="text-gray-400">No files found.</div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="border rounded p-2 flex items-center bg-gray-50"
                >
                  <span className="truncate">{file.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="">
          {!confirm ? (
            <button
              className="bg-red-500 cursor-pointer hover:bg-red-600 w-full text-white px-4 py-2 rounded-md font-semibold transition"
              onClick={() => setConfirm(true)}
            >
              Wipe App Data
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-red-600 font-semibold">
                Are you sure? This will delete all files and data!
              </span>
              <div className="flex gap-2 ">
                <button
                  className="bg-red-500 cursor-pointer hover:bg-red-600 w-full text-white px-4 py-2 rounded-md font-semibold transition"
                  onClick={handleDelete}
                >
                  Yes, Delete All
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 w-full px-4 py-2 rounded-md font-semibold transition cursor-pointer"
                  onClick={() => setConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WipeApp;
// ...existing code...
