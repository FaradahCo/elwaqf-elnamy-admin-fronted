type AlertProps = {
  title: string;
  description: string;
  alertIcon: string;
};

export const Alert = ({ title, description, alertIcon }: AlertProps) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="text-center">
        <img src={alertIcon} alt="alert" className="w-20 h-20 mx-auto" />
        <h1 className="mt-4 font-bold text-xl text-second-primary!">{title}</h1>
        <p className="mt-3 text-[13px] text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Alert;
