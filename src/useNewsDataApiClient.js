import { useCallback } from "react";
import axios from "axios";

const BASE_URL = "https://www.newsdata.io/web/v1";

const ENDPOINTS = {
  latest: "news",
  archive: "archive",
  crypto: "crypto",
  sources: "sources",
};

const PARAMS = {
  latest: [
    "q",
    "qInTitle",
    "country",
    "category",
    "language",
    "domain",
    "timeframe",
    "size",
    "domainurl",
    "excludedomain",
    "timezone",
    "full_content",
    "image",
    "video",
    "prioritydomain",
    "page",
    "qInMeta",
    "tag",
    "sentiment",
    "region",
    "excludefield",
    "removeduplicate",
    "raw_query",
  ],
  archive: [
    "q",
    "qInTitle",
    "country",
    "category",
    "language",
    "domain",
    "size",
    "domainurl",
    "excludedomain",
    "timezone",
    "full_content",
    "image",
    "video",
    "prioritydomain",
    "page",
    "qInMeta",
    "excludefield",
    "raw_query",
    "from_date",
    "to_date",
  ],
  crypto: [
    "q",
    "qInTitle",
    "language",
    "domain",
    "size",
    "domainurl",
    "excludedomain",
    "timezone",
    "full_content",
    "image",
    "video",
    "prioritydomain",
    "page",
    "qInMeta",
    "excludefield",
    "raw_query",
    "from_date",
    "to_date",
    "removeduplicate",
    "timeframe",
    "tag",
    "sentiment",
    "coin",
  ],
  sources: ["country", "language", "category", "prioritydomain", "raw_query"],
};

const useNewsDataApiClient = (apiKey) => {
  if (!apiKey) throw new Error("API key is required");

  const validateParams = (endpoint, params) => {
    const allowed = PARAMS[endpoint];
    const invalid = Object.keys(params).filter((key) => !allowed.includes(key));
    if (invalid.length) {
      throw new Error(
        `Invalid parameters for ${endpoint}: ${invalid.join(", ")}`
      );
    }
  };

  const buildUrl = (endpoint) => `${BASE_URL}/${ENDPOINTS[endpoint]}`;

  const fetchEndpoint = useCallback(
    async (endpoint, params = {}) => {
      validateParams(endpoint, params);
      const { scroll = false, ...rest } = params;

      const url = buildUrl(endpoint);
      const queryParams = { apikey: apiKey, ...rest };
      const includePage = rest.page !== undefined;

      let allResults = [];
      let nextPage = includePage ? rest.page : 1;

      while (true) {
        const requestParams = { ...queryParams };
        if (includePage || scroll) {
          requestParams.page = nextPage;
        }

        const response = await axios.get(url, { params: requestParams });
        const data = response.data;

        if (scroll) {
          if (!data.results || !data.results.length) break;
          allResults.push(...data.results);

          if (!data.nextPage) break;
          nextPage = data.nextPage;
        } else {
          return data;
        }
      }

      return { results: allResults };
    },
    [apiKey]
  );

  return {
    latest: (params) => fetchEndpoint("latest", params),
    archive: (params) => fetchEndpoint("archive", params),
    crypto: (params) => fetchEndpoint("crypto", params),
    sources: (params) => fetchEndpoint("sources", params),
  };
};

export default useNewsDataApiClient;
