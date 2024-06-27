import React from "react";

interface Props {
  code: string;
}

const DangerousHtml = ({ code }: Props) => {
  return (
    <div
      className="flex flex-col gap-4"
      dangerouslySetInnerHTML={{ __html: code }}
    ></div>
  );
};

export default DangerousHtml;
