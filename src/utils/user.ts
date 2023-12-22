import { useHttp } from "./http";
import { useMount } from "../hooks";
import { useAsync } from "../hooks/use-async";
import { User } from "../views/project-list/search-panel";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
