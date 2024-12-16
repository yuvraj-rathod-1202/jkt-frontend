import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/brands`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

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
