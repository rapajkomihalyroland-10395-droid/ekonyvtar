import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios_url/baseURL.js";
import { GetUser, getAuthHeader } from "store/authStore";

const ActionPanel = ({ book }) => {
  const navigate = useNavigate();
  const [rentalDuration, setRentalDuration] = useState("14");
  const [IsSentTheRequest, setIsSentTheRequest] = useState(false);
  const [isTheRequestinProccess, setisTheRequestinProccess] = useState(false);
  const user = GetUser();

  const rentalOptions = [
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days (Recommended)" },
    { value: "21", label: "21 days" },
    { value: "30", label: "30 days" },
  ];

  const calculateDueDate = (days) => {
    const date = new Date();
    date?.setDate(date?.getDate() + parseInt(days));
    return date?.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleRentBook = () => {
    navigate("/rental-checkout", { state: { book, rentalDuration } });
  };

  const SendBookRequest = async () => {
    setIsSentTheRequest(!IsSentTheRequest);

    try {
      const response = await api.post(
        "/loan-signal",
        {
          book_id: book.id,
          user_id: user.id,
        },
        {
          headers: getAuthHeader(),
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setisTheRequestinProccess(true);
        setIsSentTheRequest(true);
      }
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6 sticky top-20">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Bérleti lehetőségek
      </h3>
      <div className="mb-4">
        <div className="flex flex-col mb-2">
          <label className="text-sm font-medium text-foreground mb-1">
            Bérleti időtartam
          </label>
          <div className="relative">
            <select
              value={rentalDuration}
              onChange={(e) => setRentalDuration(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              {rentalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Esedékességi dátum: {calculateDueDate(rentalDuration)}
        </p>
      </div>
      <button
        onClick={handleRentBook}
        disabled={book?.keszlet === 0}
        className={`w-full h-12 inline-flex items-center justify-center px-6 rounded-md text-base font-medium transition-colors mb-3 ${
          book?.keszlet === 0
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        {book?.keszlet > 0 ? "Rent This Book" : "Currently Unavailable"}
      </button>
      {book?.keszlet === 0 && (
        <div className="grid grid-cols-1 gap-2 mb-4">
          <button
            onClick={SendBookRequest}
            disabled={isTheRequestinProccess}
            className={`w-full h-10 inline-flex items-center justify-center px-4 rounded-md text-sm font-medium transition-colors border ${
              isTheRequestinProccess
                ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                : IsSentTheRequest
                ? "bg-background text-primary border-primary hover:bg-accent"
                : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {isTheRequestinProccess
              ? "Ez a könyv már elküldésre került"
              : IsSentTheRequest
              ? "Kérelem elküldve"
              : "Könyv kérelem"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;
