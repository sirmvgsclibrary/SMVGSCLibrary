import { useEffect, useState } from "react";

const VisitorCount = () => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // Unique namespace and key for your site
        const response = await fetch(
          "https://api.countapi.xyz/update/sir-mv-library/unique-visits?amount=1"
        );
        const data = await response.json();
        setViews(data.value);
      } catch (error) {
        console.error("Error fetching total views:", error);
      }
    };

    fetchViews();
  }, []);

  return (
    <div className="text-center mt-6">
      {views !== null ? (
        <p className="text-lg font-semibold">
          👁️ Total Views: <span className="text-primary">{views}</span>
        </p>
      ) : (
        <p className="text-muted-foreground">Loading total views...</p>
      )}
    </div>
  );
};

export default VisitorCount;
