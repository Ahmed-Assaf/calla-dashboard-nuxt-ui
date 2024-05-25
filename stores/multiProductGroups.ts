import { defineStore } from "pinia";
import { useFetchData } from "./../composables/fetchData";

export const useMultiProductGroupsStore =
  defineStore();
  // "multiProductGroups",
  // () => {
  //   // route
  //   const route = useRoute();

  //   // pagination
  //   const paginateData = ref({});
  //   provide("paginateData", paginateData);

  //   // fetch data
  //   const { fetchData, loading, resultData: attributes } = useFetchData();

  //   // fetch products
  //   const fetchAttributes = (page = 1) => {
  //     fetchData({
  //       url: `provider/products/get-product-variants/${route.query.product_id}`,
  //       headers: {
  //         Authorization: `Bearer ${userInfo.value.token}`,
  //       },
  //       params: {
  //         page,
  //       },
  //       onSuccess: () => {
  //         paginateData.value = attributes.value.pagination;
  //       },
  //     });
  //   };

  //   return {
  //     attributes,
  //     attrsLoading: loading,
  //     fetchAttributes,
  //     paginateData,
  //   };
  // }
