import ProjectListScreen from "./views/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/logo.svg";
import { Button, Dropdown, Menu } from "antd";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ProjectPage from "./views/project";
import { KanbanScreen } from "./views/kanban";
import EpicScreen from "./views/epic";

export const AuthenticatedApp = () => {
  return (
    <Router>
      <Container>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={""} element={<Navigate to={"/projects"} />} />
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />}>
              <Route path={""} element={<Navigate to={"kanban"} />} />
              <Route path={"kanban"} element={<KanbanScreen />} />
              <Route path={"epic"} element={<EpicScreen />} />
            </Route>
          </Routes>
        </Main>
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;

const PageHeader = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Header between>
      <HeaderLeft gap>
        <Button type={"link"} onClick={() => navigate("/")}>
          <SoftwareLogo height={"100%"} color={"rgb(38,132,255)"} />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"}>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
