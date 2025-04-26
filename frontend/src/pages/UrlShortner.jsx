import React, { useState } from "react";
// import "./UrlShortner.css";

const UrlShortner = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [totalClicks, setTotalClicks] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    try {
      // Replace with your backend URL
      const response = await fetch("http://localhost:3000/url/create", {
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
        return;
      }
      const totalvisit = data?.url?.totalClicks;
      setShortUrl("http://localhost:3000/url/" + data?.url?.shortId);
      setTotalClicks(totalvisit.length); // Assuming backend returns { shortenedUrl: "..." }
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
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
            <button onClick={handleSubmit} className="shorten-button">
              Shorten
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
        Built with <span className="footer-heart">♥</span> by Chomu ka Dumboo
      </footer>
    </div>
  );
};

export default UrlShortner;
