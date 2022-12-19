import React, { useEffect } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { pageMatch, pagePath } from "./utils"

export const Sample: React.FC = () => {
  const navigate = useNavigate()
  const match = useMatch(pageMatch('/nests/:nestId'))
  // :PathMatch<"nestId"> | null

  useEffect(() => {
    if (Math.random() > 0.5) {
      navigate(pagePath('/nests/:nestId', { nestId: '20' }))
    }
  }, [])

  return (
    <Link to={pagePath('/nests/:nestId', { nestId: '20' })}>Move</Link>
  )
}