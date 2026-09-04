import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Activating your account...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const activateUser = async () => {
      try {
        const { data } = await axios.post(`${server}/user/activation`, {
          activation_token: activation_token,
        });

        if (data.success) {
          setSuccess(true);
          setMessage(
            "Your account has been created successfully! Redirecting to login...",
          );

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log("ACTIVATION ERROR:", error.response?.data);

        setSuccess(false);
        setMessage(error.response?.data?.message || "Activation failed");
      }
    };

    activateUser();
  }, [activation_token, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default ActivationPage;
