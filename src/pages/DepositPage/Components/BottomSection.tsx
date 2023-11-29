import InputSection from "./InputSection";
import ActionSection from "./ActionSection";
import Footer from "../../Footer/Footer";

const validate =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function BottomSection(props: any) {
  const {
    userEmail,
    setUserEmail,
    email,
    handlemodal,
    setLoading,
    orderDetails,
  } = props;
  return (
    <div className="footer">
      <InputSection
        validate={validate}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        email={email}
      />
      <ActionSection
        userEmail={userEmail}
        handlemodal={handlemodal}
        validate={validate}
        setLoading={setLoading}
        orderDetails={orderDetails}
      />
      <Footer />
    </div>
  );
}

export default BottomSection;
