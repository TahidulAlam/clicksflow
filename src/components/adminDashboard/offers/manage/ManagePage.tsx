"use client";
import React, { useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable, { Column } from "@/components/shared/dataTable/DataTable";
import SearchBar from "@/components/shared/dataTable/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Offer {
  id: number;
  thumbnail: string;
  name: string;
  visibility: string;
  advertiser: string;
  category: string;
  countries: string;
  countriesname: string;
  action: string;
  colme: string;
  [key: string]: unknown;
}

const data: Offer[] = [
  {
    id: 13,
    thumbnail: "https://example.com/thumb13.png",
    name: "Leptozan - SS - Diet Supplement - TSL & VSL - [US, CA, AU, NZ] (13)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Diet & Weight Loss",
    countries: "United States +3",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 12,
    thumbnail: "https://example.com/thumb12.png",
    name: "(MOP) **NEW BANGER** My Online Profits $3 CTC - US/CA (12)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Biz Opp",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 8,
    thumbnail: "https://example.com/thumb8.png",
    name: "CreditScoreIQ $1 7 Day Trial - US (8)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 7,
    thumbnail: "https://example.com/thumb7.png",
    name: "SecureMax with Device Security - $1 7-Day - US/PR (7)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 6,
    thumbnail: "https://example.com/thumb6.png",
    name: "Credit Score Hero V2 - $17 7 Days Trial (6)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 5,
    thumbnail: "https://example.com/thumb5.png",
    name: "Credit Score Hero - $17 7 Days Trial (5)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 4,
    thumbnail: "https://example.com/thumb4.png",
    name: "IdentityIQ Credit Essentials (US) $1 Trial - LifeStyle Lander (4)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 3,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 32,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 34,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 35,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 36,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 37,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
  {
    id: 38,
    thumbnail: "https://example.com/thumb3.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    action: ":",
    colme: "colme",
  },
];

const columns: Column<Offer>[] = [
  {
    header: "ID",
    accessor: "id",
    width: "100px",
    fixed: "left", 
    searchable: false,
  },
  {
    header: "Name",
    accessor: "name",
    width: "400px",
    searchable: true,
  },
  {
    header: "Visibility",
    accessor: "visibility",
    searchable: false,
    stickyAfter: 40,
    width: "200px",
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,
    width: "200px",
  },
  {
    header: "Category",
    accessor: "category",
    searchable: true,
    width: "200px",
  },
  {
    header: "Countries",
    accessor: "countries",
    searchable: false,
    width: "200px",
  },
  {
    header: "Countriesname",
    accessor: "countriesname",
    width: "200px",
    searchable: false,
  },

  {
    header: "Colme",
    accessor: "colme",
    width: "100px",
    searchable: false,
  },
    {
    header: "Action",
    accessor: "action", 
    fixed: "right",
    width: "50px",
  },
];

const ManagePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((row) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const value =
          typeof col.accessor === "function"
            ? col.accessor(row)
            : row[col.accessor as keyof Offer];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <PrimaryBtn size="md">+ Add Offer</PrimaryBtn>
          <PrimaryBtn size="md">Active</PrimaryBtn>
        </div>
        <div className="flex items-center gap-2">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search offers..."
          />
          <PrimaryBtn size="lg">
            <FaFilter />
          </PrimaryBtn>
          <PrimaryBtn size="lg">
            <BsThreeDotsVertical />
          </PrimaryBtn>
        </div>
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        defaultSortField="name"
        defaultSortOrder="asc"
      />
    </div>
  );
};

export default ManagePage;
