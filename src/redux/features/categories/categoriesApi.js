import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/categories`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const categoriesApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        fetchAllCategories: builder.query({
            query: () => "/",
            providesTags: ["Categories"]  
        }),
        fetchCategoryById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Categories", id }]  
        }),
        fetchCategoryByCondition: builder.query({
            query: (condition) => `category/${condition}`,
            providesTags: (results, error, condition) => [{ type: "Categories", id: condition }]
        }),
        addCategory: builder.mutation({
            query: (newCategoryData) => ({
                url: '/create-Category',
                method: "POST",
                body: newCategoryData
            }),
            invalidatesTags: ["Categories"]  
        }),
        editCategory: builder.mutation({
            query: (id, ...rest) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Categories"]  
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Categories"]  
        })
    })
})

export const { useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useFetchCategoryByConditionQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation } = categoriesApi;
export default categoriesApi;
