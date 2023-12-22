'use client';

import { useParams } from "next/navigation";

const ServerPage = () => {
  const serverId = useParams().serverId

  return (
    <div>Server with ID: {serverId}</div>
  )
};

export default ServerPage;
