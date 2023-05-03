import toast from '../utils/toast';

export function withToastCatcher<Returned>(
  payloadCreator: () => Promise<Returned>,
  message: string,
) {
  return async () => {
    try {
      const res = await payloadCreator();
      toast.success(message);
      return res;
    } catch (err) {
      toast.error(`${err}`);
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
      toast.success(message);
      return res;
    } catch (err) {
      console.log(err);
      toast.error(`${err}`);
      throw err;
      // return Error(`${err}`);
    }
  };
}
