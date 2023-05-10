import { useMutation } from "react-query";
import { request } from "../utils/axios-utils";

const sendDataToServer = async ({ first_name, email, gender }) => {
  request({
    url: "/users",
    method: "post",
    data: { first_name, email, gender },
  });
};
export const useUsersData = () => {
  return useMutation(sendDataToServer);
};

const deleteRows = async (ids) => {
  await Promise.all(
    ids.map(async (id) => {
      await request({ url: `/users/${id}`, method: "delete" });
    })
  );
};
export const useDeleteUsers = () => {
  return useMutation(deleteRows);
};
