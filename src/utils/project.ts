import { Project } from "../views/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "../hooks/use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";
import useSWR from "swr";

export const useProjects1 = (
  param?: Partial<{
    name: string;
    personId: string;
  }>
) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useSWR(
    [
      "projects",
      {
        data: cleanObject(param || {}),
      },
    ],
    ([url, data]) => client(url, data)
  );
};
