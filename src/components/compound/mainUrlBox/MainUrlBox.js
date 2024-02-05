import React, { useState } from "react";
import styles from "./MainUrlBox.module.css";

function MainUrlBox() {
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);
  const [text, setText] = useState("Copy this to clipboard");
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(null);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (inputValue.trim() !== "") {
    //   // Perform Empty value check
    //   const startsWithHttp = inputValue.startsWith("http://") || inputValue.startsWith("https://");
    //   console.log(inputValue);
    //   if (!startsWithHttp) {
    //     setInputValue(`//${inputValue}`);
    //   }
    //   else {
    //     setInputError("Input value is empty");
    //     console.log("Input value is empty");
    //   }
    let checkUrlValidity = true;

    try {
      // Attempt to create a new URL object
      new URL(inputValue);
      checkUrlValidity = true;
    } catch (error) {
      checkUrlValidity = false;
    }
    if (checkUrlValidity) {
      const formData = new FormData(event.target);
      const longUrl = formData.get("url");

      try {
        const response = await fetch(
          "http://localhost:8000/make-short-url",
          {
            method: "POST",
            body: JSON.stringify({ longUrl }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response)

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setShortUrl(data.shortUrl);
          setText(`http://localhost:8000/${data.shortUrl}`);
          setError(null);
        } else {
          // Handle error
          const errorData = await response.json();
          setError(errorData.message || "An error occurred in else");
          console.log(error);
        }
      } catch (error) {
        // Handle error
        setError("An error occurred in try catch");
        console.log(error);
      }
    } else {
      setInputError("Input URL is invalid or does not contain protocol(http or https)");
    }
  };

  if (shortUrl) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>URL Shortener Result</h2>
        <p className={styles.label}>Your shortened URL:</p>
        <p className={styles.shortUrl}>http://localhost:8000/{shortUrl}</p>
        <button className={styles.submit_button} onClick={handleCopy}>
          Copy URL
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>URL Shortener</h2>
      <p>Enter a long URL below to get a shortened link:</p>
      <form onSubmit={handleSubmit}>
        <div className={styles["input-container"]}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            name="url"
            placeholder="Enter the link here"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Shorten
          </button>
        </div>
      </form>
      <p className={styles.display_error}>{inputError}</p>
      <p className={styles["additional-text"]}>
        ShortURL is a free tool to shorten URLs and generate short links.
      </p>
    </div>
  );
}

export default MainUrlBox;
