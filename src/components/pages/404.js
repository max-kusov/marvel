import React from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";


const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ 'textAlign': 'center', 'fontSize': '24px' }}>Page doesn't exist</p>
      <Link style={{ 'display': 'block', 'textAlign': 'center', 'fontSize': '24px', 'marginTop': '30px' }} to='/'>Back to main page</Link>
    </div>
  )
}

export default Page404;