import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosHandler from "../lib/hooks/axios/useAxiosHandler";
import Header from "../components/ui/Header";
import { IValidateSessionResponse } from "../lib/interfaces/validateSessionResponse";
import { ILogoutResponse } from "../lib/interfaces/logoutResponse";

export default function AppPage() {
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { sendRequest } = useAxiosHandler<IValidateSessionResponse | ILogoutResponse>();

  useEffect(() => {
    const check = async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        return navigate("/signin");
      }

      const data = await sendRequest<IValidateSessionResponse>(`users/session/${sessionId}`, "GET");
      if (!data || !data.valid) {
        navigate("/signin");
      } else {
        setName(data.name);
        setValid(true);
      }
    };
    check();
  }, []);

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("sessionId");
    const data = await sendRequest<ILogoutResponse>(`users/session/${sessionId}`, "DELETE");
    console.log("deleted: ", data);
    localStorage.removeItem("sessionId");
    navigate("/signin");
  };

  return valid ? (
    <div className="min-h-screen bg-teal-800">
      <Header username={name} onLogout={handleLogout} />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
        <h2 className="text-3xl font-semibold text-white text-center">
          Welcome to the application.
        </h2>
      </div>
    </div>
  ) : null;
}
