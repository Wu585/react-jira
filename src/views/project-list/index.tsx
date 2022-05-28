import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import qs from "qs";
import { cleanObject } from "../../utils";
import { useDebounce, useMount } from "../../hooks";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState<Project[]>([]);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]);
  useMount(() => {
    console.log("one");
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectListScreen;
