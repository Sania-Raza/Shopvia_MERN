import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { server } from "../server";
import { loadSeller } from "../../redux/actions/user";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activation_token) return;

    const sendRequest = async () => {
      try {
        const { data } = await axios.post(
          `${server}/shop/activation`,
          {
            activation_token,
          },
          {
            withCredentials: true,
          },
        );

        console.log("ACTIVATION SUCCESS:", data);

        // Seller ko Redux mein load karo
        dispatch(loadSeller());

        // Seller dashboard
        navigate("/dashboard");
      } catch (err) {
        console.log("ACTIVATION ERROR:", err.response?.data);
        console.log("FULL ERROR:", err);

        setError(true);
      }
    };

    sendRequest();
  }, [activation_token, dispatch, navigate]);

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
      {error ? (
        <p>Your token is expired or invalid!</p>
      ) : (
        <p>Activating your shop...</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
