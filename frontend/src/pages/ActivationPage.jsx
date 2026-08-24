import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const { data } = await axios.post(`${server}/user/activation`, {
          activation_token: token,
        });

        if (data.success) {
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Your account has been created suceessfully! Go to login Page</p>
          </div>;
          navigate("/login");
        }
      } catch (error) {
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error.response?.data?.message || "Activation failed"}
        </div>;
       
      }
    };

    activateUser();
  }, [token, navigate]);

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
      {
    }
    </div>
  );
};

export default ActivationPage;
