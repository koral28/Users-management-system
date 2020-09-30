import Dal from "./Dal";

const getAllData = async (url) => {
  let dataFromDal = await Dal.getAll(url);
  dataFromDal = dataFromDal.data;

  return dataFromDal;
};

export default { getAllData };
