import PageWrapper from "@/components/common/PageWrapper";
import DashboardCards from "@/components/layout/DashboardCards";
import Header from "@/components/layout/Header";
import React from "react";

const Dashboard = () => {
  return (
    <PageWrapper>
      <Header />
      <div className="my-10 !mb-0 mx-10 md:mx-20 lg:mx-36">
        <h2 className="text-center text-2xl font-bold">
          CV AI Dashboard
        </h2>
        <p className="text-center text-gray-600">
          Mulai buat dan sesuaikan CV pribadi anda.
        </p>
      </div>
      <div className="p-10 md:px-24 lg:px-48">
        <DashboardCards />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
