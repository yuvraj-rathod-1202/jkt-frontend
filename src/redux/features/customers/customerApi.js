import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/customers`,
    credentials: 'include',
    mode: 'no-cors',
    prepareHeaders: (Headers) => {
        Headers.set('Content-Type', 'application/json'); // Ensure JSON content type
        return Headers;
    }
})

const customersApi = createApi({
    reducerPath: 'customerApi',
    baseQuery,
    tagTypes: ["Customers"], 
    endpoints: (builder) => ({
        fetchAllCustomers: builder.query({
            query: () => "/",
            providesTags: ["Customers"]  
        }),
        fetchCustomerById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Customers", id }]  
        }),
        fetchCustomerByCondition: builder.query({
            query: (condition) => `customer/${condition}`,
            providesTags: (results, error, condition) => [{ type: "Customers", id: condition }]
        }),
        addCustomer: builder.mutation({
            query: (newCustomerData) => ({
                url: '/create-customer',
                method: "POST",
                body: newCustomerData
            }),
            invalidatesTags: ["Customers"]  
        }),
        editCustomer: builder.mutation({
            query: (id, ...rest) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Customers"]  
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Customers"]  
        })
    })
})

export const { useFetchAllCustomersQuery, useFetchCustomerByIdQuery, useFetchCustomerByConditionQuery, useAddCustomerMutation, useEditCustomerMutation, useDeleteCustomerMutation } = customersApi;
export default customersApi;
