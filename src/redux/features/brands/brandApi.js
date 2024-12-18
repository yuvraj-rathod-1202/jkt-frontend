import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/brands`,
    credentials: 'include', // Ensures cookies are sent
    mode: 'no-cors', // Set no-cors mode (not recommended for most cases)
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token'); // Replace this with your token retrieval logic
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json'); // Ensure JSON content type
        return headers;
    }
});



const brandsApi = createApi({
    reducerPath: 'brandApi',
    baseQuery,
    tagTypes: ["Brands"],
    endpoints: (builder) => ({
        fetchAllBrands: builder.query({
            query: () => "/",
            providesTags: ["Brands"]  
        }),
        fetchBrandById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Brands", id }]  
        }),
        fetchBrandByCondition: builder.query({
            query: (condition) => `brand/${condition}`,
            providesTags: (results, error, condition) => [{ type: "Brands", id: condition }]
        }),
        addBrand: builder.mutation({
            query: (newBrandData) => ({
                url: '/create-brand',
                method: "POST",
                body: newBrandData
            }),
            invalidatesTags: ["Brands"]  
        }),
        editBrand: builder.mutation({
            query: (id, ...rest) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Brands"]  
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Brands"]  
        })
    })
})

export const { useFetchAllBrandsQuery, useFetchBrandByIdQuery, useFetchBrandByConditionQuery, useAddBrandMutation, useEditBrandMutation, useDeleteBrandMutation } = brandsApi;
export default brandsApi;
