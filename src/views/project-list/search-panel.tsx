import React, { FC } from "react";

export interface User {
  name: string;
  id: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface SearchPanelProps {
  param: {
    name: string;
    personId: string;
  };
  users: User[];
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel: FC<SearchPanelProps> = ({
  param,
  setParam,
  users,
}) => {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      />
      <select
        value={param.personId}
        onChange={(e) => {
          setParam({
            ...param,
            personId: e.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};
