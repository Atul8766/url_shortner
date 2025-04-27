import React, { useState } from "react";

const UrlShortner = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [totalClicks, setTotalClicks] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);
    setLoading(true); // Set loading to true when the request starts

    if (!url) {
      setError("Please enter a URL.");
      setLoading(false); // Reset loading if there's an error
      return;
    }

    try {
      // Replace with your backend URL
      const response = await fetch("https://url-shortner-954u.onrender.com/url/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      let data = await response.json();
      if (!response.ok) {
        setError(
          data?.errors[0]?.msg || "Failed to shorten URL. Please try again."
        );
        setLoading(false); // Reset loading on error
        return;
      }
      const totalvisit = data?.url?.totalClicks;
      setShortUrl("https://url-shortner-954u.onrender.com/url/" + data?.url?.shortId);
      setTotalClicks(totalvisit.length); // Assuming backend returns { shortenedUrl: "..." }
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false); // Reset loading when the request completes (success or error)
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="url-shortener-container">
      <div className="card">
        <h1 className="title">URL Shortener</h1>

        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL"
              className="input"
            />
            <button
              onClick={handleSubmit}
              className="shorten-button"
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <span className="loader"></span> // Show loader when loading
              ) : (
                "Shorten"
              )}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>

        {shortUrl && (
          <>
            <div className="result-container">
              <p className="result-label">Shortened URL:</p>
              <div className="result-content">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-url"
                >
                  {shortUrl}
                </a>
                <button onClick={copyToClipboard} className="copy-button">
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div className="result-container">
              <p className="result-label">Total Clicks:</p>
              <p className="result-content">{totalClicks}</p>
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        Built with <span className="footer-heart">♥</span> by Atul Shukla
      </footer>
    </div>
  );
};

export default UrlShortner;