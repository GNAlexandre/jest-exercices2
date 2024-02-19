import {computeDataError} from "./computeDataError";
import { STATUS_API } from './setResponseError';

export const buildResponse = async (
  response,
  config,
  computeDataErrorFn = computeDataError,
) => {
  const { status } = response;
  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
    case `${status}`.startsWith(`${STATUS_API.WARNING}`): {
      throw await computeDataErrorFn(response);
    }
    case `${status}` === `${STATUS_API.SUCCESS}`:
      if (config.blob) {
        return response.blob();
      }
      if (config.text) {
        return response.text();
      }
      return {
        ...(await response.json()),
        statusHttp: status,
      };
    default:
      return {
        statusHttp: status,
      };
  }
};
