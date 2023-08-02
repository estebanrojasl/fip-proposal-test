import { useState, useEffect } from "react";

interface ContentData {
  heading: string;
  img_1: string;
}

const AdminPage = () => {
  const [content, setContent] = useState<ContentData>({
    heading: "",
    img_1: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the content data from the server-side API route (e.g., /api/content)
    fetch("/api/content")
      .then((response) => response.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch content.");
        setLoading(false);
      });
  }, []);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send the updated content to the server-side API route for saving (e.g., /api/content)
    fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update content.");
        }
        console.log("Content updated successfully.");
      })
      .catch((error) => {
        setError("Failed to update content.");
      });
  };

  const handleRedeploy = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL ?? "", {
        method: "POST",
      });

      if (response.ok) {
        console.log("Redeploy triggered successfully.");
      } else {
        setError("Failed to trigger redeploy.");
      }
    } catch (error) {
      setError("Failed to trigger redeploy.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <form>
        <label>
          Field 1:
          <input
            type="text"
            name="heading"
            value={content.heading || ""}
            onChange={handleChange}
          />
        </label>
        {/* Add more form fields as needed for your content.json */}
        <button type="button" onClick={handleSubmit}>
          Save
        </button>

        <button type="button" onClick={handleRedeploy}>
          Trigger Redeploy
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
