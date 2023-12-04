import Timer from "../../../components/Timer";

function TopSection({ fixedTime }: any) {
  return (
    <section className="nivapay_section">
      <Timer fixedTime={fixedTime} />
      <div className="choosecurrency">Select Currency to Pay With</div>
    </section>
  );
}

export default TopSection;
