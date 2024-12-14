import axiosInstance from "./config";

export const getUserFromWorkshop = async (
  workshopId: number,
  userId: string
) => {
  const url = `/workshops/${workshopId}/${Number(userId)}`;
  console.log("URL: ", url);

  const response = await axiosInstance.get(url);
  return response.data;
};
