    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
    import getBaseUrl from '../../../utils/baseURL'

    const baseQuery = fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/stocks`,
        credentials: 'include',
        mode: 'no-cors',
        prepareHeaders: (Headers) => {
            Headers.set('Content-Type', 'application/json'); // Ensure JSON content type
            return Headers;
        }
    })

    const stocksApi = createApi({
        reducerPath: 'stockApi',
        baseQuery,
        tagTypes: ["Stocks"], 
        endpoints: (builder) => ({
            fetchAllStocks: builder.query({
                query: () => "/",
                providesTags: ["Stocks"]  
            }),
            fetchStockById: builder.query({
                query: (id) => `/${id}`,
                providesTags: (results, error, id) => [{ type: "Stocks", id }]  
            }),
            addStock: builder.mutation({
                query: (newStockData) => ({
                    url: '/create-stock',
                    method: "POST",
                    body: newStockData
                }),
                invalidatesTags: ["Stocks"]  
            }),
            editStock: builder.mutation({
                query: (id, ...rest) => ({
                    url: `/edit/${id}`,
                    method: "PUT",
                    body: rest,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                invalidatesTags: ["Stocks"]  
            }),
            deleteStock: builder.mutation({
                query: (id) => ({
                    url: `/delete/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ["Stocks"]  
            })
        })
    })

    export const { useFetchAllStocksQuery, useFetchStockByIdQuery, useAddStockMutation, useEditStockMutation, useDeleteStockMutation } = stocksApi;
    export default stocksApi;
