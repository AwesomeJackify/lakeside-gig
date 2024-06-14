import React from "react";

interface Props {
  code: string;
}

const DangerousHtml = ({ code }: Props) => {
  return <p dangerouslySetInnerHTML={{ __html: code }}></p>;
};

export default DangerousHtml;
