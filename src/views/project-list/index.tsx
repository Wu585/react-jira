import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "../../hooks";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Typography } from "antd";
import { useUrlQueryParam } from "../../hooks/url";

const ProjectListScreen = () => {
  const [_, setParam] = useState({
    name: "",
    personId: "",
  });

  const [param] = useUrlQueryParam(["name", "personId"]);

  const debouncedParam = useDebounce(param);

  // const {isLoading, error, data: list} = useProjects(debouncedParam)

  const { data: users } = useUsers();

  const { data: list, error, isLoading } = useProjects(debouncedParam);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
