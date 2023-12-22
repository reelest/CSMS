import usePromise from "@/shared/utils/usePromise";
import { Skeleton, Typography } from "@mui/material";

/**
 * Usage Examples:
 * <Await value={string|Promise<string>|undefined} chars={number} variant="h3"/>
 * <Await value={Promise<any>}>
 *    <Element/>
 * <Await/>
 *
 * @returns
 */
export default function Await({
  value,
  variant,
  chars = 2,
  children,
  ...props
}) {
  const resolved = usePromise(
    async () => (value === undefined ? value : (await value) ?? null),
    [value]
  );
  if (!children) {
    return (
      <Typography variant={variant} {...props}>
        {resolved === undefined ? (
          <Skeleton variant="text" sx={{ minWidth: chars + "em" }} />
        ) : (
          resolved
        )}
      </Typography>
    );
  } else {
    return resolved === undefined ? (
      <Skeleton {...props}>
        <div style={{ display: "inline", visibility: "hidden" }}>
          {children}
        </div>
      </Skeleton>
    ) : (
      children
    );
  }
}
