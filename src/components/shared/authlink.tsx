import React from "react";
import { Link } from "react-router-dom";

type AuthLinkProps = {
  text: string;
  linkText: string;
  linkTo: string;
};

const AuthLink: React.FC<AuthLinkProps> = ({ text, linkText, linkTo }) => {
  return (
    <div className="d-flex gap-2 align-items-center justify-content-center">
      <p className="m-0">{text}</p>
      <Link className="link-success" to={linkTo}>
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;
