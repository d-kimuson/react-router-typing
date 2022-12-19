/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */

import type { IRoutes } from "~/type/declare.type"

/**
 * @desc
 * - Helper function that declares the root setting with type resolution.
 * - Recommended for TS4.8 and below.
 * - For TS4.9 and above, the use of satisfies operator is recommended instead.
 * @example defineRoutes([{ path: "/", element: <Page /> }])
 */
export const defineRoutes = <T extends IRoutes>(routes: T) => routes
