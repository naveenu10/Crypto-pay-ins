import Timer from "../../../components/Timer";

function TopSection({ fixedTime }: any) {
  return (
    <div>
      <Timer fixedTime={fixedTime} />
      <div className="choosecurrency">Complete Payment</div>
    </div>
  );
}

export default TopSection;
