import { CircleError } from "../../../icons";
import { Typography } from "../../../server";

export const NoResults = () => {
  return (
    <div className="flex flex-col gap-2 items-center p-5">
      <CircleError className="size-20 text-error-500" />
      <Typography className="text-neutral-900">No Results</Typography>
    </div>
  );
};
