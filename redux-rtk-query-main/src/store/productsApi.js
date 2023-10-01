import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: " https://calm-plum-jaguar-tutu.cyclic.app/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "todos",
    }),
    getSingleProduct: builder.query({
      query: (data) => `todos/search?q=${data}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productsApi;
