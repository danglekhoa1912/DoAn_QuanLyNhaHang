import toastWeb from '../utils/toastWeb';

export function withToastCatcher<Returned>(
  payloadCreator: () => Promise<Returned>,
  message: string,
) {
  return async () => {
    try {
      const res = await payloadCreator();
      toastWeb.success(message);
      return res;
    } catch (err) {
      toastWeb.error(`${err}`);
      throw err;
    }
  };
}

export function withParamsToastCatcher<ThunkArg, Returned>(
  payloadCreator: (args1: ThunkArg) => Promise<Returned>,
  message: string,
) {
  return async (args2: ThunkArg) => {
    try {
      const res = await payloadCreator(args2);
      toastWeb.success(message);
      return res;
    } catch (err: any) {
      console.log(err);
      toastWeb.error(`${err?.message || err}`);
      throw err;
    }
  };
}
