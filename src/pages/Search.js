import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const QUERY_SEARCH_COUNTRY = gql`
  query country($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      code
      currency
    }
  }
`;

function Search() {
  const [countrySearch, setCountrySearch] = useState("");
  const [searchCountry, { data, loading, error }] = useLazyQuery(QUERY_SEARCH_COUNTRY);

  return (
    <div className="search">
      <div className="inputs">
        <Link to="/">List of Countries</Link>
        <input
          type="text"
          placeholder="Enter Country Code (e.g., BR)..."
          value={countrySearch}
          onChange={(event) => {
            setCountrySearch(event.target.value);
          }}
        />
        <button
          onClick={() => {
            searchCountry({
              variables: { code: countrySearch.toUpperCase() },
            });
          }}
        >
          Search Country
        </button>
      </div>

      <div className="searchCountry">
        {loading && <h3>Loading...</h3>}
        {error && <h3>Error: {error.message}</h3>}
        {data && data.country && (
          <div className="countryDisplay">
            <h1>
              {data.country.name} {data.country.emoji}
            </h1>
            <h1>Capital: {data.country.capital}</h1>
            <h1>Currency: {data.country.currency}</h1>
            <h1>Country Code: {data.country.code}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
