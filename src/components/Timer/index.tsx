function Timer({ fixedTime }: any) {
  return (
    <>
      <p className="timer">
        Time left: <span>{fixedTime} mins</span>
      </p>
    </>
  );
}

export default Timer;
