import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { cleanObject } from "../../utils";
import { useDebounce, useMount } from "../../hooks";
import { useHttp } from "../../utils/http";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState<Project[]>([]);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectListScreen;
