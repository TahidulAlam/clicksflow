"use client";
import React from "react";

import SmartLinkAddGenarel from "./SmartLinkAddGenarel";
import SmartLinkAddSettings from "./SmartLinkAddSettings";
import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";

const smartLinkTabs: TabItem[] = [
  { id: 1, title: "General", component: <SmartLinkAddGenarel /> },
  { id: 2, title: "Settings", component: <SmartLinkAddSettings /> },
];

const SmartLinkAdd = () => {
  return <TabbedCard tabs={smartLinkTabs} />;
};

export default SmartLinkAdd;
