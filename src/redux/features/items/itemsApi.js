import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/items`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const itemsApi = createApi({
    reducerPath: 'itemApi',
    baseQuery,
    tagTypes: ["Items"], 
    endpoints: (builder) => ({
        fetchAllItems: builder.query({
            query: () => "/",
            providesTags: ["Items"]  
        }),
        fetchItemById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Items", id }]  
        }),
        addItem: builder.mutation({
            query: (newItemData) => ({
                url: '/create-item',
                method: "POST",
                body: newItemData
            }),
            invalidatesTags: ["Items"]  
        }),
        editItem: builder.mutation({
            query: (id, ...rest) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Items"]  
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Items"]  
        })
    })
})

export const { useFetchAllItemsQuery, useFetchItemByIdQuery, useAddItemMutation, useEditItemMutation, useDeleteItemMutation } = itemsApi;
export default itemsApi;
