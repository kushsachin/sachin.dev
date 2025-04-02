import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DownloadButtonProps {
  fileUrl: string;
  fileName: string;
  buttonText?: string;
  className?: string;
}

const DownloadButton = ({
  fileUrl,
  fileName,
  buttonText = "Download Resume",
  className = "",
}: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      // Show a loading toast that persists until we know the result
      const toastId = toast.loading("Starting download...", {
        position: "top-center",
      });

      // Use fetch API for better control and error handling
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);

      // Update the toast to success
      toast.update(toastId, {
        render: `${fileName} downloaded successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(`Failed to download ${fileName}. Please try again.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#B88E6A] to-[#D8A875] hover:from-[#9a7555] hover:to-[#C0956A] text-white px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl ${className} ${
        isDownloading ? "opacity-75 cursor-not-allowed" : ""
      }`}
    >
      {/* Animated background layer */}
      <span className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-[#B7C7F3]/10 via-[#D8FFC0]/15 to-[#B7C7F3]/10 group-hover:bg-[position:100%_0] transition-all duration-700 ease-out"></span>

      {/* Main content */}
      <span className="relative z-10 font-medium flex items-center gap-2">
        {isDownloading ? "Downloading..." : buttonText}
        {!isDownloading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        )}
      </span>

      {/* Glow effect */}
      <span className="absolute -inset-1 bg-white/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};

export default DownloadButton;
