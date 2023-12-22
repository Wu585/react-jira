import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProjectPage = () => {
  return (
    <div>
      <h1>ProjectPage</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Outlet />
    </div>
  );
};

export default ProjectPage;
