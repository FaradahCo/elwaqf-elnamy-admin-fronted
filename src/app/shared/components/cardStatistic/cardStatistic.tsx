type CardStatisticProps = {
  title: string;
  icon: string;
  value: string | number;
  classesName: string[];
};
export const CardStatistic = ({
  title,
  icon,
  value,
  classesName,
}: CardStatisticProps) => {
  return (
    <div
      className={`flex justify-start items-center gap-4 p-5 ${classesName.join(
        " "
      )}`}
    >
      <img src={icon} className="bg-gray-200 w-10 h-10 p-2 rounded-full" />
      <div>
        <span className="text-2xl font-semibold">{value}</span>
        <p className="text-lg">{title}</p>
      </div>
    </div>
  );
};
export default CardStatistic;
