import AddOfferPage from "@/components/adminDashboard/offers/add/AddOfferPage";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 bg-white rounded-xl">
      <AddOfferPage />
    </div>
  );
};

export default page;
