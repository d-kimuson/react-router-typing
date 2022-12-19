import { generateUtils } from "react-router-typing"
import type { RouteConfig } from "./index"

export const { pagePath, pageMatch } = generateUtils<RouteConfig>()
