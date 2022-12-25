import React from "react"
import { Link } from "react-router-dom"
import { pagePath } from "./utils"

export const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        {[
          [pagePath("/"), "Home"],
          [pagePath("/example"), "Example"],
          [pagePath("/nests/"), "Nest List"],
          [pagePath("/nests/:nestId", { nestId: "20" }), "Nest Detail"],
        ].map(([href, text]) => (
          <li>
            <Link to={href}>{text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
