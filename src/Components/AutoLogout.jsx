import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AutoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    let timeout;

    const resetTimer = () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            localStorage.removeItem("token");

            toast.error("Session timeout, login again!.");

            navigate("/");
        }, 15 * 60 * 1000 );
    };

    const events = [
        "mousemove",
        "mousedown",
        "keypress",
        "scroll",
        "touchstart",
    ];

    events.forEach((event) =>
        window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
        clearTimeout(timeout);

            events.forEach((event) =>
                window.removeEventListener(event, resetTimer)
            );
        };
    }, [navigate]);

  return null;
}