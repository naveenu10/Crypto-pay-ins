import { useGlobalContext } from "../../../context/context";
import "../DepositPage.css";

function InputSection(props: any) {
  const context = useGlobalContext();
  const { validate, userEmail, setUserEmail, email } = props;

  return (
    <div>
      <div className="email">Email Address*</div>
      <input
        className="input-wrap"
        name="userEmail"
        style={
          !validate.test(userEmail)
            ? { border: "1px solid #f44336" }
            : { border: "1px solid rgba(0, 0, 0, 0.5)" }
        }
        onChange={(e) => {
          const currEmail = e.target.value;
          setUserEmail(currEmail);
          context.dispatch({
            type: "UPDATE_EMAIL",
            payload: currEmail,
          });
        }}
        value={email}
      />
      {!validate.test(userEmail) && (
        <div className="invalid-email">Invalid email address</div>
      )}
      <div className="email-info">
        Transaction status updates will be sent to this email address
      </div>
    </div>
  );
}

export default InputSection;
