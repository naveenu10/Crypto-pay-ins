import http from "../utils/http-common";

const validateOrder = async (orderId: string, hash: string) => {
  try {
    const response = await http.get(`/sdk/deposit/authenticate/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Hash: hash,
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

const sendEmail = async (payload: any, token: string) => {
  try {
    const response = await http.post(`/sdk/deposit/order/email`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

const getTransactionDetails = async (token: string) => {
  try {
    const response = await http.get(`/sdk/deposit/transaction/details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

const getOrderCrypto = async (orderId:string,token: string) => {
  try {
    const response = await http.get(`/sdk/deposit/order/${orderId}/crypto`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};


const getMetamaskPaymentDetails = async (payload: any, token: string) => {
  try {
    const response = await http.post(`/sdk/deposit/address/metamask`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export { validateOrder, sendEmail, getTransactionDetails,getOrderCrypto,getMetamaskPaymentDetails };
