
import { useEffect, useState } from "react";
import axios from "../../api/axios";

function ProtectedPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("/protected", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Failed to fetch protected data");
      }
    };

    fetchProtectedData();
  }, []);

  return <div className="pt-24">{message}</div>;
}

export default ProtectedPage;
