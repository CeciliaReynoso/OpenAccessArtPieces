import NavigationBar from "../components/NavigationBar";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

export default function Auth() {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container>
        <LoginForm></LoginForm>
      </Container>
      <Footer></Footer>
    </div>
  );
}
